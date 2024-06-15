import { initializeApp } from "firebase/app";
import { getDatabase, ref, set} from "firebase/database";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signOut,signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { MessageContext } from "../store/messageStore";

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


async function pushChat(chatId, createdBy, receiver, link, chats) {
    const chatRef = doc(db, `chats/${chatId}`);    
    try {
        await setDoc(chatRef, {
            createdBy: createdBy,
            receiver: receiver,
            link: link,
            chats: chats
        });
        console.log(`Chat ${chatId} successfully added for user ${createdBy}`);
    } catch (error) {
        console.error("Error adding chat: ", error);
    }
}

function signUpUser(email, password){
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;
        setActiveUser(getUser(user))

      }).catch((err)=> {
          return
      })
    
}

async function pushUserInfo(info) {
    await setDoc(doc(db, "users", info.email), {
        username: info.username,
        email: info.email,
        phone: info.phoneNumber,
        bio: info.bio
      });
      
}

function logOutUser() {
    let ret = ''
    const auth = getAuth();
    signOut(auth).then(() => {
      ret = "User signed out successfully."
      
    }).catch((error) => {
      console.error("Error signing out: ", error);
      ret = err.code
    });
    return ret
  }

  function loginUser(email, password) {
    const auth = getAuth(); // Ensure auth is initialized within the function or passed in
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('logged in');
        return user; // Return the user for further use if needed
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error (${errorCode}): ${errorMessage}`);
        throw error; // Rethrow the error for further handling
      });
  }
export {signUpUser, pushChat, pushUserInfo, logOutUser, loginUser};


// import { useEffect, useState } from 'react';
// import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../firebase'; // Replace with your Firebase configuration import

// function useChats(createdBy) {
//     const [chats, setChats] = useState([]);

//     useEffect(() => {
//         const fetchChats = async () => {
//             try {
//                 // Create a reference to the chats subcollection for the specified createdBy user
//                 const chatsRef = collection(db, `chats/${createdBy}/chats`);

//                 // Query the chats subcollection
//                 const q = query(chatsRef);

//                 // Get the documents from Firestore
//                 const querySnapshot = await getDocs(q);

//                 // Extract the data from each document
//                 const fetchedChats = querySnapshot.docs.map(doc => ({
//                     id: doc.id,
//                     ...doc.data()
//                 }));

//                 setChats(fetchedChats);
//             } catch (error) {
//                 console.error('Error fetching chats:', error);
//             }
//         };

//         // Fetch chats when createdBy value changes or component mounts
//         if (createdBy) {
//             fetchChats();
//         }

//         // Clean up function to unsubscribe from Firestore listener
//         return () => {};
//     }, [createdBy]); // Re-run effect whenever createdBy changes

//     return chats;
// }

// export default useChats;

