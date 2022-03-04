/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {
  StreamApp,
  StatusUpdateForm,
  FlatFeed,
  FollowButton,
  Activity,
  ActivityFooter,
  LikeButton,
  CommentField,
  CommentList,
  CommentItem,
  InfiniteScrollPaginator,
} from "react-activity-feed";
import { useSelector, useDispatch } from "react-redux";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
// import {
//   getFirestore,
//   doc,
//   updateDoc,
//   setDoc,
//   onSnapshot,
// } from "firebase/firestore";
import Ready from "./Ready";
import axios from "axios";
import Fanout from "./../assets/Fanout.jpeg";
import styled from "styled-components";

export default function FlatFeedExample({
  streamConfig,
  moveBack,
  moveForward,
  current,
}) {
  const profile = useSelector((s) => s.profile);
  const [followers, setFollowers] = useState([]);
  const [usersToFollow, setUsersToFollow] = useState([]);
  const [feedgroup, setFeedgroup] = useState("user");
  const dispatch = useDispatch();

  const db = getFirestore();

  const pushActivity = async () => {
    const querySnapshot = await getDocs(collection(db, "profiles"));

    const pushIt = async (otherProfile) => {
      const response = await axios.get(
        `${window.functions_url}/getUserFeed?id=${otherProfile.uid}`
      );
      const BetterUser = window.client.feed(
        "user",
        otherProfile.uid,
        response.data
      );
      const activity = {
        actor: "SU:6Zt6f2b9uAPhyWBYQcDVIAWbAYA3",
        verb: "post",
        object: "Welcome to your first activity",
      };
      await BetterUser.addActivity(activity);
    };
    querySnapshot.forEach((doc) => {
      const otherProfile = doc.data();
      console.log("otherProfile", otherProfile);
      pushIt(otherProfile);
    });
  };

  const makeFollowList = async () => {
    const querySnapshot = await getDocs(collection(db, "profiles"));
    const profiles = followers;
    const pushIt = async (otherProfile) => {
      const response = await axios.get(
        `${window.functions_url}/getTimelineFeed?id=${otherProfile.uid}`
      );
      const BetterUser = window.client.feed(
        "timeline",
        otherProfile.uid,
        response.data
      );
      profiles.push(BetterUser);
      setFollowers(profiles);
    };
    querySnapshot.forEach((doc) => {
      const otherProfile = doc.data();
      pushIt(otherProfile);
    });
  };

  const followThisGuy = async (uid, follo) => {
    console.log("uid", uid);
    if (follo) {
      console.log("window.mytimeline", window.mytimeline);
      await window.mytimeline.unfollow("timeline", uid);
    } else {
      await window.mytimeline.follow("timeline", uid);
    }
    const followers = await window.mytimeline.followers();
    const following = await window.mytimeline.following();
    dispatch({
      type: "profile/update",
      payload: {
        ...profile,
        followers: followers.results,
        following: following.results,
      },
    });
  };

  useEffect(() => {
    const q = query(collection(db, "profiles"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const _usersToFollow = [];
      querySnapshot.forEach((doc) => {
        _usersToFollow.push(doc.data());
      });
      setUsersToFollow(_usersToFollow);
    });
  }, []);

  useEffect(() => {
    if (current === 9 || current === 10) {
      setFeedgroup("timeline");
    } else if (current === 11) {
      setFeedgroup("notification");
    } else {
      setFeedgroup("user");
    }
  }, [current]);

  return profile.uid !== null ? (
    <div className="container">
      {profile?.roles.includes("admin") && (
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
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={(e) => pushActivity()}
                >
                  Push Activity User
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      {current >= 0 && <h1>Stream Feeds</h1>}

      <div className="row">
        <div className="col-12 col-lg-7">
          {current >= 1 && current < 3 && (
            <>
              {current >= 1 && <h3>Anonymous Login</h3>}
              {current >= 2 && (
                <h3>
                  <a
                    target="_blank"
                    href="https://getstream.github.io/react-activity-feed/components/flat-feed"
                    rel="noreferrer"
                  >
                    Stream UI Library
                  </a>
                </h3>
              )}
            </>
          )}

          {(current === 3 || current === 4) && (
            <>
              <h3>Feeds</h3>
              <p>
                A Feed is like a Stack (FILO) of activities. Activities can be
                pushed directly to a Feed. They can also be propagated from
                feeds that they follow (see: “Follow Relationships” and
                “Fan-out”). A single application may have multiple feeds. For
                example, you might have a user's feed (what they posted), their
                timeline feed (what the people they follow posted), and a
                notification feed (to alert them of engagement with activities
                they posted).
              </p>
              <p>
                Most activity feeds people think of are “flat” feeds. These are
                your classic “timeline” feeds. There are also aggregated feeds
                and notification feeds, but we will get to those a bit later.
              </p>
              <ul>
                <li>
                  <h6>User</h6>
                </li>

                <li>
                  <h6>Timeline</h6>
                </li>
                <li>
                  <h6>Timeline Aggregate</h6>
                </li>
                <li>
                  <h6>Notification</h6>
                </li>
              </ul>
              {current === 4 && (
                <>
                  <h4>Follow Relationships</h4>
                  <p>
                    Feeds can follow each other. When a feed follows another,
                    activities from the followed feed will appear in the
                    follower’s feed. This concept is called “fan out”. A
                    “follow” relationship is one-way. If Feed A follows Feed B,
                    then Feed B’s activities will appear in Feed A, but Feed A’s
                    activities will not appear in Feed B.
                  </p>
                  <h4>Fan-out</h4>
                  <p>
                    Fan-out refers to propagating activities from the feed they
                    were originally posted in to the feeds that follow it. Fan
                    out is only 1 layer deep, meaning a feed has to directly
                    follow another feed in order to have their activities fanned
                    out to them.
                  </p>
                  <Diagram src={Fanout} />
                </>
              )}
            </>
          )}
          {current === 5 && (
            <>
              <h3>Activities</h3>
              <p>
                Activities are the content that appear within a feed. Posts on
                Instagram, tweets on Twitter, workouts on Strava, or posts on
                Facebook are all examples of activities. In short, activities
                are the core building block of your feed.
              </p>
              <ul>
                <li>Actor: “Joe”</li>
                <li>Verb: “tweet”</li>
                <li>Object: tweet_id:1268</li>
              </ul>

              <code>
                <pre>
                  {` 
const activity = { 
  'actor': 'User:1',  
  'verb': 'run',  
  'object': 'Exercise:42', 
  'course': { 'name': 'Golden Gate park', 'distance': 10 }, 
  'participants': ['Thierry', 'Tommaso'], 
  'started_at': new Date(), 
  'foreign_id': 'run:1', 
  'location': { 'type': 'point', 'coordinates': [37.769722,-122.476944] } 
}; 
                `}
                </pre>
              </code>
              <h3>Post Types</h3>
              <ul>
                <li>Roadtrippers Post Type</li>
                <li>Campendium Post Type</li>
                <li>Pro Tip Post Type</li>
                <li>Q&A post type</li>
              </ul>
            </>
          )}

          {current === 6 && (
            <>
              <h3>Reactions</h3>
              <p>
                Reactions are how users engage with activities they did not
                create themselves. You can think of these as ways to interact
                with the activity without altering the content of the activity
                itself. Some common social media reactions are: likes, hearts,
                and retweets. Comments are also a form of reaction. Reactions
                are always tied to an activity. If an activity gets deleted, so
                do its reactions.
              </p>
              <code>
                <pre>
                  {`
// add a like reaction to the activity with id activityId 
client.reactions.add("like", activityId, {}); 
 
// adds a comment reaction to the activity with id activityId 
client.reactions.add("comment", activityId, {"text": "awesome post!"}); 
 
`}
                </pre>
              </code>
            </>
          )}

          {current === 7 && (
            <>
              <h3>I'm sold sign me up.</h3>
              <br />
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Sign Up
              </button>
            </>
          )}

          {current >= 8 && current <= 11 && (
            <>
              {current === 8 && (
                <>
                  <h3>User Feed</h3>
                  <p>
                    This is a flat feed mostly used to track an individual feed.
                    Mentions will show here as well.
                  </p>
                  <p>
                    If this was Twitter this would be the feed that is shown on
                    your profile page. It will only contain what you've posted
                    and what other users have posted that mentions you.
                  </p>

                  <h4>Ideas for this feed type</h4>
                  <ul>
                    <li>Posts pushed from other brands</li>
                    <li>Measure user engagement</li>
                    <li>Shared Components</li>
                  </ul>
                </>
              )}
              {(current === 9 || current === 10) && (
                <>
                  <h3>Aggregated Feed</h3>
                  <p>
                    You timeline feed will consist of the actors you follow.
                  </p>
                  <p>
                    If this was Twitter this would be your home page feed. If
                    will contain all activities generated by the actors you
                    follow.
                  </p>
                  {current === 10 && (
                    <ul className="list-group">
                      {usersToFollow.map((user, index) => {
                        const following = profile?.following?.find(
                          (e) => e.target_id === `timeline:${user.uid}`
                        );
                        console.log("profile?.following", profile?.following);

                        console.log("following", following);
                        return user.displayName ? (
                          <li className="list-group-item" key={index}>
                            {user.displayName}
                            <FollowButton
                              style={{ float: "right" }}
                              followed={following ? true : false}
                              onClick={() => followThisGuy(user.uid, following)}
                            />
                          </li>
                        ) : null;
                      })}
                    </ul>
                  )}
                </>
              )}
              {current === 11 && (
                <>
                  <h3>Notification Feed</h3>
                  <p>Things you've done or that you have been tagged in.</p>
                </>
              )}
              {current >= 12 && (
                <>
                  <h3>Notification Feed</h3>
                  <p>Things you've done or that you have been tagged in.</p>
                </>
              )}
            </>
          )}
        </div>

        <div className="col-12 col-lg-5">
          {feedgroup === "user" && <h3>Flat Feed</h3>}
          {feedgroup === "timeline" && <h3>Timeline Feed</h3>}
          {feedgroup === "timeline_aggregated" && (
            <h3>Aggregated Timeline Feed</h3>
          )}
          {feedgroup === "notification" && <h3>Notification Feed</h3>}
          <StreamApp
            apiKey={streamConfig.apiKey}
            appId={streamConfig.appId}
            token={profile.streamToken}
          >
            {profile.displayName && (
              <div className="row">
                <div className="col">
                  <StatusUpdateForm
                    feedGroup={feedgroup}
                    emojiI18n={{
                      search: "Type here to search...",
                      categories: { recent: "Recent Emojis" },
                    }}
                  />
                </div>
              </div>
            )}

            {current >= 0 && (
              <div className="row">
                <div className="col">
                  <FlatFeed
                    notify
                    feedGroup={feedgroup}
                    options={{
                      limit: 10,
                      withOwnChildren: true,
                      withRecentReactions: true,
                    }}
                    Paginator={InfiniteScrollPaginator}
                    Activity={({ activity, feedGroup, userId }) => (
                      <Activity
                        activity={activity}
                        feedGroup={feedGroup}
                        userId={userId}
                        Footer={() => (
                          <>
                            <ActivityFooter
                              activity={activity}
                              feedGroup={feedGroup}
                              userId={userId}
                            />
                            <CommentField activity={activity} />
                            <CommentList
                              activityId={activity.id}
                              CommentItem={({ comment }) => (
                                <div className="wrapper">
                                  <CommentItem comment={comment} />
                                  <LikeButton reaction={comment} />
                                </div>
                              )}
                            />
                          </>
                        )}
                      />
                    )}
                  />
                </div>
              </div>
            )}
          </StreamApp>
        </div>
      </div>
    </div>
  ) : null;
}

const Diagram = styled.img`
  width: 100%;
`;
