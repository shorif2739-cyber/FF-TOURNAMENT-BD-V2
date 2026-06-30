// ======================================
// Firebase SDK Imports
// ======================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
GoogleAuthProvider,
signInWithPopup,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getDatabase,
ref,
set,
get,
update,
remove,
push,
onValue,
off
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
getStorage,
ref as storageRef,
uploadBytes,
getDownloadURL,
deleteObject
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


// ======================================
// Firebase Configuration
// ======================================

const firebaseConfig = {

apiKey: "AIzaSyB0ZMuC0bRFC9Jy5EMMKKNqWEOfeJ_8foQ",

authDomain: "ff-tournament-bd-90e09.firebaseapp.com",

databaseURL: "https://ff-tournament-bd-90e09-default-rtdb.firebaseio.com",

projectId: "ff-tournament-bd-90e09",

storageBucket: "ff-tournament-bd-90e09.firebasestorage.app",

messagingSenderId: "59679743631",

appId: "1:59679743631:web:7bd9f9368e0d136f975afa",

measurementId: "G-PZXVCG5DHT"

};


// ======================================
// Initialize Firebase
// ======================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const database = getDatabase(app);

const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();


// ======================================
// Export
// ======================================

export {

app,

auth,

database,

storage,

googleProvider,

signInWithPopup,

signOut,

onAuthStateChanged,

ref,

set,

get,

update,

remove,

push,

onValue,

off,

storageRef,

uploadBytes,

getDownloadURL,

deleteObject

};