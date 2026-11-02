import { useState, useEffect } from 'react';
import api from '../api';
import Layout from '../Layout';

export default function Facilities() {
    const [slots, setSlots] = useState([]);
    const [message, setMessage] = useState('');

    const fetchSlots = () => {
        api.get('/facilities').then(res => setSlots(res.data)).catch(console.error);
    };

    useEffect(() => { fetchSlots(); }, []);

    const handleReserve = async (id) => {
        try {
            const res = await api.post(`/facilities/${id}/reserve`);
            setMessage(res.data.message);
            fetchSlots();
        } catch (err) {
            setMessage('Failed to reserve.');
        }
    };

    return (
        <Layout>
            <div className="page-heading">
                <div className="overline">BOOK YOUR SPACE</div>
                <h1>Facility availability.</h1>
            </div>
            {message && <div className="notice">{message}</div>}
            <div className="table-scroll">
                <table>
                    <thead><tr><th>Facility</th><th>Location</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>
                        {slots.map(s => (
                            <tr key={s.id}>
                                <td><strong>{s.facility_name}</strong></td>
                                <td>{s.location}</td>
                                <td>{s.is_reserved ? <span className="tag tag-reserved">RESERVED</span> : <span className="tag tag-open">OPEN</span>}</td>
                                <td>
                                    {!s.is_reserved && <button className="primary small" onClick={() => handleReserve(s.id)}>Reserve</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}