import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

admin.initializeApp();

exports.getUser = functions.https.onCall(async (data, context) => {
    try {
      // if you want to deny unauthorized user
      // - context.auth.token.xxx is customClaims. (if you use)
      if (!context?.auth?.uid) {
        return Promise.reject("unauthorized");
      }
  
      const user = await admin.auth().getUser(data.uid);
      return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      };
    } catch (error) {
      // If user does not exist
      if (error.code === "auth/user-not-found") {
        return {};
      }
      throw error;
    }
  });

  exports.getUsers = functions.https.onCall(async (data, context) => {
    try {
      // if you want to deny unauthorized user
      // - context.auth.token.xxx is customClaims. (if you use)
      if (!context?.auth?.uid) {
        return Promise.reject("unauthorized");
      }
  
      const listUsers = await admin.auth().listUsers();
      return listUsers.users.map(user => ({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      }));
    } catch (error) {
      // If user does not exist
      if (error.code === "auth/user-not-found") {
        return {};
      }
      throw error;
    }
  });