import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Register() {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Call the register endpoint we made earlier
            const response = await api.post('/auth/register', formData);
            
            // Save the token so they are logged in automatically after registering
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            navigate('/dashboard'); 
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed.');
        }
    };

    return (
        <div className="auth-layout">
            <div className="auth-intro">
                <div className="overline">JOIN THE COMMUNITY</div>
                <h1>Create an account.</h1>
                <p>Sign up to start joining teams and booking facilities.</p>
                <div className="auth-art">
                    🏆
                    <span>GET IN THE GAME.</span>
                </div>
            </div>
            
            <div className="auth-card">
                <h2>Register for CampusPlay</h2>
                
                {error && <div className="notice notice-error">{error}</div>}
                
                <form onSubmit={handleRegister} className="stack-form">
                    <div className="two-inputs">
                        <label>First name
                            <input type="text" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                        </label>
                        <label>Last name
                            <input type="text" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                        </label>
                    </div>
                    <label>Email
                        <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </label>
                    <label>Password
                        <input type="password" required minLength="8" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                    </label>
                    <button type="submit" className="primary wide">Create account →</button>
                </form>
            </div>
        </div>
    );
}

export default Register;