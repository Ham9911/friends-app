
import { collection, addDoc, onAuthStateChanged, db } from "./FirebaseApp";
import React from "react";
import { Form, Input, InputNumber, Button } from 'antd';
const Posts = () => {
  let post = {
    title: "Apartment Therapy",
    content:
      "Apartment Therapy is a blog focusing on interior design. It was launched by Maxwell Ryan in 2001. Ryan is an interior designer who turned to blogging (using the moniker “the apartment therapist”). The blog has reached 20 million followers and has expanded into a full-scale media company.",
  }
  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 12,
    },
  };
  /* eslint-disable no-template-curly-in-string */
  
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  const onFinish = (values) => {
    console.log(values);
    addPosts();
  }
  //Adding Posts on FireStore
 
  const addPosts = () => {
    let postsRef = collection(db, "Posts");
    console.log(postsRef);
    addDoc(postsRef, post);
  };


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
          Submit
        </Button>
      </Form.Item>  </Form>
      </div>
      <div>
          Old posts
      </div>
   </div>
   
   )
};
export default Posts;
