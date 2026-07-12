import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newSkill, setNewSkill] = useState('');
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        // Leggi i dati dal localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                setSkills(parsedUser.skills || []);
                setLoading(false);
            } catch (e) {
                setError('Errore nel caricamento dei dati utente');
                setLoading(false);
            }
        } else {
            // Se non c'è utente, reindirizza al login
            navigate('/login');
        }
    }, [navigate]);

    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            const updatedSkills = [...skills, newSkill.trim()];
            setSkills(updatedSkills);
            
            // Aggiorna il localStorage
            if (user) {
                const updatedUser = { ...user, skills: updatedSkills };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
            }
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        const updatedSkills = skills.filter(s => s !== skillToRemove);
        setSkills(updatedSkills);
        
        // Aggiorna il localStorage
        if (user) {
            const updatedUser = { ...user, skills: updatedSkills };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-gray-600">Caricamento profilo...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    Nessun utente loggato. <a href="/login" className="underline">Accedi</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-blue-600 mb-6">Il mio Profilo</h1>

                    {/* INFO UTENTE */}
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600 font-medium mb-1">Nome</label>
                                <p className="text-gray-800 font-semibold">{user.name}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-1">Email</label>
                                <p className="text-gray-800">{user.email}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-1">Ruolo</label>
                                <p className="text-gray-800 capitalize">{user.role || 'Utente'}</p>
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-1">Valutazione</label>
                                <p className="text-gray-800">⭐ {user.rating || 0}/5</p>
                            </div>
                        </div>
                    </div>

                    {/* COMPETENZE */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Competenze</h2>
                        
                        {/* Form per aggiungere competenza */}
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                                placeholder="Aggiungi una competenza..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleAddSkill}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Aggiungi
                            </button>
                        </div>

                        {/* Lista competenze */}
                        <div className="flex flex-wrap gap-2">
                            {skills.length === 0 ? (
                                <p className="text-gray-500">Nessuna competenza aggiunta.</p>
                            ) : (
                                skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                                    >
                                        {skill}
                                        <button
                                            onClick={() => handleRemoveSkill(skill)}
                                            className="text-red-500 hover:text-red-700 font-bold"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))
                            )}
                        </div>
                    </div>

                    {/* PULSANTI */}
                    <div className="mt-8 pt-4 border-t border-gray-200">
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                navigate('/');
                            }}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="ml-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                        >
                            Torna alla Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;