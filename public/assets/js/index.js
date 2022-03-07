

 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
  import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged  
  } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";


 const firebaseConfig = {
  apiKey: "AIzaSyBp06GHd3XDAQ06DYGeEweF0HYM21XNxI0",
  authDomain: "fir-ninja-48f50.firebaseapp.com",
  projectId: "fir-ninja-48f50",
  storageBucket: "fir-ninja-48f50.appspot.com",
  messagingSenderId: "387208579510",
  appId: "1:387208579510:web:6b06beaa4c433960fc1917",
  measurementId: "G-FQ5XCC3KDM"
};

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const auth = getAuth(app);
 const db = getFirestore(app);

 //Registro a la página

const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Mensaje de usuario Registrado
        swal("Usuario Registrado", "Inicia sessión para completar tu registro!", "success");
      signupForm.reset();

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // alert error
    swal("Oops!", errorMessage, "error");
    signupForm.reset();   
  });
});

// Iniciar sección a la página

const signinForm = document.querySelector('#login-form');

signinForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      const user = userCredential.user;
      signinForm.reset();
      getuser(auth);
      document.location.href="home.html";

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // alert error
    geterror(errorMessage);
    signinForm.reset();
  });
});


//Functions project
/**
 * Returns the error message.
 */
 function geterror(errorMessage) {
  swal("Oops!", errorMessage, "error");
}

 export function getuser(auth){
  const user = auth.currentUser;

  if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
    });
  }
}
