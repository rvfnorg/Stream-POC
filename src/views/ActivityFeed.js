import React, { useEffect } from "react";
import stream from "getstream";
import {
  StreamApp,
  StatusUpdateForm,
  FlatFeed,
  NotificationDropdown,
  Activity,
  ActivityFooter,
  LikeButton,
  CommentField,
  CommentList,
  CommentItem,
  InfiniteScrollPaginator,
} from "react-activity-feed";

// import './app.css';

function ActivityFeed({ streamConfig, user, loggedIn }) {
  console.log("user", user);
  console.log("streamConfig", streamConfig);
  console.log("loggedIn", loggedIn);

  const addActivity = async () => {
    const client = await stream.connect(
      streamConfig.apiKey,
      user.streamToken,
      streamConfig.appId
    );
    const chris = client.feed("user", "chris");
    const test = await chris.addActivity({
      actor: "chris",
      verb: "add",
      object: "picture:10",
      foreign_id: "picture:10",
      message: "Beautiful bird!",
    });

    console.log("test", test);
  };

  //   useEffect(() => {
  //     if (loggedIn) {
  //       addActivity();
  //     }
  //   }, [loggedIn]);

  return (
    <>
      <StreamApp
        apiKey="dz5f4d5kzrue"
        appId="102254"
        token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiY29sZC10ZXJtLTEiLCJleHAiOjE2NDM4ODgxNDZ9.kooRohwwH5fLElCeAM9GB-VqWZrdmbOvaKDhy2BGFw4"
      >
        <NotificationDropdown notify />
      </StreamApp>
      <StreamApp
        apiKey="dz5f4d5kzrue"
        appId="102254"
        token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiY29sZC10ZXJtLTEiLCJleHAiOjE2NDM4ODgxNDZ9.kooRohwwH5fLElCeAM9GB-VqWZrdmbOvaKDhy2BGFw4"
      >
        <NotificationDropdown notify />
        <FlatFeed notify />
      </StreamApp>
      <StreamApp
        apiKey="dz5f4d5kzrue"
        appId="102254"
        token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiY29sZC10ZXJtLTEiLCJleHAiOjE2NDM4ODgxNDZ9.kooRohwwH5fLElCeAM9GB-VqWZrdmbOvaKDhy2BGFw4"
      >
        <NotificationDropdown notify />
        <FlatFeed
          notify
          Activity={(props) => (
            <Activity
              {...props}
              Footer={() => (
                <div style={{ padding: "8px 16px" }}>
                  <LikeButton {...props} />
                </div>
              )}
            />
          )}
        />
      </StreamApp>
      <StreamApp
        apiKey="dz5f4d5kzrue"
        appId="102254"
        token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiY29sZC10ZXJtLTEiLCJleHAiOjE2NDM4ODgxNDZ9.kooRohwwH5fLElCeAM9GB-VqWZrdmbOvaKDhy2BGFw4"
      >
        <NotificationDropdown notify />
        <FlatFeed
          options={{ reactions: { recent: true } }}
          notify
          Activity={(props) => (
            <Activity
              {...props}
              Footer={() => (
                <div style={{ padding: "8px 16px" }}>
                  <LikeButton {...props} />
                  <CommentField
                    activity={props.activity}
                    onAddReaction={props.onAddReaction}
                  />
                  <CommentList activityId={props.activity.id} />
                </div>
              )}
            />
          )}
        />
      </StreamApp>
      <StreamApp
        apiKey="dz5f4d5kzrue"
        appId="102254"
        token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiY29sZC10ZXJtLTEiLCJleHAiOjE2NDM4ODgxNDZ9.kooRohwwH5fLElCeAM9GB-VqWZrdmbOvaKDhy2BGFw4"
      >
        <NotificationDropdown notify />
        <StatusUpdateForm />
        <FlatFeed
          options={{ reactions: { recent: true } }}
          notify
          Activity={(props) => (
            <Activity
              {...props}
              Footer={() => (
                <div style={{ padding: "8px 16px" }}>
                  <LikeButton {...props} />
                  <CommentField
                    activity={props.activity}
                    onAddReaction={props.onAddReaction}
                  />
                  <CommentList activityId={props.activity.id} />
                </div>
              )}
            />
          )}
        />
      </StreamApp>
    </>
  );
}
export default ActivityFeed;
