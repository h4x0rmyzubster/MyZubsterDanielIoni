import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        console.log('🔐 Tentativo di login:', formData);

        try {
            const result = await login(formData);
            console.log('📦 Risultato login:', result);

            if (result && result.success === true && result.data) {
                const { token, user } = result.data;
                
                if (token) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    console.log('✅ Login riuscito, redirect alla home');
                    navigate('/');
                } else {
                    setError('Token non ricevuto dal server');
                }
            } else {
                setError('Risposta dal server non valida');
            }
        } catch (err) {
            console.error('❌ Errore login:', err);
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Errore durante il login. Controlla le credenziali.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">MyZubster</h1>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Accedi</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="mario@example.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Accesso in corso...' : 'Accedi'}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Non hai un account?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">Registrati</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;