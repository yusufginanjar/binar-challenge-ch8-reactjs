import { Link } from 'react-router-dom';

export default function Navbar(){
    return(
        <div className="navbar">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/create">Create</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/search">Search</Link>
                    </li>
                </ul>
        </div>
    )
}