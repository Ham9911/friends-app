import React from "react";
import { auth, signOut } from "./FirebaseApp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button,Input, Space,Menu,Affix } from "antd";
import { useSelector,useDispatch} from 'react-redux'
import { setShow,setAllSearch,setLiveSearch,setMyUser,setAllPosts } from "../store";
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
} from "./FirebaseApp";
import "./pages.css";
import { setUser } from "./SignInPage";
import { AudioOutlined } from '@ant-design/icons';
import { Select } from 'antd';


const HomeStart = () => {
  let presentUser;
  let searchResult='';
  let fetchedData;
  let searchedData;
  let arr4=[];
  let newarr2=[];
  let newarr3=[];
  let arr5=[];
  const dispatch=useDispatch();
  const { Search } = Input;
const { Option } = Select;
  //Search Work
  const [users, setUsers] = useState([])
  const [current, setCurrent] = useState('home')
  const [searchKeys, setSearchKeys] = useState('zzz')
  //
//Search Work
let userArr = [];

    useEffect(async () => {
      let queryS = searchKeys;
  queryS = queryS.split(" ").join("").toLowerCase();
  console.log(queryS);
  const qr = query(
    collection(db, "users"),
    where("username", ">=", queryS),
    where("username", "<=", queryS+"\uf8ff")
  );
        const querySnapshot = await getDocs(qr);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data());
            userArr.push(doc.data())
        });
        setUsers(userArr)
    }, [searchKeys])

    function handleChange(value) {
        console.log(users[value]);
        navigate(`/${users[value].uid}`);
    }
    const childrens = users.map((elem, i) => {
        return <Option key={i} >{elem.username}</Option>
    })

    useEffect(() => {

    }, [])
    const SearchFunc = (val) => {
        if (val === '') {
            setSearchKeys('zzz')
        } else {
            setSearchKeys(val)

        }
    }



//Search Work End
//Search
let setSearch;

const showValue=useSelector(state=> state.status);
console.log(showValue);
// const LiveStoreSearch = async (value) => {
//   console.log(value);
//   let queryS = value;
//   queryS = queryS.split(" ").join("").toLowerCase();
//   console.log(queryS);
//   const qr = query(
//     collection(db, "users"),
//     where("username", ">=", queryS),
//     where("username", "<=", queryS+"\uf8ff")
//   );
//   const querySnapshot = await getDocs(qr);
//   setSearchedResult([]);
//   querySnapshot.forEach((doc) => {
//     setSearchedResult((val) => [...val, doc.data()]);
//   });

//   if (queryS.length === 0) {
//     setSearchedResult([]);
//   }
// }; 
// console.log(searchedResult);

// console.log(searchKeys)
// LiveStoreSearch(searchKeys)
// const onchangeHandler=(e)=>{
//   let value=e.target.value;
// // setSearchedValue(e.target.value);
// console.log(value)
// LiveStoreSearch(value);

// }
const onSearch = (myvalue) => {console.log(myvalue);
setSearch=localStorage.setItem('search',myvalue)
dispatch(setShow(true));
FireStoreSearch();
}
const onSearchHandler=(uid)=>{
  let clickedProfile=uid;
  console.log('clicked')
  navigate(`/${clickedProfile}`);
  }

//Live Searching

// const LiveStoreSearch= async (value) => {
//   let mySearchData = query(collection(db, "users"),where('username','>=',value));
//   console.log(mySearchData);
//   let sr = query(mySearchData);
//   searchedData = await getDocs(sr);
//   console.log(searchedData);
//   searchedData.forEach((doc) => {
//     arr5 = doc.data().username;
//     console.log(arr5)
    // newarr3.push(doc.data().username);
    // console.log(newarr3);
  // });
 
  // dispatch(setLiveSearch(newarr3));
  // function handleChange(value) {
  //   console.log(searchedResult[value]);
  //   navigate(`/users/${searchedResult[value].uid}`);
  // }



  // Searching from FireBase
const showSearchResults=useSelector(state=> state.search);
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
  dispatch(setAllSearch(newarr2));
}
console.log(showSearchResults);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // console.log(user);
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
  // let LoggedinUser=setUser();
  
  const onEditHandler = () => {
    navigate("/form");
  };
  const logoutHandler=()=>{
    navigate('/');
  }
  const addpostHandler=()=>{  navigate("/Posts");}
  const myUsers=useSelector(state=> state.user);
  let arr = [];
 console.log(presentUser)
  useEffect(async () => {
    presentUser=localStorage.getItem('logginUser')
const docRef = doc(db, "users", presentUser);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  arr=docSnap.data();
  dispatch(setMyUser(arr));
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
}, []);
  // console.log(myUsers);
 let arr6=[];
//fetched Posts
let fetchedpost;
let arr2 = [];
let newarr = [];
const allpost=useSelector(state=> state.posts);
useEffect(async () => {
  let postData = collection(db, "Posts");
  console.log(postData);
  let q = query(postData);

  fetchedpost = await getDocs(q);
  console.log(fetchedpost);
  fetchedpost.forEach((doc) => {
    arr6 = doc.data();
    newarr.push(arr6);
    console.log(newarr);
  });
  dispatch(setAllPosts(newarr));
}, []);
// console.log(allpost);
// //


  return (
    <div className="main">
      <div className="top-bar">
        <span><img style={{height:'45px'}} src={Logo}></img></span><span><img style={{height:'45px'}} src={Imagetext}></img></span>
                        <Select showSearch={true}
                            placeholder='Search Users'
                            showArrow={false}
                            className='searchSelect'
                            defaultActiveFirstOption={false}
                            onSearch={SearchFunc}
                            style={{ width: '250px' }}
                            onChange={handleChange}
                            optionFilterProp="children"
                            filterOption={(input, option) => {

                                return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            }
                        >
                            {childrens}
                        </Select>
        {/* <Search style={{float:"right"}} onSearch={onSearch} placeholder="input search text"  style={{ width: 200 }} /> */}
      </div>
      <div className='intro-section'>
      <img className='profileimage' src={myUsers.profileimage} style={{width:'200px', height:'200px'}}></img>
       <div className={`search-section ${showValue ? '':'none' }`}>
          <h2 className="sub-heading">Users</h2>
        {showSearchResults.map((mysearch,index)=>{
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
          <div className={`post-section ${showValue ? 'none':'' }`}>
      <div>
       
      </div>
      <div>
      {allpost.map((posts,index)=>{
        // console.log(posts);

       
              return(
              <div className={'postDiv'}style={{marginTop:'10px'}}> 
               <div className="postedBy">{posts.createdby}</div>
               <div className="postTitle">{posts.title}</div>
                <div ><img className="postImage" src={posts.image} style={{width:'570px',height:'450px'}}></img></div>
             <div  className="postContent"> {posts.content}</div>
             
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
        <span><Button style={{margin:'20px 0px 30px 30px'}} onClick={addpostHandler}>Add Post</Button></span>
          </div>
        </div>
      </div>

    </div>
  );
};
export default HomeStart;
