import React from "react";
import {auth,provider} from'./firebase';
import {Button} from '@material-ui/core'
import './login.css'
function login({setuser}){
    const signin=()=>{
        auth
        .signInWithPopup(provider)
        .then((result)=> {
            sessionStorage.setItem('user',JSON.stringify(result.user));
            setuser(result.user);
         })
        .catch((err)=>alert(err.message));
        
    };
    return (
        <div className="Login">
            <div className="login-container">
                <img src='https://img.freepik.com/free-psd/whatsapp-icon-isolated-3d-render-illustration_47987-9785.jpg'
                alt=''/>
                <div className="login-text">
                    <h1> sign in to whatsapp</h1>
                </div>
            </div>
            <Button type='submit' onClick={signin}>
                <p>sign in with google</p>
            </Button>
        </div>
    )
}
export default login;