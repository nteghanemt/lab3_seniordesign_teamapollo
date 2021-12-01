import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAmB49rH_o5vyHBxD1PfO5mPZyTfWLK02g",
    authDomain: "lab3-doodle-poll.firebaseapp.com",
    databaseURL: "https://lab3-doodle-poll-default-rtdb.firebaseio.com",
    projectId: "lab3-doodle-poll",
    storageBucket: "lab3-doodle-poll.appspot.com",
    messagingSenderId: "995194594942",
    appId: "1:995194594942:web:ec3df3e330476bfcba5a2f",
    measurementId: "G-2V3VNZ4KDH"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export default database;
