'use client'
import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import ProviderSignIn from './ProviderSignIn';

const SignIn: React.FC = () => {
    const { login, signup } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAuthAction = async () => {
        setLoading(true);
        setError(null);
        try {
            if (isSignUp) {
                await signup(email, password);
            } else {
                await login(email, password);
            }
        } catch (error) {
            setError('Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-lg font-semibold text-center mb-4">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border border-gray-300 p-2 rounded mb-2 w-full"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border border-gray-300 p-2 rounded mb-4 w-full"
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <button
                    onClick={handleAuthAction}
                    disabled={loading}
                    className={`bg-blue-500 text-white p-2 rounded mb-2 w-full ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
                <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    disabled={loading}
                    className={`border border-blue-500 text-blue-500 p-2 rounded w-full ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
                </button>
                <ProviderSignIn />
            </div>
        </div>
    );
};

export default SignIn;