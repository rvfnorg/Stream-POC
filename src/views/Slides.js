import React from "react";

import CreateUser from "./../views/CreateUser";
import ActivityFeed from "./../views/ActivityFeed";

export default function Slides({ current, setUser, loggedIn }) {
  const apiKey = "sesb46h7zb6p";
  const appId = "66001";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmF0bWFuIn0.8aYd7O_fx-1YMx28DXG1n274o4pa3SjHnRM8AIHLqkE";

  switch (current) {
    case 1:
      return <div>one</div>;
    case 2:
      return <div>two</div>;
    case 3:
      return <CreateUser setUser={setUser} loggedIn={loggedIn} />;
    case 4:
    case 5:
    case 6:
    case 7:
      return <ActivityFeed setUser={setUser} loggedIn={loggedIn} />;

    default:
      return <div>out of bounds</div>;
  }
}
