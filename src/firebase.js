import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Web app's Firebase configuration
var config = {
    apiKey: "AIzaSyAR2b3-TpxD1AHBt9qkkDbuVeo9Csx6UuM",
    authDomain: "livetrip-5ed19.firebaseapp.com",
    databaseURL: "https://livetrip-5ed19.firebaseio.com",
    projectId: "livetrip-5ed19",
    storageBucket: "livetrip-5ed19.appspot.com",
    messagingSenderId: "229633687430",
    appId: "1:229633687430:web:b5cd8acb74156225cfb607",
    measurementId: "G-LVEYCL8WYH"
};

// Initialize Firebase
firebase.initializeApp(config);

var db = firebase.firestore();

export default db;