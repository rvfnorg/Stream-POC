import React from "react";
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

export default function HomeFeed({ streamConfig, profile }) {
  return (
    <div className="container" border="1">
      <StreamApp
        apiKey={streamConfig.apiKey}
        appId={streamConfig.appId}
        token={profile.streamToken}
      >
        <div className="row">
          <div className="col">
            <StatusUpdateForm
              feedGroup="timeline"
              emojiI18n={{
                search: "Type here to search...",
                categories: { recent: "Recent Emojis" },
              }}
            />
          </div>
          <div className="col">
            <FlatFeed
              notify
              feedGroup="timeline"
              options={{
                limit: 6,
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
      </StreamApp>
    </div>
  );
}
