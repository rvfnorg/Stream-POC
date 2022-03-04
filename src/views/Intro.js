/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Intro({ moveBack, moveForward, current }) {
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
          {current >= 0 && (
            <>
              <h1>Stream</h1>
              <p>Stream is a SASS service for provider for social networks</p>
            </>
          )}
          {current >= 1 && (
            <ul>
              <li>
                JSON Activity Stream 1.0 Spec, <br />
                Working group includes (Microsoft, Google, Facebook, Twitter,
                Pintrest)
              </li>
              <li>
                It provides data storage for all feed, activity, reaction and
                user data.
              </li>
              <li>React UI framework</li>
              <li>Full REST API</li>
              <li>Hashtag and @metion functionality</li>
              <li>Custom ranking</li>
              <li>Websockets updates</li>
              <li>Custom feed aggregation.</li>
              <li>Follower and feed recommendation engine.</li>
              <li>Stores and handles post images</li>
              <li>Open graph url provider</li>
            </ul>
          )}
        </div>
        <div className="col">
          {current >= 2 && (
            <>
              <h1>Firebase</h1>
              <p>
                Firebase is a backend SAAS servce for web and mobile developers
              </p>
            </>
          )}
          {current >= 3 && (
            <ul>
              <li>It has a full featured authentication system.</li>
              <li>Static hosting</li>
              <li>Cloud function</li>
              <li>Document database</li>
              <li>Cloud storage/CDN</li>
              <li>Support full local emulation enviornment</li>
              <li>Multi enviornment support</li>
              <li>Machine Learning API</li>
              <li>Prediction engine</li>
              <li>A/B testing</li>
              <li>
                Native app managment (Distribution, analytics, crashlitics ect)
              </li>
              <li>Remote config</li>
              <li>Deep linking</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
