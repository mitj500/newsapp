import React, { Component } from "react";
import  {Link} from 'react-router-dom'
export class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              NewsMonkey
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link " aria-current="page" to="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/business" />
                  business
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/entertainment" />
                  entertainment
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/general" />
                  general
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/health" />
                  health
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/science" />
                  science
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sports" />
                  sports
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/technology" />
                  technology
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default NavBar;
