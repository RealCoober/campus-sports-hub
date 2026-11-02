import { useState, useEffect } from 'react';
import api from '../api';
import Layout from '../Layout';

export default function Schedule() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        api.get('/games').then(res => setGames(res.data)).catch(console.error);
    }, []);

    return (
        <Layout>
            <div className="page-heading">
                <div className="overline">THE COMPETITION</div>
                <h1>Games & standings.</h1>
            </div>
            <div className="fixture-list">
                {games.map(g => (
                    <div key={g.id} className="fixture">
                        <div className="fixture-match">
                            <b>{g.home_team}</b>
                            <span>VS</span>
                            <b>{g.away_team}</b>
                        </div>
                        <span className={`tag tag-${g.status.toLowerCase()}`}>{g.status}</span>
                    </div>
                ))}
                {games.length === 0 && <p>No games scheduled yet.</p>}
            </div>
        </Layout>
    );
}