import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const clientId = '147877297481-o6fuh1c2hkqfn1v5m7vkt1ra7e7nbr4d.apps.googleusercontent.com'

const LogInButton: React.FC = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLoginSuccess = (response: CredentialResponse) => {
        if (response.credential) {
            setToken(response.credential);
            navigate('/home');
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
                <div style={styles.buttonContainer}>
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginFailure}
                    // useOneTap                   
                    />
                </div>
            </GoogleOAuthProvider>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

export default LogInButton;