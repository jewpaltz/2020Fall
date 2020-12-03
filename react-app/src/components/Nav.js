import { useState } from "react";
import LoginBadge from "../components/LoginBadge";
import logo from '../logo.svg';

function Nav() {
  
    //let isActive = false;
    const [ isActive, setIsActive] = useState(false);

return ( 
<nav className="navbar container is-fixed-top is-info" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="https://bulma.io">
      <img src={logo} className="App-logo" alt="logo" />
    </a>

    <a role="button" className={`navbar-burger burger ${isActive ? 'is-active' : ''}`} onClick={()=> setIsActive( !isActive ) } aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`} >
    <div className="navbar-start">
      <router-link to="/"  className="navbar-item" >Home</router-link>
      <router-link to="/about"  className="navbar-item" >About</router-link>
      <router-link to="/feed"  className="navbar-item" >Feed</router-link>

      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">
          More
        </a>

        <div className="navbar-dropdown">
          <a className="navbar-item">
            About
          </a>
          <a className="navbar-item">
            Jobs
          </a>
          <a className="navbar-item">
            Contact
          </a>
          <hr className="navbar-divider" />
          <a className="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link"> Admin </a>

        <div className="navbar-dropdown">
          <router-link to="/users"  className="navbar-item" >Users</router-link>
        </div>
      </div>
    </div>

 </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <LoginBadge />
      </div>
    </div>

</nav>

)}

export default Nav;
