import React, {useContext} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import noteContext from "../contexts/notes/noteContext"


const Navbar = () => {

    const location = useLocation();

    const context = useContext(noteContext);
    const {token, saveToken} = context;
    const navigate = useNavigate();

    const logOut = (e) =>{
        e.preventDefault();
        localStorage.clear();
        saveToken();
        navigate('/login');
    }
    
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/'? "active": ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about'? "active": ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <button hidden={(!token)} className="btn btn-primary mx-2" onClick={logOut}>Logout</button> 

                            <Link hidden={(token)? true: false } className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                            <Link hidden={(token)? true: false } className="btn btn-primary mx-2" to="/register" role="button">Register</Link>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar