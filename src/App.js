import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector } from "react-redux";

import {
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import "react-activity-feed/dist/index.css";
import Nav from "./components/Nav";

import Intro from "./views/Intro";
import SAAS from "./views/SAAS";
import CreateUser from "./views/CreateUser";
import LoginUser from "./views/Login";
import Ready from "./views/Ready";
import FeedExample from "./views/FeedExample";
import BootstrapExample from "./views/BootstrapExample";
import Wrapup from "./views/Wrapup";

const firebaseConfig = {
  apiKey: "AIzaSyBkFZgHZh7Iv9RnlDSZ1PXTgs8hoGmVVM0",
  authDomain: "streamio-eaff7.firebaseapp.com",
  projectId: "streamio-eaff7",
  storageBucket: "streamio-eaff7.appspot.com",
  messagingSenderId: "1516599617",
  appId: "1:1516599617:web:c17c6055bf98a37ccc89c0",
  measurementId: "G-THW4ZDS15E",
};

const streamConfig = {
  apiKey: "mgr2xmt9af6r",
  appId: "1163624",
};

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {
      roles: [],
      displayName: null,
      streamToken: null,
      uid: null,
    },
  },
  reducers: {
    update: (state, { type, payload }) => {
      state.profile = payload;
    },
  },
});

const store = configureStore({
  reducer: profileSlice.reducer,
});

const app = initializeApp(firebaseConfig);

function App() {
  const stream = require("getstream");
  const auth = getAuth();
  const db = getFirestore();
  const [loggedIn, setLoggedIn] = useState(false);
  const [slidesDoc, setSlidesDoc] = useState({});

  window.functions_url = "https://us-central1-streamio-eaff7.cloudfunctions.net";
  //window.functions_url = "http://localhost:5001/streamio-eaff7/us-central1";

  const moveBack = async (slide) => {
    await updateDoc(doc(db, "globals", "slides"), {
      [slide]: slidesDoc[slide] - 1,
    });
  };

  const moveForward = async (slide) => {
    await updateDoc(doc(db, "globals", "slides"), {
      [slide]: slidesDoc[slide] + 1,
    });
  };

  const toggleFeedGroup = async (feedgroup) => {
    await updateDoc(doc(db, "globals", "slides"), {
      feedgroup,
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        onSnapshot(doc(db, "globals", "slides"), (doc) => {
          const data = doc.data();
          setSlidesDoc(data);
        });

        onSnapshot(doc(db, "profiles", user.uid), async (doc) => {
          const data = doc.data();
          if (!data) logInAnonymously();
          if (!data.roles) data.roles = [];

          window.client = stream.connect(
            streamConfig.apiKey,
            data.streamToken,
            streamConfig.appId
          );

          const response = await axios.get(
            `${window.functions_url}/getTimelineFeed?id=${user.uid}`
          );
          const BetterUser = await window.client.feed(
            "timeline",
            user.uid,
            response.data
          );

          window.mytimeline = BetterUser;

          const followers = await BetterUser.followers();
          const following = await BetterUser.following();

          if (data.displayName) {
            await window.client.user(user.uid).update({
              name: data.displayName,
            });
          }

          store.dispatch({
            type: "profile/update",
            payload: {
              ...data,
              followers: followers.results,
              following: following.results,
            },
          });
          setLoggedIn(true);
        });
      } else {
        logInAnonymously();
      }
    });
  }, [db]);

  const logInAnonymously = () => {
    signInAnonymously(auth)
      .then(async (userCredential) => {
        try {
          const user = userCredential.user;
          const response = await axios.get(
            `${window.functions_url}/createUser?id=${user.uid}`
          );
          const profileDocs = {
            uid: user.uid,
            streamToken: response.data,
            roles: [],
          };
          await setDoc(doc(db, "profiles", user.uid), profileDocs);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };

  const logout = () => {
    auth.signOut();
  };

  const Slides = ({ current }) => {
    switch (current) {
      case 1:
        return <Ready />;
      case 2:
        return (
          <Intro
            moveBack={() => moveBack("intro")}
            moveForward={() => moveForward("intro")}
            current={slidesDoc["intro"]}
          />
        );
      case 3:
        return (
          <FeedExample
            moveBack={() => moveBack("feed")}
            moveForward={() => moveForward("feed")}
            current={slidesDoc["feed"]}
            streamConfig={streamConfig}
            toggleFeedGroup={toggleFeedGroup}
            feedgroup={"user"}
          />
        );
      case 4:
        return (
          <SAAS
            moveBack={() => moveBack("saas")}
            moveForward={() => moveForward("saas")}
            current={slidesDoc["saas"]}
          />
        );
      case 5:
        return (
          <Wrapup
            moveBack={() => moveBack("wrapup")}
            moveForward={() => moveForward("wrapup")}
            current={slidesDoc["wrapup"]}
          />
        );
      default:
        return <div>out of bounds</div>;
    }
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav
          moveBack={() => moveBack("current")}
          moveForward={() => moveForward("current")}
          streamConfig={streamConfig}
          currentSlide={slidesDoc.current}
          logout={logout}
        />
        {loggedIn && (
          <Routes>
            <Route path="/" element={<Slides current={slidesDoc.current} />} />
            <Route path="/ready" element={<Ready />} />
            <Route
              path="/intro"
              element={
                <Intro
                  moveBack={() => moveBack("intro")}
                  moveForward={() => moveForward("intro")}
                  current={slidesDoc["intro"]}
                />
              }
            />
            <Route
              path="/createuser"
              element={<CreateUser streamConfig={streamConfig} />}
            />
            <Route path="/login" element={<LoginUser />} />
            <Route
              path="/bootstrapexample"
              element={<BootstrapExample streamConfig={streamConfig} />}
            />
            <Route
              path="/feedexample"
              element={<FeedExample streamConfig={streamConfig} />}
            />
          </Routes>
        )}
        <CreateUser streamConfig={streamConfig} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
