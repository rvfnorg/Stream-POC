/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Current from "./../assets/Current.jpeg";
import SASS from "./../assets/SAAS Architecture.jpeg";
// import Current from "./../assets/Current.jpeg";
import styled from "styled-components";
import { useSelector } from "react-redux";

export default function SAAS({ moveBack, moveForward, current }) {
  const profile = useSelector((s) => s.profile);
  return (
    <div className="container">
      {profile.roles.includes("admin") && (
        <div className="row">
          <div className="col">
            <ul className="nav">
              <li className="nav-item">
                <a 
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  onClick={(e) => moveBack(e)}
                >
                  Back
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={moveForward}>
                  {current || 0}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={(e) => moveForward(e)}
                >
                  Forward
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col">
          <h1>SAAS Architecture</h1>
          <p>An architecture almost entirely using SAAS providers.</p>
        </div>
      </div>

      {current === 1 && (
        <div className="row">
          <div className="col">
            <h2>Pros</h2>
            <ul>
              <li>Less code to mantain</li>
              <li>Full local development enviornment</li>
              <li>Little need for DevOps</li>
              <li>
                Services provided are going to be more reliable and full
                featured than anything we could do on our own.
              </li>
              <li>
                Better admin tools and comunity support from services then
                enginering could provide
              </li>
              <li>
                Developers can spead more time write integration tests for
                service integrations.
              </li>
              <li>
                Developers will have more time to become experts in using these
                service. Think of all the features we could be utilizing from
                services like stream, elastic search, analytics machine Learning
                if developers had more time.
              </li>
            </ul>
          </div>
          <div className="col">
            <h2>Cons</h2>
            <ul>
              <li>
                We could get in a situation where we are stuck with a vendor that doesn't work out. We'll need to alway keep an exit strategy in mind.
              </li>
              <li>
              - There may be instances where we forced to conform to a services framework and won't be able to customize something.
              </li>
              <li>
                Cost (maybe?) Most services I'm thinking ou change based on
                usage. We might save money by doing this.
              </li>
            </ul>
          </div>
        </div>
      )}

      {current === 2 && (
        <div className="row">
          <div className="col">
            <CurrentStyled src={Current} />
          </div>
        </div>
      )}

      {current >= 3 && (
        <div className="row">
          <div className="col">
            <CurrentStyled src={SASS} />
          </div>
        </div>
      )}
    </div>
  );
}

const CurrentStyled = styled.img`
  width: 100%;
`;
