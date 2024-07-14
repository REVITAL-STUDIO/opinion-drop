import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';

const EmailSignIn: React.FC = () => {
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
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {error && <p>{error}</p>}
            <button onClick={handleAuthAction} disabled={loading}>
                {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
            <button onClick={() => setIsSignUp(!isSignUp)} disabled={loading}>
                {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
            </button>
        </div>
    );
};

export default EmailSignIn;