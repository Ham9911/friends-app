import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, addDoc, collection, getDocs, query,where,updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

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
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
const storageRef = ref(storage);



export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    storage,
    storageRef,
   updateDoc,
   deleteDoc,

    db,
    doc,
    setDoc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    query,
    where
};