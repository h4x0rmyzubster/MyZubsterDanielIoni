#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import subprocess
import json
import logging
import os
import time
from datetime import datetime

# Configurazione logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('/var/log/security_bot.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Configurazione target (da variabile d'ambiente o default)
TARGET = os.environ.get('SECURITY_TARGET', 'localhost')
DEEPSEEK_URL = os.environ.get('DEEPSEEK_URL', 'http://localhost:11434/api/generate')

# Wordlist per gobuster: prova più percorsi possibili
WORDLIST_PATHS = [
    '/usr/share/wordlists/dirb/common.txt',
    '/usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt',
    '/usr/share/seclists/Discovery/Web-Content/common.txt',
    '/usr/share/gobuster/wordlists/dirbuster/directory-list-2.3-medium.txt',
    '/usr/share/wordlists/dirb/big.txt',
]

def find_wordlist():
    """Trova il primo wordlist esistente tra quelli disponibili."""
    for path in WORDLIST_PATHS:
        if os.path.exists(path):
            return path
    return None

def run_command(cmd, timeout=300):
    """Esegue un comando shell e restituisce output e codice di ritorno."""
    try:
        logger.info(f"Esecuzione: {' '.join(cmd)}")
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=timeout,
            check=False
        )
        return result.stdout, result.stderr, result.returncode
    except subprocess.TimeoutExpired:
        logger.error(f"Timeout scaduto per: {' '.join(cmd)}")
        return "", "Timeout", -1

def run_nmap_scan(target):
    """Scansione porte con nmap."""
    logger.info(f"🔍 Avvio nmap su {target}")
    cmd = ['nmap', '-sV', '--script=default', target]
    stdout, stderr, code = run_command(cmd)
    if code != 0:
        logger.error(f"nmap fallito: {stderr}")
        return None
    return stdout

def run_nikto_scan(target):
    """Scansione vulnerabilità web con nikto."""
    logger.info(f"🔍 Avvio nikto su {target}")
    cmd = ['nikto', '-h', target, '-ssl', '-Format', 'json']
    stdout, stderr, code = run_command(cmd, timeout=600)
    if code != 0:
        logger.error(f"nikto fallito: {stderr}")
        return None
    return stdout

def run_sqlmap_scan(target):
    """Test SQL injection con sqlmap (livello base)."""
    logger.info(f"🔍 Avvio sqlmap su {target}")
    cmd = ['sqlmap', '-u', target, '--batch', '--level=1', '--risk=1']
    stdout, stderr, code = run_command(cmd, timeout=600)
    if code not in [0, 1]:
        logger.error(f"sqlmap fallito: {stderr}")
        return None
    return stdout

def run_gobuster_scan(target):
    """Directory busting con gobuster."""
    wordlist = find_wordlist()
    if not wordlist:
        logger.warning("⚠️ Nessun wordlist trovato. Skipping gobuster.")
        return "Wordlist non trovato"

    logger.info(f"🔍 Avvio gobuster su {target} con wordlist: {wordlist}")
    # Escludiamo la lunghezza di risposta dei falsi positivi (catch-all)
    # e disabilitiamo la blacklist di default (404)
    cmd = [
        'gobuster', 'dir',
        '-u', target,
        '-w', wordlist,
        '-t', '50',
        '--no-error',
        '--status-codes-blacklist', '',
        '--status-codes', '200,204,301,302,307,403',
        '--exclude-length', '468'  # Esclude la lunghezza dei falsi positivi
    ]
    stdout, stderr, code = run_command(cmd, timeout=300)
    if code != 0:
        logger.error(f"gobuster fallito: {stderr}")
        return None
    return stdout

def call_deepseek(prompt, context):
    """Invia il risultato delle scansioni a DeepSeek per analisi."""
    payload = {
        "model": "deepseek-r1:1.5b",
        "prompt": f"{prompt}\n\nCONTESTO:\n{context[:3000]}",
        "stream": False
    }
    try:
        import requests
        response = requests.post(DEEPSEEK_URL, json=payload, timeout=60)
        if response.status_code == 200:
            return response.json().get('response', 'Nessuna risposta da DeepSeek.')
        else:
            return f"Errore DeepSeek: {response.status_code}"
    except Exception as e:
        return f"Errore chiamata DeepSeek: {str(e)}"

def run_all_scans():
    """Esegue tutte le scansioni e produce un report."""
    logger.info("🚀 Avvio scansione di sicurezza completa")
    timestamp = datetime.now().isoformat()
    results = {
        'timestamp': timestamp,
        'target': TARGET,
        'scans': {}
    }

    nmap_out = run_nmap_scan(TARGET)
    results['scans']['nmap'] = nmap_out[:5000] if nmap_out else "Nessun output"

    nikto_out = run_nikto_scan(TARGET)
    results['scans']['nikto'] = nikto_out[:5000] if nikto_out else "Nessun output"

    sqlmap_out = run_sqlmap_scan(TARGET)
    results['scans']['sqlmap'] = sqlmap_out[:5000] if sqlmap_out else "Nessun output"

    gobuster_out = run_gobuster_scan(TARGET)
    results['scans']['gobuster'] = gobuster_out[:5000] if gobuster_out else "Nessun output"

    prompt = """
Sei un esperto di sicurezza informatica.
Analizza i seguenti report di scansione e identifica:
1. Vulnerabilità critiche
2. Porte o servizi esposti pericolosamente
3. Direttori o file sensibili accessibili
4. Possibili attacchi SQL injection o XSS
5. Suggerimenti per la mitigazione

Rispondi in modo strutturato e conciso.
"""
    summary_context = "\n".join([
        f"--- NMAP ---\n{results['scans']['nmap'][:2000]}",
        f"--- NIKTO ---\n{results['scans']['nikto'][:2000]}",
        f"--- SQLMAP ---\n{results['scans']['sqlmap'][:2000]}",
        f"--- GOBUSTER ---\n{results['scans']['gobuster'][:2000]}",
    ])
    deepseek_analysis = call_deepseek(prompt, summary_context)
    results['deepseek_analysis'] = deepseek_analysis

    report_file = f"/var/log/security_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(report_file, 'w') as f:
        json.dump(results, f, indent=2)
    logger.info(f"📄 Report salvato in {report_file}")

    return results

if __name__ == "__main__":
    run_all_scans()
