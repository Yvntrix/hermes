import firebase from "firebase/compat/app";

import "firebase/compat/firestore";

import "firebase/compat/auth";

const firebaseConfig = {

    apiKey: "AIzaSyDRCoYLr3Jwp7MbLwWdzAkvkn62QpuNAkw",

    authDomain: "chat-app-9fee8.firebaseapp.com",

    projectId: "chat-app-9fee8",

    storageBucket: "chat-app-9fee8.appspot.com",

    messagingSenderId: "655047559253",

    appId: "1:655047559253:web:02ebd7e561b12ea94d2cdc"

};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();



