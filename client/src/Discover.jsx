import { useState, useEffect } from 'react';
import api from '../api';

export default function Discover() {
    const [sports, setSports] = useState([]);
    const [leagues, setLeagues] = useState([]);

    useEffect(() => {
        // Fetch sports and leagues from your Express API
        Promise.all([api.get('/sports'), api.get('/leagues')])
            .then(([sportsRes, leaguesRes]) => {
                setSports(sportsRes.data);
                setLeagues(leaguesRes.data);
            });
    }, []);

    return (
        <>
            <section className="hero">
                <div className="hero-copy">
                    <div className="eyebrow"><span className="pulse"></span> YOUR CAMPUS. YOUR GAME.</div>
                    <h1>Find your people.<br/><em>Play your sport.</em></h1>
                    <p>Discover intramural leagues, join a team, and get in the game—all in one place.</p>
                    <button className="light-btn">Explore teams <span>↗</span></button>
                </div>
                <div className="hero-graphic" aria-hidden="true">
                    <div className="big-ball">⚽</div>
                    <div className="graphic-pill pill-a">GAME ON ↗</div>
                    <div className="graphic-pill pill-b">★ JOIN THE COMMUNITY</div>
                </div>
            </section>

            <div className="section-title">
                <div><div className="overline">PICK YOUR PASSION</div><h2>Explore sports</h2></div>
            </div>
            
            <div className="sports-grid">
                {sports.map(s => (
                    <button key={s.id} className="sport-card">
                        <span className="sport-icon">{s.icon || '🏅'}</span>
                        <span className="sport-copy">
                            <b>{s.name}</b>
                            {/* Mocked league count for now */}
                            <small>1 league available</small> 
                        </span>
                        <span className="card-arrow">↗</span>
                    </button>
                ))}
            </div>
        </>
    );
}