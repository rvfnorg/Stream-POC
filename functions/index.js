const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stream = require("getstream");

// Reed
const client = stream.connect(
  "mgr2xmt9af6r",
  "yjmwwdjkthzxg8tfhjp99zc6t2jwtds46es678c3vwcndga799z78qcbe7hmg7kb",
  "1163624"
);

admin.initializeApp(functions.config().firebase);

exports.createUser = functions.https.onRequest((request, response) => {
  const userToken = client.createUserToken(request.query.id);
  response.set("Access-Control-Allow-Origin", "*");
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send(userToken);
});

exports.getUserFeed = functions.https.onRequest((request, response) => {
  const userFeed = client.feed("user", request.query.id);
  response.set("Access-Control-Allow-Origin", "*");
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send(userFeed.token);
});

exports.getTimelineFeed = functions.https.onRequest((request, response) => {
  const userFeed = client.feed("timeline", request.query.id);
  response.set("Access-Control-Allow-Origin", "*");
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send(userFeed.token);
});
