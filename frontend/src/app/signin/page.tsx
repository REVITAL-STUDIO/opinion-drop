import React from 'react';
import ProviderSignIn from '../components/ProviderSignIn';
import EmailSignIn from '../components/CredentialsSignIn';

const AuthPage: React.FC = () => {
    return (
        <div>
            <h1>Sign In</h1>
            <ProviderSignIn />
            <EmailSignIn />
        </div>
    );
};

export default AuthPage;