import { useState, useEffect } from 'react';
import api from '../api';

function Teams() {
    const [teams, setTeams] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get('/teams')
           .then(res => setTeams(res.data))
           .catch(err => console.error("Error fetching teams:", err));
    }, []);

    const handleJoin = async (teamId) => {
        try {
            const response = await api.post(`/teams/${teamId}/join`);
            setMessage(response.data.message || 'Request sent successfully!');
        } catch (err) {
            setMessage(err.response?.data?.error || 'Failed to send request.');
        }
    };

    return (
        <div className="layout">
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
                    <a href="/dashboard" className="nav-item" style={{textDecoration: 'none'}}>
                        <span className="nav-emoji">◈</span> Discover
                    </a>
                    <a href="/teams" className="nav-item active" style={{textDecoration: 'none'}}>
                        <span className="nav-emoji">♧</span> Teams
                    </a>
                </nav>
                <div className="sidebar-foot">
                    <span className="online-dot"></span> Phase 1 · Local prototype
                </div>
            </aside>

            <div className="content-wrap">
                <header className="topbar">
                    <span className="breadcrumb">CAMPUS SPORTS <b>/</b> TEAMS</span>
                </header>

                <main className="main">
                    <div className="page-heading">
                        <div className="overline">TEAM DIRECTORY</div>
                        <h1>Find your squad.</h1>
                        <p>Explore active teams and request a spot. Captains review requests before membership is confirmed.</p>
                    </div>

                    {message && <div className="notice notice-info" style={{ marginBottom: '20px', color: 'blue' }}>{message}</div>}

                    {teams.length === 0 ? (
                        <p className="subtle">Loading teams...</p>
                    ) : (
                        <div className="team-grid">
                            {teams.map(t => (
                                <article key={t.id} className="team-card">
                                    <div className="team-top">
                                        <span className="team-badge">🏅</span>
                                        <span className="tag tag-recruiting">RECRUITING</span>
                                    </div>
                                    <h3>{t.name}</h3>
                                    <p>{t.league_name}</p>
                                    <div className="team-meta">
                                        <span>♙ {t.captain_name}</span>
                                        <span>◷ {t.member_count} players</span>
                                    </div>
                                    <button className="primary wide" onClick={() => handleJoin(t.id)}>
                                        Request to join →
                                    </button>
                                </article>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Teams;