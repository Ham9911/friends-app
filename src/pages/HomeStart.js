import React from "react";
import { auth, signOut } from "./FirebaseApp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button,Input, Space } from "antd";
import { getDownloadURL,ref, uploadBytes } from "firebase/storage"
import Logo from './logoimage.png'
import Imagetext from './friends.png'
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  onAuthStateChanged,
  db,
  doc,
 deleteDoc
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
const [show,setShow]=useState(false)
const { Search } = Input;
const onSearch = (myvalue) => {console.log(myvalue);
setSearch=localStorage.setItem('search',myvalue)
setShow(true);
FireStoreSearch();
}
const onSearchHandler=(uid)=>{
  let clickedProfile=uid;
  console.log('clicked')
  navigate(`/${clickedProfile}`);
  }
//Searching from FireBase
const [allSearch,setAllSearch]=useState([]);
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
const deletePost= async (postuid)=>{
  console.log(postuid)
  await deleteDoc(doc(db, "Posts", postuid));
  window.location.reload();

}
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
        <span><img style={{height:'45px'}} src={Logo}></img></span><span><img style={{height:'45px'}} src={Imagetext}></img></span>
        <Search style={{float:"right"}} placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
      </div>
      <div className='intro-section'>
      <img className='profileimage' src={myUsers.profileimage} style={{width:'200px', height:'200px'}}></img>
       <div className={`search-section ${show ? '':'none' }`}>
          <h2 className="sub-heading">Users</h2>
        {allSearch.map((mysearch,index)=>{
          console.log(mysearch);
                return(
                <div id="searchResult"> 
                  <div style={{maxWidth:'auto'}}><img src={mysearch.profileimage} style={{width:'200px',height:'150px'}}></img></div>
                  <div className="boxes">User Name: {mysearch.username} </div>
                <div className="boxes">About: {mysearch.about}</div>
                <div id='username' className="boxes">Uid: {mysearch.uid}</div>
              <Button type='submit' onClick={()=>{onSearchHandler(mysearch.uid)}} style={{marginTop:'10px'}}>View Profile</Button>
                </div>  
                )
            })}
            </div>
          <div className={`post-section ${show ? 'none':'' }`}>
      <div>
        <span><Button style={{marginBottom:'4px'}} onClick={addpostHandler}>Add Post</Button></span>
      </div>
      <div>
      {allpost.map((posts,index)=>{
        console.log(posts);
       
              return(
              <div style={{marginTop:'10px'}}> 
                <div ><img src={posts.image} style={{width:'200px',height:'150px'}}></img></div>
                <div className="boxes">Post Title: {posts.title}</div>
              <div className="boxes">Created By: {posts.createdby}</div>
             <div  className="boxes"> Post content:{posts.content}</div>
              <Button style={{marginTop:'10px'}} onClick={()=>{deletePost(posts.title)}}>Delete Post</Button>
              </div>  
              )
          })}
      </div>
      </div>

     
        <div id="intro">   
          <div>
            <div className="user-name">{myUsers.username}</div>
            <div ><img style={{paddingLeft:'20px',paddingBottom:'10px'}}src="https://img.icons8.com/fluency/48/000000/age.png"/> {myUsers.dob}</div>
            <div ><img style={{paddingLeft:'20px',paddingBottom:'10px'}} src="https://img.icons8.com/fluency/48/000000/phone-disconnected.png"/> {myUsers.contactno}</div>
            <div><img  style={{paddingLeft:'20px',paddingBottom:'10px'}} src="https://img.icons8.com/fluency/48/000000/about.png"/> {myUsers.about}</div>
            <Button style={{margin:'20px 0px 30px 20px'}} onClick={onEditHandler}>
          Edit Profile
        </Button>
        <Button style={{margin:'20px 0px 30px 30px'}} onClick={logoutHandler}>
        Logout
        </Button>
          </div>
        </div>
      </div>

    </div>
  );
};
export default HomeStart;
