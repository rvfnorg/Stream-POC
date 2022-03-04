/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Code from "./../assets/Blank diagram.jpeg";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

export default function Wrapup({ moveBack, moveForward, current }) {
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

      {current === 0 && (
        <>
          <div className="row">
            <div className="col">
              <h1>Cool Examples in the wild.</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <ul>
                <li>
                  <h3>Live Event Streaming</h3>
                  <p>
                    <a href="https://getstream.io/chat/demos/livestream/">
                      https://getstream.io/chat/demos/livestream/
                    </a>
                  </p>
                </li>
                <li>
                  <h3>Everyone social</h3>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="row">
            <div className="col">
              <h1>Data Distribution</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <CurrentStyled src={Code} />
            </div>
          </div> */}
        </>
      )}
      {current === 1 && (
        <>
          <div className="row">
            <div className="col">
              <h1>Skies is the limit</h1>
              <h2>What we get right away</h2>
              <ul>
                <li>Personalized Feed</li>
                <li>AI driven feed experance</li>
                <li>Follow</li>
                <li>Role based persmissions</li>
                <li>Feed filtering</li>
                <li>Follower suggestion engine</li>
                <li>Privacy controls</li>
                <li>Media upload and management</li>
                <li>Anonymous Authentication</li>
                <li>Upgraded notifcations</li>
                <li>AI driven notifcations / Daliy Digest</li>
                <li>Truth engine / Auto curation</li>
              </ul>
              <h2>Later on</h2>
              <ul>
                <li>Live streaming event</li>
                <li>E-com personalization</li>
                <li>User data deletion</li>
              </ul>
            </div>
          </div>
        </>
      )}

      {(current === 2 || current === 3) && (
        <div className="row">
          <div className="col">
            {current >= 0 && (
              <>
                <h1>But how....</h1>
                <p>What would it take to move to architecture</p>
              </>
            )}
            {current >= 3 && (
              <ul>
                <li>
                  Brand new React site
                  <ol>
                    <li>
                      Built on a main UI framework. Bootstrap, Semantic,
                      Material Design
                    </li>
                    <li>Using the Stream UI Framework base components</li>
                    <li>Newletter subscription integration</li>
                    <li>Ad Manager can be built using Google Ad Manager</li>
                    <li>New Admin</li>
                  </ol>
                </li>
                <li>
                  Migrate MySql to Stream and Firebase
                  <ol>
                    <li>
                      Both Firebase and Stream have API's for bulk uploads
                    </li>
                    <li>
                      Migration scripts can be written to run daily to keep the
                      new database up to date with production.
                    </li>
                  </ol>
                </li>
                <li>Image CDN migration</li>
              </ul>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
}

const CurrentStyled = styled.img`
  width: 100%;
`;
