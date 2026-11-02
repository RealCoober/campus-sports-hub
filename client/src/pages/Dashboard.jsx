import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Dashboard() {
    const [sports, setSports] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (!token || !storedUser) return navigate('/login');
        
        setUser(JSON.parse(storedUser));
        
        // Fetch sports from backend
        api.get('/sports')
           .then(res => setSports(res.data))
           .catch(err => console.error("Error fetching sports:", err));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="layout">
            {/* SIDEBAR */}
            <aside className="sidebar">
                <div className="brand">
                    <div className="brand-mark">✳</div>
                    <div>
                        <strong>CAMPUS<span>PLAY</span></strong>
                        <small>SPORTS & INTRAMURALS</small>
                    </div>
                </div>
                <div className="nav-label">EXPLORE</div>
                <nav>
                    <Link to="/dashboard" className="nav-item active" style={{textDecoration: 'none'}}>
                        <span className="nav-emoji">◈</span> Discover
                    </Link>
                    <Link to="/teams" className="nav-item" style={{textDecoration: 'none'}}>
                        <span className="nav-emoji">♧</span> Teams
                    </Link>
                </nav>
                <div className="sidebar-foot">
                    <span className="online-dot"></span> Phase 1 · Local prototype
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="content-wrap">
                <header className="topbar">
                    <span className="breadcrumb">CAMPUS SPORTS <b>/</b> DISCOVER</span>
                    {user && (
                        <div className="account">
                            <div className="avatar">{user.firstName[0]}</div>
                            <div className="account-info">
                                <b>{user.firstName} {user.lastName}</b>
                                <small>{user.role}</small>
                            </div>
                            <button className="ghost small" onClick={handleLogout}>Log out</button>
                        </div>
                    )}
                </header>

                <main className="main">
                    {/* HERO SECTION */}
                    <section className="hero">
                        <div className="hero-copy">
                            <div className="eyebrow"><span className="pulse"></span> YOUR CAMPUS. YOUR GAME.</div>
                            <h1>Find your people.<br/><em>Play your sport.</em></h1>
                            <p>Discover intramural leagues, join a team, and get in the game—all in one place.</p>
                            <Link to="/teams">
                                <button className="light-btn">Explore teams <span>↗</span></button>
                            </Link>
                        </div>
                        <div className="hero-graphic" aria-hidden="true">
                            <div className="big-ball">⚽</div>
                        </div>
                    </section>

                    {/* SPORTS GRID */}
                    <div className="section-title">
                        <div>
                            <div className="overline">PICK YOUR PASSION</div>
                            <h2>Explore sports</h2>
                        </div>
                    </div>
                    
                    {sports.length === 0 ? (
                        <p className="subtle">Loading sports...</p>
                    ) : (
                        <div className="sports-grid">
                            {sports.map(s => (
                                <button key={s.id || s.sportID} className="sport-card">
                                    <span className="sport-icon">{s.icon || '🏅'}</span>
                                    <span className="sport-copy">
                                        <b>{s.name}</b>
                                        <small>{s.description}</small>
                                    </span>
                                    <span className="card-arrow">↗</span>
                                </button>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Dashboard;