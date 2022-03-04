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
import moment from "moment";

export default function FlatFeedExample({ streamConfig, profile }) {
  return (
    <>
      <div className="container" border="1">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4">
              <StreamApp
                apiKey={streamConfig.apiKey}
                appId={streamConfig.appId}
                token={profile.streamToken}
              >
                <div className="row">
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Post
                    </button>
                    <FlatFeed
                      notify
                      feedGroup="timeline"
                      options={{
                        limit: 6,
                        withOwnChildren: true,
                        withRecentReactions: true,
                      }}
                      Paginator={InfiniteScrollPaginator}
                      Activity={({ activity, feedGroup, userId }) => {
                        console.log("activity", activity);
                        return (
                          <>
                            <div className="card">
                              <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                  {activity.actor.data.name}
                                </h6>
                                <p className="card-text">{activity.text}</p>
                                <p className="card-text">
                                  <small className="text-muted">
                                    {moment(activity.time).format(
                                      "MMMM Do YYYY, h:mm:ss a"
                                    )}
                                  </small>
                                </p>
                                <a href="#" className="card-link">
                                  Card link
                                </a>
                                <a href="#" className="card-link">
                                  Another link
                                </a>
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
                              </div>
                            </div>

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
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Post
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <StatusUpdateForm
                          feedGroup="timeline"
                          emojiI18n={{
                            search: "Type here to search...",
                            categories: { recent: "Recent Emojis" },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </StreamApp>
            </div>
            <div className="col-12 col-lg-8">
              <h3>Feeds</h3>
              <p>
                A Feed is like a Stack of activities. Activities can be pushed
                directly to a Feed. They can also be propagated from feeds that
                they follow.
              </p>

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
                <li>Verb: tweet_id:1268</li>
              </ul>

              <code>
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
              </code>

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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
