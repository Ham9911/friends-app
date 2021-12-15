import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
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

const SearchProfile = () => {
    const [searchedUser,setSearchedUser]=useState('');
    let param=useParams();
    console.log(param.username)
    let userArr=[]
    useEffect(async () => {
    const docRef = doc(db, "users", param.username);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      userArr=docSnap.data();
      setSearchedUser(userArr);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    }, []);
    //Showing Posts
    const [allpost, setallPost] = useState([]);
    let fetchedpost;
  let arr3 = [];
  let newarr = [];
  useEffect(async () => {
    let postData = query(collection(db, "Posts"),where('uid','==',param.username));
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
  console.log(allpost)
    return (
        <div>
            This is Param Page {param.username}
            <div className="top-bar">
        <h1>Friends App</h1>
      </div>
      <div className='intro-section'>
        <div id="intro">
          <div className='profileimage'>
            <img src={searchedUser.profileimage} style={{width:'200px', height:'200px'}}></img>
          </div>
          <div>
            <h2 className="sub-heading">Intro</h2>
          </div>
          <div>
            <div></div>
            <div className="boxes">UserName: {searchedUser.username}</div>
            <div className="boxes">Date of Birth: {searchedUser.dob}</div>
            <div className="boxes">Phone No: {searchedUser.contactno}</div>
            <div className="boxes">About: {searchedUser.about}</div>
          </div>
        </div>
      </div>
      <div className='post-section'>
      <div>
        <h2 className="sub-heading">My Posts</h2>
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
              </div>  
              )
          })}
      </div>
      </div>
        </div>
    )
}

export default SearchProfile
