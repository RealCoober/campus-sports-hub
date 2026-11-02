import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/dashboard'); 
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="auth-layout">
            <div className="auth-intro">
                <div className="overline">GET IN THE GAME</div>
                <h1>Welcome back.</h1>
                <p>Sign in to manage your teams, reservations, and campus sports activities.</p>
                <div className="auth-art">
                    🏆
                    <span>IT STARTS HERE.</span>
                </div>
            </div>
            
            <div className="auth-card">
                <h2>Sign in to CampusPlay</h2>
                
                {error && <div className="notice notice-error">{error}</div>}
                
                <form onSubmit={handleLogin} className="stack-form">
                    <label>
                        Email
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            placeholder="you@school.ca"
                        />
                    </label>
                    <label>
                        Password
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            placeholder="Minimum 8 characters"
                        />
                    </label>
                    <button type="submit" className="primary wide">
                        Log in →
                    </button>
                </form>
                
                <p style={{ marginTop: '20px', fontSize: '12px', textAlign: 'center' }}>
                    Don't have an account? <a href="/register" style={{ color: '#416545', fontWeight: 'bold' }}>Register here</a>
                </p>
            </div>
        </div>
    );
}

export default Login;