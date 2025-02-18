import React from 'react';
import { Input, Button, Container } from 'semantic-ui-react';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const registerData = {
        "userName": username,
        "password": password
    };

    const handleRegister = async () => {
            try {
                const authService = new AuthService();
                const response = await authService.register(registerData);
                console.log("Register successful:", response.data);
                //const token = response.data.message.split(' ')[1];
                //localStorage.setItem('token', token);
                navigate('/login');
            } catch (error) {
                console.error("Register failed:", error.response ? error.response.data : error.message);
            }
    
            
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
