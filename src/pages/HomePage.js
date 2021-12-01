import {auth,signOut } from './FirebaseApp';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
const HomePage = () => {
    let navigate = useNavigate()
    function UserSignOut(){
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/')
          }).catch((error) => {
            // An error happened.
          });
    }
    return (
        <div>
            <Button icon={<LogoutOutlined/>} type="primary" onClick={UserSignOut}>LogOut</Button>
        </div>
    )
}

export default HomePage
