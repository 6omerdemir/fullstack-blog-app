import React from 'react';
import { Input, Button, Container } from 'semantic-ui-react';

function Register() {
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
            <Input placeholder='Username' className="register-input" 
            style={{
                marginBottom: '20px',
                width: '20%',
                border: '1px solid #2185d0',
            }} />
            <Input type='password' placeholder='Password' className="register-input" 
            style={{
                marginBottom: '20px',
                width: '20%',
                border: '1px solid #2185d0',
            }}/>
            <Button primary size="large">Continue</Button>
        
        </Container>
    );
}

export default Register;
