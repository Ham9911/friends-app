import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, addDoc, collection, getDocs, query,where } from "firebase/firestore";


const firebaseApp = initializeApp({
    apiKey: "AIzaSyDvVYViIxakEjH7PdEd3RJvrkGG22E4U5A",
  authDomain: "friends-app-5751e.firebaseapp.com",
  projectId: "friends-app-5751e",
  storageBucket: "friends-app-5751e.appspot.com",
  messagingSenderId: "138260231048",
  appId: "1:138260231048:web:b61bd4506e4f6cb0d5003d"
});

const auth = getAuth();
const db = getFirestore(firebaseApp);

const setData = (user) => {
  db.collection('userProfiles').doc(user.email).get().then((querySnapshot) => {
      const data = querySnapshot.data();
      return data;
  });
}

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,

    db,
    doc,
    setDoc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    query,
    where,
    setData
};