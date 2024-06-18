import { initializeApp } from "firebase/app";
import { getDatabase, ref, set} from "firebase/database";
import { getFirestore, collection,  doc, getDoc, getDocs, query, where, or, updateDoc, orderBy } from "firebase/firestore";
import { getAuth} from "firebase/auth";


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

function getProcesssedUsers() {
  let all_users = []
  getAllUserChats().then((docs)=>{
    all_users.push(docs)
  }).catch((err)=>{
    console.log(err)
  })
  console.log(all_users)
}
async function getAllUsers() {
  let all_users = [];
  
  try {
    const querySnapshot = await getDocs(collection(db, "users")); // Assuming you meant "users" collection
    querySnapshot.forEach((doc) => {
      all_users.push(doc.data()); // Add each document's data to the array
    });
    return all_users;
  } catch (error) {
    console.error("Error getting users: ", error);
    return []; // Return an empty array in case of error
  }
}

async function getAllUserChats(email) {
  try {
    const querySnapshot = await getDocs(collection(db, "chats"));
    const allChats = [];
    
    querySnapshot.forEach((doc) => {
      allChats.push(doc.data());
    });

    return allChats;
  } catch (error) {
    console.error("Error getting user chats: ", error);
    return []; // Return an empty array in case of error
  }
}

async function getAllUserChats1(email) {
  try {
    // Query for chats where the receiver is the email
    const q1 = query(collection(db, "chats"), where("receiver", "==", email));
    const q1Snapshot = await getDocs(q1);
    const allChatsReceiver = [];

    q1Snapshot.forEach((doc) => {
      allChatsReceiver.push({id:doc.id, ...doc.data()});
    });

    // Query for chats where the createdBy is the email
    const q2 = query(collection(db, "chats"), where("createdBy", "==", email));
    const q2Snapshot = await getDocs(q2);
    const allChatsCreatedBy = [];

    q2Snapshot.forEach((doc) => {
      allChatsCreatedBy.push({id:doc.id, ...doc.data()});
    });

    // Merge the two arrays and remove duplicates (if any)
    const allChats = [...allChatsReceiver, ...allChatsCreatedBy];
    const uniqueChats = Array.from(new Set(allChats.map(chat => chat.id))).map(id => {
      return allChats.find(chat => chat.id === id);
    });

    return uniqueChats;
  } catch (error) {
    console.error("Error getting user chats: ", error);
    return [];
  }
}

async function getCreatorsOrReceivers(email) {
  const chatsRef = collection(db, "chats");
  
  // Combine the conditions and add orderBy to sort by createdAt
  const q = query(
    chatsRef,
    where('createdBy', '==', email), // Firebase doesn't support 'or' directly
    orderBy('createdAt')
  );

  try {
    const querySnapshot = await getDocs(q);
    const allChats = [];

    querySnapshot.forEach((doc) => {
      allChats.push({ id: doc.id, ...doc.data() });
    });

    return allChats;
  } catch (error) {
    console.error("Error getting user chats: ", error);
    return []; // Return an empty array in case of error
  }
}
async function updateMessages(id, chats) {
  const q = query(collection(db, "chats"), where("link", "==", id));
  
  try {
    const querySnapshot = await getDocs(q);
    
    // Iterate over each document in the query snapshot
      const documentRef = doc(db, "chats", id);
      // Update the document with new chats
      await updateDoc(documentRef, {
        chats: chats
      });
  } catch (err) {
    console.error("Error updating message", err);
  }
}

async function fetchChats(id) {
  const q = query(collection(db, "chats"), where("id", "==", id));
  
  try {
    const querySnapshot = await getDocs(q);
    const allChats = [];

    // Iterate over each document in the query snapshot
    querySnapshot.forEach((doc) => {
      allChats.push({...doc.data() });
    });

    return allChats[0]; // Return the fetched documents
  } catch (err) {
    console.error("Error fetching chats", err);
    return []; // Return an empty array in case of error
  }
}

export {db, fetchChats, getUser, updateMessages, getAllUserChats, getAllUsers, getProcesssedUsers, getAllUserChats1, getCreatorsOrReceivers }