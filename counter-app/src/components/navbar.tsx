import React, { Component } from 'react';

interface Props {
  totalCounters: number;
}

// stateless functional component
const NavBar = (props: Props) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar
        <span className="badge badge-pill badge-secondary m-2">
          {props.totalCounters}
        </span>
      </a>
    </nav>
  );
};

export default NavBar;
