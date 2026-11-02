import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Layout({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path ? 'nav-item active' : 'nav-item';

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
                    <Link to="/dashboard" className={isActive('/dashboard')} style={{textDecoration: 'none'}}>
                        <span className="nav-emoji">◈</span> Discover
                    </Link>
                    <Link to="/teams" className={isActive('/teams')} style={{textDecoration: 'none'}}>
                        <span className="nav-emoji">♧</span> Teams
                    </Link>
                    <Link to="/facilities" className={isActive('/facilities')} style={{textDecoration: 'none'}}>
                        <span className="nav-emoji">▥</span> Facilities
                    </Link>
                    <Link to="/schedule" className={isActive('/schedule')} style={{textDecoration: 'none'}}>
                        <span className="nav-emoji">▦</span> Games
                    </Link>
                    <Link to="/manage-requests" className={isActive('/manage-requests')} style={{textDecoration: 'none'}}>
                        <span className="nav-emoji">⚙</span> Manage
                    </Link>
                </nav>
                <div className="sidebar-foot">
                    <span className="online-dot"></span> Phase 1 · Local prototype
                </div>
            </aside>

            <div className="content-wrap">
                <header className="topbar">
                    <span className="breadcrumb">
                        CAMPUS SPORTS <b>/</b> {location.pathname.replace('/', '').toUpperCase() || 'DISCOVER'}
                    </span>
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
                    {children}
                </main>
            </div>
        </div>
    );
}