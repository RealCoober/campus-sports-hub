import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Layout from '../Layout';

export default function ManageRequests() {
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) return navigate('/login');
        fetchRequests();
    }, [navigate]);

    const fetchRequests = () => {
        api.get('/teams/join-requests/pending')
           .then(res => setRequests(res.data))
           .catch(err => console.error(err));
    };

    const handleReview = async (id, status) => {
        try {
            const res = await api.patch(`/teams/join-requests/${id}`, { status });
            setMessage(res.data.message);
            fetchRequests();
        } catch (err) {
            setMessage('Failed to update request.');
        }
    };

    return (
        <Layout>
            <div className="page-heading">
                <div className="overline">REVIEW QUEUE</div>
                <h1>Manage requests.</h1>
                <p>Approve or reject students who want to join your teams.</p>
            </div>

            {message && <div className="notice notice-info" style={{ marginBottom: '20px', color: 'blue' }}>{message}</div>}

            <div className="table-scroll">
                <table>
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Team</th>
                            <th>Requested</th>
                            <th>Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(r => (
                            <tr key={r.id}>
                                <td>
                                    <strong>{r.first_name} {r.last_name}</strong>
                                    <small className="cell-sub">{r.email}</small>
                                </td>
                                <td>{r.team_name}</td>
                                <td>{new Date(r.requested_at).toLocaleDateString()}</td>
                                <td className="actions">
                                    <button className="primary small" onClick={() => handleReview(r.id, 'APPROVED')}>Approve</button>
                                    <button className="outline small" onClick={() => handleReview(r.id, 'REJECTED')}>Reject</button>
                                </td>
                            </tr>
                        ))}
                        {requests.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '30px' }}>
                                    No pending requests right now.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}