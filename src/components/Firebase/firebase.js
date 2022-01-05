import firebaseConfig from "./config"
import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import {
  getFirestore,
  onSnapshot,
  collection,
  query,
  where,
  limit,
} from "firebase/firestore"
import { getFunctions, httpsCallable } from "firebase/functions"
import { getStorage } from "firebase/storage"

const app = initializeApp(firebaseConfig)

class Firebase {
  constructor() {
    if (!firebaseInstance) {
      this.auth = getAuth(app)
      this.db = getFirestore(app)
      this.functions = getFunctions(app)
      this.storage = getStorage(app)
    }
  }

  getUserProfile({ userId, handler }) {
    onSnapshot(
      query(
        collection(this.db, "publicProfiles"),
        where("userId", "==", userId),
        limit(1)
      ),
      docs => handler(docs)
    )
  }

  async register({ email, password, username }) {
    await createUserWithEmailAndPassword(this.auth, email, password)
    const createProfileCallable = httpsCallable(
      this.functions,
      "createPublicProfile"
    )
    return createProfileCallable({
      username,
    })
  }

  async login({ email, password }) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  async logout() {
    await signOut(this.auth)
  }
}

let firebaseInstance

function getFirebaseInstance() {
  if (!firebaseInstance) {
    firebaseInstance = new Firebase()
    return firebaseInstance
  } else if (firebaseInstance) {
    return firebaseInstance
  } else {
    return null
  }
}

export default getFirebaseInstance
