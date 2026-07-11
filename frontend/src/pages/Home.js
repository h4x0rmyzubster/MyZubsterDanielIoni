import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">MyZubster</h1>
                <p className="text-gray-600 mb-6">Scambio di competenze con Monero</p>
                <div className="space-y-2">
                    <Link to="/register" className="block w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Registrati
                    </Link>
                    <Link to="/login" className="block w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">
                        Accedi
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;