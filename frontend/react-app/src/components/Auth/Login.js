import React from 'react';
import { Input, Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        console.log('Username:', username);
        console.log('Password:', password);
    };
    return (
        <Container className="login-container"
            style={{
                display: 'flex',
                marginTop: '50px',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <h2>Sign In</h2>
            <Input
                placeholder='Username'
                className="login-input"
                value={username}
                onChange={handleUsername}
                style={{
                    marginBottom: '20px',
                    width: '20%',
                    border: '1px solid #2185d0',
                }}
            />

            <Input
                type='password'
                placeholder='Password'
                className="login-input"
                value={password}
                onChange={handlePassword}
                style={{
                    marginBottom: '20px',
                    width: '20%',
                    border: '1px solid #2185d0',
                }}
            />

            <Button primary size="large"
            onClick={handleLogin}>Continue</Button>
            <hr style={{
                width: '20%',
                border: 'none',
                borderTop: '1px solid grey',
                margin: '10px 0'
            }}></hr>

            <p style={{ fontSize: '14px' }}>
                First time here? <Link to="/register" style={{ color: '#2185d0', textDecoration: 'none', fontWeight: 'bold' }}>Create an account</Link>
            </p>

        </Container>
    );
}

export default Login;
