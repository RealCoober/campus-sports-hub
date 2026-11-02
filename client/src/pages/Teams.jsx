import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Layout from '../Layout';

function Teams() {
    const [teams, setTeams] = useState([]);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const fetchTeams = () => {
        api.get('/teams')
           .then(res => setTeams(res.data))
           .catch(err => console.error("Error fetching teams:", err));
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) return navigate('/login');
        
        setUser(JSON.parse(storedUser));
        fetchTeams();
    }, [navigate]);

    const handleJoin = async (teamId) => {
        try {
            const response = await api.post(`/teams/${teamId}/join`);
            setMessage(response.data.message || 'Request sent successfully!');
            fetchTeams();
        } catch (err) {
            setMessage(err.response?.data?.error || 'Failed to send request.');
        }
    };

    return (
        <Layout>
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
                            
                            {user && t.captain_id === user.id ? (
                                <button className="outline wide" disabled>Your team</button>
                            ) : t.user_status === 'APPROVED' ? (
                                <button className="outline wide" disabled>Member</button>
                            ) : t.user_status === 'PENDING' ? (
                                <button className="outline wide" disabled>Request Pending</button>
                            ) : (
                                <button className="primary wide" onClick={() => handleJoin(t.id)}>
                                    Request to join →
                                </button>
                            )}
                        </article>
                    ))}
                </div>
            )}
        </Layout>
    );
}

export default Teams;