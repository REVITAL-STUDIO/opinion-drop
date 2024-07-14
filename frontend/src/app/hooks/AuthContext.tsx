import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase-config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import Cookies from 'js-cookie';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signInWithFacebook: () => Promise<void>;
    logout: () => Promise<void>;
    accessToken: string | null;

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState<string | null>(Cookies.get('accessToken') || null);

    const login = async (email: string, password: string) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;
            const idToken = await user.getIdToken();
            console.log('ID Token:', idToken);

            const response = await fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idToken }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            setAccessToken(idToken);
            Cookies.set('accessToken', idToken, { secure: true, sameSite: 'Strict' });

            setCurrentUser(user);

        } catch (error) {
            console.error('Error signing in with email and password:', error);
            throw error;
        }
    };

    const signup = async (email: string, password: string) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;
            const idToken = await user.getIdToken();
            console.log('ID Token:', idToken);

            const response = await fetch('/users/register/credentials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idToken }),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            setAccessToken(idToken);
            Cookies.set('accessToken', idToken, { secure: true, sameSite: 'Strict' });

            setCurrentUser(user);
        } catch (error) {
            console.error('Error signing up with email and password:', error);
            throw error;
        }
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = result.user;
            const idToken = await user.getIdToken();
            console.log('ID Token:', idToken);

            const response = await fetch('/users/register/provider', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idToken }),
            });

            if (!response.ok) {
                throw new Error('Google signin failed');
            }

            setAccessToken(idToken);
            Cookies.set('accessToken', idToken, { secure: true, sameSite: 'Strict' });

            setCurrentUser(user);

        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    const signInWithFacebook = async () => {
        try {
            const result = await signInWithPopup(auth, new FacebookAuthProvider());
            const user = result.user;
            const idToken = await user.getIdToken();
            console.log('ID Token:', idToken);

            const response = await fetch('/users/register/provider', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idToken }),
            });

            if (!response.ok) {
                throw new Error('facebook signin failed');
            }

            setAccessToken(idToken);
            Cookies.set('accessToken', idToken, { secure: true, sameSite: 'Strict' });

            setCurrentUser(user);

        } catch (error) {
            console.error('Error signing in with Facebook:', error);
        }
    };


    const logout = async () => {
        try {
            await auth.signOut();
            setCurrentUser(null);
            setAccessToken(null);
            Cookies.remove('accessToken'); // Remove token on logout
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            // Check for access token in cookies
            const token = Cookies.get('accessToken');
            if (token) {
                setAccessToken(token);
            }

        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, loading, login, signup, logout, signInWithGoogle, signInWithFacebook, accessToken }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};