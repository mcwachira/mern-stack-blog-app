import { Link } from "react-router-dom";
import "./topbar.css";
import { Outlet } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Topbar() {
    const user = false;
    return (
        <>
            <div className="top">
                <div className="topLeft">
                    <i className="topIcon fab fa-facebook-square"></i>
                    <i className="topIcon fab fa-instagram-square"></i>
                    <i className="topIcon fab fa-pinterest-square"></i>
                    <i className="topIcon fab fa-twitter-square"></i>
                </div>
                <div className="topCenter">
                    <ul className="topList">
                        <li className="topListItem">
                            <Link className="link" to="/">
                                HOME
                            </Link>
                        </li>
                        <li className="topListItem">ABOUT</li>
                        <li className="topListItem">CONTACT</li>
                        <li className="topListItem">
                            <Link className="link" to="/write">
                                WRITE
                            </Link>
                        </li>
                        {user && <li className="topListItem">LOGOUT</li>}
                    </ul>
                </div>
                <div className="topRight">
                    {user ? (
                        <Link className="link" to="/settings">
                            <img
                                className="topImg"
                                src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                alt=""
                            />
                        </Link>
                    ) : (
                        <ul className="topList">
                            <li className="topListItem">
                                <Link className="link" to="/signin">
                                    Sign In
                                </Link>
                            </li>
                            <li className="topListItem">
                                <Link className="link" to="/signup">
                                    SIgn Up
                                </Link>
                            </li>
                        </ul>
                    )}

                    <FaSearch className="topSearchIcon " size={30} />

                </div>
            </div>

            <Outlet />
        </>

    );
}