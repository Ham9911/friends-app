import React from "react";
import { auth, signOut } from "./FirebaseApp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "antd";
import {
  collection,
  query,
  where,
  getDocs,
  onAuthStateChanged,
  db,
  setData,
} from "./FirebaseApp";
import "./pages.css";
const HomeStart = () => {
  let currUser;
  let navigate = useNavigate();
  const onEditHandler = () => {
    navigate("/form");
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log("isLoggedin", user.email);

      currUser = user.email;

      // ...
    } else {
      // User is signed out
      // ...
      console.log("no user has logged in");
    }
  });
  let user;
  let arr;
  const [myUsers, setMyUsers] = useState([]);
  useEffect(async () => {
    let userData = collection(db, "userProfiles");
    console.log(userData);
    let q = query(userData, where("email", "==", "hammad@123.com"));

    user = await getDocs(q);
    console.log(user);
    user.forEach((doc) => {
      arr = doc.data();

      // arr.push(doc.data());
      // console.log(arr);
    });
    setMyUsers(arr);
  }, []);
  console.log(myUsers);
  return (
    <div className="main">
      <div className="top-bar">
        <h1>Friends App</h1>
      </div>
      <div>
        <Button id="edit-Profile" onClick={onEditHandler}>
          Edit Profile
        </Button>
      </div>
      <div id="intro">
        <div><h2 className='sub-heading'
        >Intro</h2></div>
        <div>
          <div className='boxes'>Email: {myUsers.email}</div>
          <div className='boxes'>Date of Birth: {myUsers.dob}</div>
          <div className='boxes'>Phone No: {myUsers.contactno}</div>
          <div className='boxes'>About: {myUsers.about}</div>
        </div>
      </div>
    </div>
  );
};
export default HomeStart;
