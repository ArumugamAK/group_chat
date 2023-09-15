import React ,{useEffect, useState}from "react";
import './chat.css'
import {db} from './firebase'
import { Avatar} from "@material-ui/core";
import {Link} from "react-router-dom";
function Sidechat({name,id,photo,addNewChat}){
    const[messages,setmessage]=useState('');
    useEffect(()=>{
        if(id){
            db.collection('rooms')
            .doc(id)
            .collection('message')
            .orderBy('timestamp','desc')
            .onSnapshot(Snapshot=>
                setmessage(Snapshot.docs.map(
                    (doc)=>doc.data())))
        }
    },[id]);
    console.log(messages)
    const createchat=()=>{
        const roomname=prompt('Please enter the name');
        const  roomphoto=prompt("please enter the photo url")
    if(roomname && roomphoto){
        db.collection('rooms').add({
            name:roomname,
            roomPhoto:roomphoto,
        })
    }

    }
    return !addNewChat?(
        <Link to ={`/rooms/${id}`}>
        <div className="Sidechat">
            <Avatar src={photo}/>
          <div className="Sidechat-info">
            <h1>{name}</h1>
            <p>{messages[0]?.message}</p>
        </div>
        </div>
        </Link>
    ):
     (<div onClick={createchat} className="Sidechat">
        <h2>Add new Chat</h2>
    </div>
     )
}
export default Sidechat;