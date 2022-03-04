import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/Roadpass R Icon Black.svg";
import styled from "styled-components";

export default function Ready() {
  return (
    <div className="d-flex justify-content-md-center align-items-center vh-100">
      <div>
        <Logo src={logo} alt="logo" className="d-inline-block align-text-top" />
      </div>
    </div>
  );
}

const Logo = styled.img`
  height: 200px;
`;
