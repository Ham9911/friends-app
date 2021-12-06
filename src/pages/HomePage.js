import { auth, signOut } from "./FirebaseApp";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  onAuthStateChanged,
  db,
} from "./FirebaseApp";
import {
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Radio, Form, Select, Space, Input, DatePicker } from "antd";

const HomePage = () => {

  let userInfo = {
    email:'',
    lastLoggedin:'',
    username:'',
    contactno:'',
    about:'',
    dob:'',
    gender:''
  };
  let valForm={};
  let username;
  let navigate = useNavigate();
  //Ant Design Form Items
  const { Option } = Select;
  function onChange(date, dateString) {
    console.log(date, dateString);
    // userInfo.dob = dateString;
  }
  const onGenderChange = (value) => {
  console.log(value);
  // userInfo.gender=value;
  }
  // const userNameHandler=(e)=>{
  // console.log(e.target.value);
  // username=e.target.value;
// userInfo.username=username; 
// }


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const email = user.email;
        const lastLoggedin = new Date();
        console.log(email, lastLoggedin);
        userInfo.email = email;
        userInfo.lastLoggedin = lastLoggedin;
  
        // ...
      } else {
        // User is signed out
        // ...
        console.log("no user has logged in");
      }
    });
  }, []);

 
 
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    userInfo.username=values.user
    console.log(userInfo.username)
    userInfo.contactno=values.contactno
    userInfo.about=values.about
    console.log(userInfo);
    addUserProfile();

  }; 
  //Adding User on FireStore
  const addUserProfile =  () => {
    let userProfileRef = collection(db, "userProfiles");
    console.log(userProfileRef);

     addDoc(userProfileRef, userInfo);
  
  };

//  const addValues=()=>{
//     console.log(userInfo);
   
//     addUserProfile();
//  }

  const addDatatoFireStore=()=>{

  }

  console.log(userInfo);
  //Ant Design Form Items
  function UserSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  }
  

  return (
    <div>
      <Button icon={<LogoutOutlined />} type="primary" onClick={UserSignOut}>
        LogOut
      </Button>
      <Form
        name="complex-form"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        {/* Image Upload */}
        {/* <Form.Item label="Upload Image">
    <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
  </Form.Item> */}
        {/* Image Upload */}

        <Form.Item label="Username">
          <Space>
            <Form.Item
              name="user"
              noStyle
         
              rules={[{ required: true, message: "Username is required" }]}
            >
              <Input  style={{ width: 160 }} placeholder="Please input" />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item label="Contact Number">
          <Space>
            <Form.Item
              name="contactno"
              type={Number}
              noStyle
              rules={[{ required: true, message: "Contact Number Required" }]}
            >
              <Input
                style={{ width: 160 }}
                placeholder="Please Enter Contact Number"
              />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item label="Date Of Birth">
          <Space>
            <DatePicker
              name="date-of-birth"
              label="date-of-birth"
              onChange={onChange}
            />
          </Space>
        </Form.Item>
        <Form.Item label="Select">
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
        <Form.Item label="About me">
          <Input.Group compact>
            <Form.Item
              name="about"
              noStyle
              rules={[{ required: true, message: "Enter about Yourself" }]}
            >
              <Input style={{ width: "50%" }} />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit" onClick={onFinish} >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HomePage;
