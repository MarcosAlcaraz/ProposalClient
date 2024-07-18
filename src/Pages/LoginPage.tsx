import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogInButton from '../Components/LogInButton';
import mainIcon from '../assets/mainIcon.png';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const emailLogin = () => {
    // Implementa aquí la lógica de inicio de sesión con correo y contraseña
    console.log('Email:', email);
    console.log('Password:', password);
    // TODO Implementar validación de email y password
    if(true) {
      navigate("/home");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={mainIcon} alt="Main Icon" style={styles.icon} />
        <h1 style={styles.title}>Proposal</h1>
        <h3 style={styles.subtitle}>Log In</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={emailLogin} style={styles.loginButton}>Log In</button>
        <a onClick={() => {navigate("/signUp")}} style={styles.signUpLink}>Sign up</a>
        <br />
        <p>__________ or log in with __________</p>
        <br />
        <LogInButton />
        <br />
        <a onClick={() => {navigate("/forgot-password")}} style={styles.signUpLink}> I can't log in </a>
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
  icon: {
    width: '100px',
    height: '100px',
    marginBottom: '1rem',
  },
  title: {
    marginBottom: '1rem',
    fontSize: '2rem',
    color: '#333',
  },
  subtitle: {
    marginBottom: '1rem',
    fontSize: '1.5rem',
    color: '#555',
  },
  input: {
    width: '80%',
    padding: '0.5rem',
    margin: '0.5rem 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  loginButton: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  signUpLink: {
    marginTop: '1rem',
    color: '#007BFF',
    textDecoration: 'none',
    fontSize: '1rem',
    textDecorationLine: 'underline',
  },
  token: {
    marginBottom: '1rem',
    fontSize: '1rem',
    color: '#555',
  },
};

export default LoginPage;