import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import Layout from '../Layout';

function Dashboard() {
    const [sports, setSports] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/login');
        
        api.get('/sports')
           .then(res => setSports(res.data))
           .catch(err => console.error("Error fetching sports:", err));
    }, [navigate]);

    return (
        <Layout>
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
                        <button key={s.id} className="sport-card">
                            <span className="sport-copy">
                                <b>{s.name}</b>
                                <small>{s.description}</small>
                            </span>
                            <span className="card-arrow">↗</span>
                        </button>
                    ))}
                </div>
            )}
        </Layout>
    );
}

export default Dashboard;