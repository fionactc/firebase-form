import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAIn7BWt33ikvwlXJS3fKWWkx17v4Iagig",
  authDomain: "meeopp-challenge.firebaseapp.com",
  databaseURL: "https://meeopp-challenge.firebaseio.com",
  projectId: "meeopp-challenge",
  storageBucket: "meeopp-challenge.appspot.com",
  messagingSenderId: "800692876395"
};

firebase.initializeApp(config);

export default firebase;
