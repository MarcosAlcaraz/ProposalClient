import React from 'react';
import LogInButton from '../Components/LogInButton';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { token } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome</h1>
        {token ? (
          <p style={styles.token}>Current Token: {token}</p>
        ) : (
          <p style={styles.token}>No Token found</p>
        )}
        <LogInButton />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: '1rem',
    fontSize: '2rem',
    color: '#333',
  },
  token: {
    marginBottom: '1rem',
    fontSize: '1rem',
    color: '#555',
  },
};

export default LoginPage;
