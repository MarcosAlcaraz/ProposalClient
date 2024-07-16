import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { useAuth } from '../context/AuthContext';

const clientId = '147877297481-o6fuh1c2hkqfn1v5m7vkt1ra7e7nbr4d.apps.googleusercontent.com'

const LogInButton: React.FC = () => {
    const { setToken } = useAuth();

    const handleLoginSuccess = (response: CredentialResponse) => {
        if (response.credential) {
            setToken(response.credential);
            
        } else {
            console.log("Credential is missing in the response")
        }
        console.log('Login Success:', response);
    };

    const handleLoginFailure = () => {
        console.log('Login Failure:');
    };

    return (
        <div id='signInButton'>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                // useOneTap                   
                />
            </GoogleOAuthProvider>
        </div>
    )
}

export default LogInButton;