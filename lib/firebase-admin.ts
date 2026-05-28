import * as admin from 'firebase-admin';

// Helper function to lazy-initialize and get Firebase Admin instance
function getFirebaseAdmin(): typeof admin {
  const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';
  if (isBuildPhase) {
    return admin;
  }

  if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
      // Return uninitialized instance; Proxy will throw a descriptive error if any method is called
      return admin;
    }

    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
      console.log("Firebase Admin successfully initialized dynamically.");
    } catch (error) {
      console.error("Firebase Admin dynamic initialization error:", error);
    }
  }

  return admin;
}

// Lazy-loaded Proxy for adminAuth
export const adminAuth = new Proxy({} as admin.auth.Auth, {
  get(target, prop) {
    const firebase = getFirebaseAdmin();
    if (!firebase.apps.length) {
      throw new Error(
        "Firebase Admin is not initialized. Please verify your environment variables: FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY. Make sure they are set correctly in your Cloud Run dashboard."
      );
    }
    const authInstance = firebase.auth();
    const value = Reflect.get(authInstance, prop);
    if (typeof value === 'function') {
      return value.bind(authInstance);
    }
    return value;
  }
});

// Lazy-loaded Proxy for adminDb
export const adminDb = new Proxy({} as admin.firestore.Firestore, {
  get(target, prop) {
    const firebase = getFirebaseAdmin();
    if (!firebase.apps.length) {
      throw new Error(
        "Firebase Admin is not initialized. Please verify your environment variables: FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY. Make sure they are set correctly in your Cloud Run dashboard."
      );
    }
    const firestoreInstance = firebase.firestore();
    const value = Reflect.get(firestoreInstance, prop);
    if (typeof value === 'function') {
      return value.bind(firestoreInstance);
    }
    return value;
  }
});

