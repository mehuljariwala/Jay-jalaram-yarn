import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyASJLnFO2M4b7LyBIdk-tL8RiK3jPCOYME",
  authDomain: "jalaramyarn.firebaseapp.com",
  databaseURL: "https://jalaramyarn.firebaseio.com",
  projectId: "jalaramyarn",
  storageBucket: "jalaramyarn.appspot.com",
  messagingSenderId: "514506668286",
  appId: "1:514506668286:web:a5d0d6f877add465c08daf",
  measurementId: "G-23VQYX1QE6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// firebase.database();

export const database = firebase.database();
export default firebaseConfig;
