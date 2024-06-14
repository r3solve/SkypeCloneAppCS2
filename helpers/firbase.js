import { initializeApp } from "firebase/app";
import { getDatabase, ref, set} from "firebase/database";
import { getFirestore, collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signOut,signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDG7Ito5r43hysEvCaw3PkcL5DlXUra-X8",
    authDomain: "skype-clone-72908.firebaseapp.com",
    projectId: "skype-clone-72908",
    storageBucket: "skype-clone-72908.appspot.com",
    messagingSenderId: "402903961441",
    appId: "1:402903961441:web:4667c507bd18a2721cbf20",
    measurementId: "G-2K9W504GLL"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

async function getUser(username){
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    }
}

export { getUser }