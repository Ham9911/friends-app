import React from "react";
import { auth, signOut } from "./FirebaseApp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button,Input, Space } from "antd";
import { getDownloadURL,ref, uploadBytes } from "firebase/storage"
import { } from './FirebaseApp'
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  onAuthStateChanged,
  db,
  doc,
} from "./FirebaseApp";
import "./pages.css";
import { setUser } from "./SignInPage";
import { AudioOutlined } from '@ant-design/icons';
const HomeStart = () => {
  let presentUser;
  let searchResult='';
  let fetchedData;
  let arr4=[];
  let newarr2=[];
//Search
let setSearch;
const { Search } = Input;
const onSearch = (myvalue) => {console.log(myvalue);
setSearch=localStorage.setItem('search',myvalue)
FireStoreSearch();
}
//Searching from FireBase
const [allSearch,setAllSearch]=useState('');

const FireStoreSearch= async () => {
  let needSearch=localStorage.getItem('search');
  let searchData = query(collection(db, "users"),where('username','==',needSearch));
  console.log(searchData);
  let s = query(searchData);
  fetchedData = await getDocs(s);
  console.log(fetchedData);
  fetchedData.forEach((doc) => {
    arr4 = doc.data();
    newarr2.push(arr4);
    console.log(newarr2);
  });
  setAllSearch(newarr2);
}
console.log(allSearch);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log(user);
      // console.log(email, lastLoggedin);
localStorage.setItem('logginUser',user.uid)
localStorage.setItem('user',user.email);
presentUser=user.email;
      // ...
    } else {
      // User is signed out
      // ...
      console.log("no user has logged in");
    }
  });

  let currUser=localStorage.getItem('logginUser')
  let navigate = useNavigate();
  let LoggedinUser=setUser();
  
  const onEditHandler = () => {
    navigate("/form");
  };
  const logoutHandler=()=>{
    navigate('/');
  }
  const addpostHandler=()=>{  navigate("/Posts");}
  const [myUsers, setMyUsers] = useState([]);
  const [allpost, setallPost] = useState([]);
  
  let arr = [];
 console.log(presentUser)
  useEffect(async () => {
    presentUser=localStorage.getItem('logginUser')
const docRef = doc(db, "users", presentUser);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  arr=docSnap.data();
  setMyUsers(arr);
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
}, []);
  console.log(myUsers);
 let arr2=[];
//For Post
let fetchedpost;
  let arr3 = [];
  let newarr = [];
  useEffect(async () => {
    let postData = query(collection(db, "Posts"),where('uid','==',currUser));
    console.log(postData);
    let q = query(postData);

    fetchedpost = await getDocs(q);
    console.log(fetchedpost);
    fetchedpost.forEach((doc) => {
      arr3 = doc.data();
      newarr.push(arr3);
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
        <Button id="signout" onClick={logoutHandler}>
        Logout
        </Button>
      </div>
      <div className='intro-section'>
        <div id="intro">
          <div>
            <img ></img>
            <img src={myUsers.profileimage} style={{width:'200px', height:'200px'}}></img>
          </div>
          <div>
            <h2 className="sub-heading">Intro</h2>
          </div>
          <div>
            <div></div>
            <div className="boxes">UserName: {myUsers.username}</div>
            <div className="boxes">Date of Birth: {myUsers.dob}</div>
            <div className="boxes">Phone No: {myUsers.contactno}</div>
            <div className="boxes">About: {myUsers.about}</div>
          </div>
        </div>
      </div>
      <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
      <span><Button style={{marginBottom:'4px'}} onClick={addpostHandler}>Add Post</Button></span>
      
<div className='post-section'>
      <div>
        <h2 className="sub-heading">My Posts</h2>
      </div>
      <div>
      {allpost.map((posts,index)=>{
        console.log(posts);
       
              return(
              <div> 
                <div className="boxes"><img src={posts.image} style={{width:'200px',height:'150px'}}></img></div>
                <div className="boxes">Post Title: {posts.title}</div>
              <div className="boxes">Created By: {posts.createdby}</div>
             <div  className="boxes"> Post content:{posts.content}</div>
              </div>  
              )
          })}
      </div>
      </div>
    </div>
  );
};
export default HomeStart;
