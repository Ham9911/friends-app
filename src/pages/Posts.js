import {
  auth,
  addDoc,
  db,
  collection,
  storage,
  query,
  doc,
  getDocs,
  storageRef,
  onAuthStateChanged,
  setDoc,
  deleteDoc,
  where
} from "./FirebaseApp";
import React from "react";
import {
  Form,
  Form as AntForm,
  Upload,
  Input,
  InputNumber,
  Button,
} from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector,useDispatch} from 'react-redux'
import { setMyPosts } from "../store";
import { useEffect, useState } from "react";
import Logo from './logoimage.png'
import Imagetext from './friends.png'
const Posts = () => {
  const dispatch = useDispatch();
  let post = {
    uid: "",
    title: "",
    image: "",
    content: "",
    postedBy: "",
  };
  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 12,
    },
  };
  let localPost = JSON.parse(localStorage.getItem("post"));
  console.log(localPost);
  const currUser = localStorage.getItem("logginUser");
  const [form] = AntForm.useForm();
  const onFinish = (values) => {
    let user = localStorage.getItem("user");
    console.log(values);
    post.content = values.content;
    post.title = values.post;
    post.uid = currUser;
    setDoc(
      doc(db, "Posts", post.title),
      {
        createdby: user,
        content: post.content,
        title: post.title,
        uid: currUser,
      },
      { merge: true }
    );
    console.log("Data Set");
    console.log(post);
    // addPosts();
    //For Image Upload
    const file = values.upload[0].originFileObj;
    console.log(file);
    // Points to 'images/space.jpg'
    // Note that you can use variables to create child values
    const fileName = post.title;
    console.log(fileName);
    const imagesRef = ref(storageRef, "images");
    const spaceRef = ref(imagesRef, fileName);
    // File path is 'images/space.jpg'
    const path = spaceRef.fullPath;
    console.log(path);
    // File name is 'space.jpg'
    const name = spaceRef.name;
    console.log(name);
    // Points to 'images'
    const imagesRefAgain = spaceRef.parent;
    console.log(imagesRefAgain);
    const storageRefagain = ref(storage, `postimages/${fileName}`);
    // 'file' comes from the Blob or File API
    uploadBytes(storageRefagain, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      setImage();
      onReset();
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

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
  const setImage = () => {
    getDownloadURL(ref(storage, `postimages/${post.title}`)).then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
      // img.setAttribute('src', url);
      console.log(url);
      post.image = url;
      setDoc(
        doc(db, "Posts", post.title),
        {
          image: post.image,
        },
        { merge: true }
      );
      console.log("Pic Uploaded");
    });
  };

  //Adding Posts on FireStore

  const addPosts = () => {
    let postsRef = collection(db, "Posts");
    console.log(postsRef);
    addDoc(postsRef, post);
  };

  //For Post
const deletePost= async (postuid)=>{
  console.log(postuid)
  await deleteDoc(doc(db, "Posts", postuid));
  window.location.reload();

}
let fetchedpost;
  let arr3 = [];
  let newarr = [];
 const allpost=useSelector(state=> state.myposts);
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
    dispatch(setMyPosts(newarr));
  }, []);
  console.log(allpost);
  return (
    <div>
      <div className="top-bar " style={{ fontSize: "30px" }}>
      <span><img style={{height:'45px'}} src={Logo}></img></span><span><img style={{height:'45px'}} src={Imagetext}></img></span>
      </div>
      <div>
        <Form className="post-section-form"{...layout} name="nest-messages" onFinish={onFinish} form={form}>
        <span style={{margin:'0 0 20px 273px',fontSize:'38px'}}>Add Posts</span>
          <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="logo"
              listType="picture"
              accept="image/*"
              multiple={false}
              maxCount={1}
            >
              <Button style={{alignContent:'left'}}icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="post" label="Title">
          <Input />
          </Form.Item>
          <Form.Item name={["content"]} label="Content">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>{" "}
        </Form>
      </div>
      <div className="">

     <span style={{margin:'0 0 20px 273px',fontSize:'38px'}}>All Posts</span>
      
        {allpost.map((data) => {
          return (
            <div className="postDiv postAlign">
              <div className="postedBy">Created By: {data.createdby}</div>
              <div className="postTitle">Post Title: {data.title}</div>
              <div>
                <img src={data.image} style={{ width:'900px',height:'600px'}}></img>
              </div>
              <div className="postContent">{data.content}</div>
              <Button style={{marginTop:'10px'}} onClick={()=>{deletePost(data.title)}}>Delete Post</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Posts;
