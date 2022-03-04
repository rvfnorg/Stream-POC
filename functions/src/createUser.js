const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.createUser = functions.https.onCall(async (uid, response) => {
  const foo = "bar";
  return {
    uid,
    foo,
  };
  //   const { email, password, displayName, phoneNumber } = user;
  //   try {
  //     const userRecord = await admin.auth().createUser({
  //       email,
  //       password: password,
  //     });

  //     const profileData = {
  //       displayName: displayName ? displayName : email,
  //       email,
  //       lastModified: admin.firestore.FieldValue.serverTimestamp(),
  //       createdDate: admin.firestore.FieldValue.serverTimestamp(),
  //     };

  //     if (phoneNumber) {
  //       profileData.phoneNumber = phoneNumber;
  //     }

  //     const profile = await admin
  //       .firestore()
  //       .collection("profiles")
  //       .doc(userRecord.uid)
  //       .set(profileData);

  //     return {
  //       profile,
  //       userRecord,
  //     };
  //   } catch (error) {
  //     return error;
  //   }
});
