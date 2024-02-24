import React from 'react';
import { RiAdminFill } from "react-icons/ri";
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();
  let isLogedIn = false;
  let auth = localStorage.getItem("user");

  if(auth)
  {
    isLogedIn = true;
  }

  const handleLogOut = () => 
  {
     try {
      localStorage.removeItem("user");
      navigate("/");
     } catch (error) {
      console.log(`Error while log out :: ${error}`);
     }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light text-muted">
      <Link className="navbar-brand" to="/" style={{marginLeft: '20px', fontSize:'24px', color:'ActiveBorder'}}>
        Demmo App
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item" style={{ marginRight:'20px'}}>
            <NavLink className="nav-link" to="/" exact>
              Home
            </NavLink>
          </li>
          <li className="nav-item" style={{ marginRight:'20px'}}>
          <Link className="nav-link" to="/purchase_list" style={{marginLeft: '20px'}}>
            Purchase List
          </Link>
          </li>
          <li className="nav-item" style={{ marginRight:'20px'}}>
            <Link className="nav-link" to="/sale_lists" style={{marginLeft: '20px'}}>
              Sale List
            </Link>
          </li>
          <li className="nav-item" style={{ marginRight:'20px'}}>
            <Link className="nav-link admin-icon" to="/login">
              <RiAdminFill className="admin-icon" style={{ fontSize: '24px' }} />
              <h4>{auth ? auth.name : ""}</h4>
            </Link>
          </li>
          {isLogedIn ? 
          <li className="nav-item" style={{ marginRight:'20px'}}>
            <button className='btn btn-outline-danger' onClick={handleLogOut} >Logout</button>
          </li>
          :
          ""
        }
        </ul>
      </div>
    </nav>
  );
};

export default Header;
