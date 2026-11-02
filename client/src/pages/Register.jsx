import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Register() {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/auth/register', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/dashboard'); 
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed.');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f6f8f8' }}>
            {/* Left Panel - Branding */}
            <div style={{ 
                flex: 1, 
                backgroundColor: '#111e2d', 
                color: 'white', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                padding: '4rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative background circle */}
                <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(198,241,97,0.1) 0%, rgba(17,30,45,0) 70%)' }}></div>
                
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px' }}>
                    <div className="brand" style={{ marginBottom: '3rem', padding: 0 }}>
                        <div className="brand-mark">✳</div>
                        <div>
                            <strong style={{ fontSize: '24px' }}>CAMPUS<span style={{ color: '#c6f161' }}>PLAY</span></strong>
                            <small>SPORTS & INTRAMURALS</small>
                        </div>
                    </div>
                    
                    <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1', letterSpacing: '-2px', marginBottom: '1.5rem' }}>
                        Join the<br/>
                        <span style={{ color: '#c6f161' }}>community.</span>
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#becbd3', lineHeight: '1.6' }}>
                        Create an account to start joining teams, booking facilities, and getting in the game.
                    </p>
                </div>
            </div>

            {/* Right Panel - Register Form */}
            <div style={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '2rem' 
            }}>
                <div style={{ 
                    width: '100%', 
                    maxWidth: '440px',
                    backgroundColor: 'white',
                    padding: '3rem',
                    borderRadius: '24px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
                    border: '1px solid #e5eae9'
                }}>
                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#172536' }}>Create an account</h2>
                        <p style={{ color: '#83909b', fontSize: '14px' }}>Fill in your details to get started.</p>
                    </div>
                    
                    {error && (
                        <div className="notice notice-error" style={{ marginBottom: '1.5rem' }}>
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleRegister} className="stack-form">
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <label style={{ flex: 1, display: 'block', fontSize: '12px', fontWeight: '700', color: '#566875' }}>
                                First Name
                                <input 
                                    type="text" 
                                    value={formData.firstName} 
                                    onChange={e => setFormData({...formData, firstName: e.target.value})} 
                                    required
                                    style={{ width: '100%', padding: '14px', marginTop: '6px', borderRadius: '10px', border: '1px solid #dae3e2', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </label>
                            <label style={{ flex: 1, display: 'block', fontSize: '12px', fontWeight: '700', color: '#566875' }}>
                                Last Name
                                <input 
                                    type="text" 
                                    value={formData.lastName} 
                                    onChange={e => setFormData({...formData, lastName: e.target.value})} 
                                    required
                                    style={{ width: '100%', padding: '14px', marginTop: '6px', borderRadius: '10px', border: '1px solid #dae3e2', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                                />
                            </label>
                        </div>

                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#566875', marginTop: '1rem' }}>
                            Email Address
                            <input 
                                type="email" 
                                value={formData.email} 
                                onChange={e => setFormData({...formData, email: e.target.value})} 
                                required 
                                placeholder="you@school.ca"
                                style={{ width: '100%', padding: '14px', marginTop: '6px', borderRadius: '10px', border: '1px solid #dae3e2', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                            />
                        </label>
                        
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#566875', marginBottom: '8px', marginTop: '1rem' }}>
                            Password
                            <input 
                                type="password" 
                                value={formData.password} 
                                onChange={e => setFormData({...formData, password: e.target.value})} 
                                required 
                                minLength="8"
                                placeholder="Minimum 8 characters"
                                style={{ width: '100%', padding: '14px', marginTop: '6px', borderRadius: '10px', border: '1px solid #dae3e2', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                            />
                        </label>

                        <button 
                            type="submit" 
                            className="primary wide" 
                            style={{ 
                                marginTop: '1.5rem', 
                                padding: '14px', 
                                fontSize: '14px', 
                                borderRadius: '10px',
                                backgroundColor: '#193348',
                                color: 'white',
                                fontWeight: '700',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#2b556b'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#193348'}
                        >
                            Create Account
                        </button>
                    </form>
                    
                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '13px', color: '#83909b' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#193348', fontWeight: '700', textDecoration: 'none' }}>
                            Sign in here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;