
import { auth,collection, addDoc, onAuthStateChanged, db,query,getDocs } from "./FirebaseApp";
import React from "react";
import { Form, Input, InputNumber, Button } from 'antd';
import { useEffect,useState } from "react";
const Posts = () => {
  let post = {
    title:'',
    content:'',
    postedBy:'',
  }
  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 12,
    },
  };
  const onFinish = (values) => {
    console.log(values);
    post.content=values.content;
    post.title=values.post;
    console.log(post);
    addPosts();
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const email = user.email;
        console.log(email);
        post.postedBy = email;
  
        // ...
      } else {
        // User is signed out
        // ...
        console.log("no user has logged in");
      }
    });
  }, [onFinish]);

    
  
  
  //Adding Posts on FireStore
 
  const addPosts = () => {
    let postsRef = collection(db, "Posts");
    console.log(postsRef);
    addDoc(postsRef, post);
  };
 let fetchedpost;
 let arr=[];
 let newarr=[];
  const [allpost, setallPost] = useState([]);
  useEffect(async () => {
    let postData = collection(db, "Posts");
    console.log(postData);
    let q = query(postData);

    fetchedpost = await getDocs(q);
    console.log(fetchedpost);
    fetchedpost.forEach((doc) => {
      arr = doc.data();
        newarr.push(arr);
      console.log(newarr);
    });
    setallPost(newarr);
  }, []);
console.log(allpost);
  return(
   <div>
       <div className='top-bar ' style={{fontSize:'30px'}}>Posts</div>
       <div><Form {...layout} name="nest-messages" onFinish={onFinish}>
       <Form.Item name={['post']} label="Title" >
        <Input />
      </Form.Item>
      <Form.Item name={['content']} label="Content">
        <Input.TextArea />
      </Form.Item>
    
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Post
        </Button>
      </Form.Item>  </Form>
      </div>
      <div>
          All posts
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
   
   )
};
export default Posts;
