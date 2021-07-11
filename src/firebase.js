import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyApU7MhvXITIkQ2TVbS7Vw53LvcqooMY1A",
    authDomain: "chat-app-4e15c.firebaseapp.com",
    projectId: "chat-app-4e15c",
    storageBucket: "chat-app-4e15c.appspot.com",
    messagingSenderId: "507825951424",
    appId: "1:507825951424:web:1d364f0da6028b8a939325",
    measurementId: "G-351TTEQP9V"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore(); 
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;