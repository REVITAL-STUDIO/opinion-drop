import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';

const ProviderSignIn: React.FC = () => {
    const { signInWithGoogle, signInWithFacebook } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignInWithGoogle = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithGoogle();
        } catch (error) {
            setError('Google sign-in failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignInWithFacebook = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithFacebook();
        } catch (error) {
            setError('Facebook sign-in failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <button onClick={handleSignInWithGoogle} disabled={loading}>
                {loading ? 'Loading...' : 'Sign in with Google'}
            </button>
            <button onClick={handleSignInWithFacebook} disabled={loading}>
                {loading ? 'Loading...' : 'Sign in with Facebook'}
            </button>
        </div>
    );
};

export default ProviderSignIn;