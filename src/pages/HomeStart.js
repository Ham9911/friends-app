import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import './pages.css'
const HomeStart = () => {
    let navigate = useNavigate();
    const onEditHandler=()=>{
        navigate('/form')
    }
    return (
        <div className='main'>
            <div className='top-bar'>
<h1>Friends App</h1>

            </div>
        <div>
             <Button onClick={onEditHandler}> Edit Profile </Button>
        </div>
        </div>
    )

    }
export default HomeStart
