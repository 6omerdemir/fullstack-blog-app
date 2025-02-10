import React from 'react';
import { Input, Button, Container } from 'semantic-ui-react';

function Register() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleRegister = () => {
        console.log('Username:', username);
        console.log('Password:', password);
    };
    return (
        <Container className="register-container"
            style={{
                display: 'flex',
                marginTop: '50px',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <h2>Sign Up</h2>
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
            <Button primary size="large" onClick={handleRegister}>Continue</Button>

        </Container>
    );
}

export default Register;
