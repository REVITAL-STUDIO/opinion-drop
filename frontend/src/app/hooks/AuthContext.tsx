'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, initializeFirebase } from '../firebase/firebase-config';
import { onAuthStateChanged, User, updateEmail, updatePassword } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import Cookies from 'js-cookie';

interface ExtendedUser extends User {
    username?: string;
    profilePic?: string;

}

interface AuthContextType {
    currentUser: ExtendedUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signInWithFacebook: () => Promise<void>;
    logout: () => Promise<void>;
    updateUserEmail: (newEmail: string) => Promise<void>;
    updateUserPassword: (newPassword: string) => Promise<void>;
    updateUserUsername: (newUsername: string) => void;
    updateUserProfilePic: (newProfilePic: string) => void;

    accessToken: string | null;

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState<string | null>(Cookies.get('accessToken') || null);

    const login = async (email: string, password: string) => {
        if (!auth) return;
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;
            const idToken = await user.getIdToken();

            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/users/login`, {
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

            const res = await response.json();
            const username = res.data.user.username;
            const profilePic = res.data.user.profilePicture;

            const extendedUser = { ...user, username, profilePic } as ExtendedUser;

            setCurrentUser(extendedUser);
            localStorage.setItem('username', username);
            localStorage.setItem('profilePic', profilePic);

        } catch (error) {
            console.error('Error signing in with email and password:', error);
            throw error;
        }
    };

    const signup = async (email: string, password: string) => {
        if (!auth) return;
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;
            const idToken = await user.getIdToken();

            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/users/register/credentials`, {
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

            const res = await response.json();
            const username = res.data.user.username;
            const profilePic = res.data.user.profilePicture;

            const extendedUser = { ...user, username, profilePic } as ExtendedUser;

            setCurrentUser(extendedUser);
            localStorage.setItem('username', username);
            localStorage.setItem('profilePic', profilePic);
        } catch (error) {
            console.error('Error signing up with email and password:', error);
            throw error;
        }
    };

    const signInWithGoogle = async () => {
        if (!auth) return;
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = result.user;
            const idToken = await user.getIdToken();

            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/users/register/provider`, {
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


            const res = await response.json();
            const username = res.data.user.username;
            const profilePic = res.data.user.profilePicture;
            const extendedUser = { ...user, username, profilePic } as ExtendedUser;

            setCurrentUser(extendedUser);
            localStorage.setItem('username', username);
            localStorage.setItem('profilePic', profilePic);
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    const signInWithFacebook = async () => {
        if (!auth) return;
        try {
            const result = await signInWithPopup(auth, new FacebookAuthProvider());
            const user = result.user;
            const idToken = await user.getIdToken();

            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/api/users/register/provider`, {
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


            const res = await response.json();
            const username = res.data.user.username;
            const profilePic = res.data.user.profilePicture;
            const extendedUser = { ...user, username, profilePic } as ExtendedUser;

            setCurrentUser(extendedUser);
            localStorage.setItem('username', username);
            localStorage.setItem('profilePic', profilePic);
        } catch (error) {
            console.error('Error signing in with Facebook:', error);
        }
    };


    const logout = async () => {
        if (!auth) return;
        try {
            await auth.signOut();
            setCurrentUser(null);
            setAccessToken(null);
            Cookies.remove('accessToken'); // Remove token on logout
            localStorage.removeItem('username');
            localStorage.removeItem('profilePic');
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    };

    const updateUserEmail = async (newEmail: string) => {
        if (!auth) return;

        if (!auth.currentUser) return;
        try {
            await updateEmail(auth.currentUser, newEmail);
        } catch (error) {
            console.error('Error updating email:', error);
            throw error;
        }
    };

    const updateUserPassword = async (newPassword: string) => {
        if (!auth) return;

        if (!auth.currentUser) return;
        try {
            await updatePassword(auth.currentUser, newPassword);
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
    };

    const updateUserUsername = (newUsername: string) => {
        setCurrentUser(prevUser => {
            if (prevUser) {
                return { ...prevUser, username: newUsername } as ExtendedUser;
            }
            return null;
        });
    
        localStorage.setItem('username', newUsername);
    };

    const updateUserProfilePic = (newProfilePic: string) => {
        setCurrentUser(prevUser => {
            if (prevUser) {
                return { ...prevUser, profilePic: newProfilePic } as ExtendedUser;
            }
            return null;
        });
    
        localStorage.setItem('profilePic', newProfilePic);
    };

    useEffect(() => {
        initializeFirebase();
        if (!auth) return;
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const username = localStorage.getItem('username');
                const profilePic = localStorage.getItem('profilePic');
                const extendedUser = { ...user, username, profilePic } as ExtendedUser;
                setCurrentUser(extendedUser);
            } else {
                setCurrentUser(null);
            }
            setLoading(false);

            const token = Cookies.get('accessToken');
            if (token) {
                setAccessToken(token);
            }
        });

        return unsubscribe;
    }, []);
    
    return (
        <AuthContext.Provider value={{ currentUser, loading, login, signup, logout, signInWithGoogle, signInWithFacebook, updateUserEmail, updateUserPassword, updateUserUsername, updateUserProfilePic, accessToken }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

