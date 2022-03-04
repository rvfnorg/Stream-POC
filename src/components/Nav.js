import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "./../assets/Rvillage Mosaic Logo.svg";
import { useSelector } from "react-redux";

export default function Nav({ moveForward, moveBack, currentSlide, logout }) {
  const profile = useSelector((s) => s.profile);

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          <Logo
            src={logo}
            alt="logo"
            className="d-inline-block align-text-top"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {profile.roles.includes("admin") && (
              <>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Fullsite
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <Link className="dropdown-item" to="/ready">
                        Ready
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/intro">
                        Intro
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/flatfeedexample">
                        Feeds 101
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/createuser">
                        Create User
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/flatfeedexample">
                        Agrigated Feed
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/bootstrapexample">
                        Bootstrap Example
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/flatfeedexample">
                        Flat Feed Example
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Social Network Framework
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown link
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="/">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={(e) => {
                      moveBack();
                      e.preventDefault();
                    }}
                    href="/"
                  >
                    Back
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/"
                    onClick={(e) => {
                      moveForward();
                      e.preventDefault();
                    }}
                  >
                    {currentSlide} Forward
                  </a>
                </li>
              </>
            )}
          </ul>
          {profile.uid && !profile.displayName && (
            <span className="navbar-text">{profile.uid}</span>
          )}
          {profile.displayName && (
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Welcome {profile.displayName}
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href="/createuser">
                      Edit Profile
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => logout()}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

const Logo = styled.img`
  height: 60px;
`;
