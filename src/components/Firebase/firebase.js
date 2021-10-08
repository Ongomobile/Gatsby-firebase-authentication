import firebaseConfig from "./config";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

app.initializeApp(firebaseConfig);

class Firebase {
    constructor() {
        if (!firebaseInstance) {
            this.auth = app.auth();
            this.db = app.firestore();
            this.functions = app.functions();
            this.storage = app.storage();
        }
    }

    async login({ email, password }) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    async logout() {
        await this.auth.signOut();
    }
}

let firebaseInstance;

function getFirebaseInstance() {
    if (!firebaseInstance) {
        firebaseInstance = new Firebase();
        return firebaseInstance;
    } else if (firebaseInstance) {
        return firebaseInstance;
    } else {
        return null;
    }
}

export default getFirebaseInstance;
