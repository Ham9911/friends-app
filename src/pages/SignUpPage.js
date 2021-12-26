import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import './pages.css'
import { UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword,setDoc,doc,db } from './FirebaseApp';
import Logo from './logoimage.png'
import Imagetext from './friends.png'

const SignUpPage = () => {
    let userDetails={};
    let email='';
    let password='';
    const onFinish = (values) => {
        console.log('Success:', values);
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            user.displayName = values.username
            setDoc(doc(db, "users", user.uid), {
            name: values.username,
            email: values.email,
            uid: user.uid,
            profileimage:''
        });
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      console.log('User Details',userDetails)
        }
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <div className='container'>
          <span><img style={{height:'45px'}} src={Logo}></img></span><span><img style={{height:'45px'}} src={Imagetext}></img></span>
        <h1 className='heading'>Signup Page</h1>
        <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button icon={<UserAddOutlined />} type="primary" htmlType="submit">
          Signup
        </Button > Already have an Account <Link to="/">Login Here</Link>
      </Form.Item>
    </Form>
    </div>
    )
}

export default SignUpPage
