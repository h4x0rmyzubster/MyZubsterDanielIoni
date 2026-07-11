import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
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

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Tutti i campi sono obbligatori');
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Le password non coincidono');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('La password deve essere lunga almeno 6 caratteri');
            setLoading(false);
            return;
        }

        try {
            const response = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            });

            console.log('✅ Registrazione riuscita:', response);
            navigate('/login');
        } catch (err) {
            console.error('❌ Errore registrazione:', err);
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError('Errore durante la registrazione. Riprova.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">MyZubster</h1>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Registrati</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Nome</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Mario Rossi"
                            required
                            disabled={loading}
                        />
                    </div>

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
                            minLength={6}
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Conferma Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••••"
                            required
                            minLength={6}
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Registrazione in corso...' : 'Registrati'}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Hai già un account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">Accedi</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;