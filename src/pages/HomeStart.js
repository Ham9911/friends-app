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
import { setUser } from "./SignInPage";
const HomeStart = () => {
  let navigate = useNavigate();
  let LoggedinUser=setUser();
  localStorage.setItem('user',JSON.stringify(setUser()));
  let data=JSON.parse(localStorage.getItem('user'));
  console.log(data);
  console.log(LoggedinUser);
  const onEditHandler = () => {
    navigate("/form");
  };
  const [myUsers, setMyUsers] = useState([]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log("isLoggedin", user.email)

      // ...
    } else {
      // User is signed out
      // ...
      console.log("no user has logged in");
    }
  });

  let arr = [];
  let user = [];
 
  useEffect( async() => {
    let userData = collection(db, "userProfiles");
    console.log(userData);
    let currUser=LoggedinUser
    console.log(currUser)
    let q = query(userData, where("email", "==",data));
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
  let fetchedpost;
 let arr2=[];
 let newarr=[];
  const [allpost, setallPost] = useState([]);
  useEffect(async () => {
    let postData = collection(db, "Posts");
    console.log(postData);
    let q = query(postData,where("postedBy", "==",data));
    fetchedpost = await getDocs(q);
    console.log(fetchedpost);
    fetchedpost.forEach((doc) => {
      arr2 = doc.data();
        newarr.push(arr2);
      console.log(newarr);
    });
    setallPost(newarr);
  }, []);
console.log(allpost);

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
      <div className='intro-section'>
        <div id="intro">
          <div>
            <img src="./images.jpg" alt="Image is Here"></img>
          </div>
          <div>
            <h2 className="sub-heading">Intro</h2>
          </div>
          <div>
            <div>{}</div>
            <div className="boxes">Email: {myUsers.email}</div>
            <div className="boxes">Date of Birth: {myUsers.dob}</div>
            <div className="boxes">Phone No: {myUsers.contactno}</div>
            <div className="boxes">About: {myUsers.about}</div>
          </div>
        </div>
      </div>
<div className='post-section'>
      <div>
        <h2 className="sub-heading">My Posts</h2>
      </div>
      <div>
      {allpost.map((data)=>{
              return(
              <div> <div>Post Title: {data.title}</div>
              <div>Created By: {data.postedBy}</div>
             <div> Post content:{data.content}</div>
              
              </div>
              
              )
          })}
      </div>
      </div>
    </div>
  );
};
export default HomeStart;
