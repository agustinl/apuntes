import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import firebaseConfig from './config';

class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    // Register
    async register(username, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password);

        return await newUser.user.updateProfile({
            displayName : username
        })
    }

    // Sign In
    async login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    // Log Out
    async logOut() {
        await this.auth.signOut();
    }
}

const firebase = new Firebase();
export default firebase;