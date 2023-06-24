import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import { GoogleLogout } from 'react-google-login';

const clientId = "335997660934-uoasidvm8sigceqsl0o9ge19pfhupk2p.apps.googleusercontent.com";

export default function Navbar() {
    const [cartView, setCartView] = useState(false);
    let data = useCart();
    let flag = localStorage.getItem("flag");
    const navigate = useNavigate();
    const onSuccess = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("flag");
        console.log("logout successfully!")
        navigate("/login");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active fs-4" aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                (localStorage.getItem("authToken"))
                                    ? <li className="nav-item">
                                        <Link className="nav-link active fs-4" aria-current="page" to="/myOrder">My Orders</Link>
                                    </li>
                                    : ""
                            }
                        </ul>
                        {
                            (!localStorage.getItem("authToken"))
                                ?
                                <div className='d-flex'>
                                    <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                    <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
                                </div>
                                : <div>
                                    <div className='btn bg-white text-success mx-2' onClick={() => setCartView(true)}>
                                        My Cart{"   "}
                                        <Badge pill bg="danger" >
                                            {data.length ? data.length : null}
                                        </Badge>
                                    </div>
                                    {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                                    {flag
                                        ? <div id='signOutButton' className='btn bg-white text-danger mx-2'>
                                            <GoogleLogout
                                                clientId={clientId}
                                                buttonText={"Logout"}
                                                onLogoutSuccess={onSuccess}
                                            />
                                        </div>
                                        : <div className='btn bg-white text-danger mx-2' onClick={onSuccess}>
                                            logout
                                        </div>
                                    }
                                </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
// className='btn bg-white text-danger mx-2'