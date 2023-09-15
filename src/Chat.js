import { Avatar,IconButton} from "@material-ui/core";
import './message.css'
// import firebase from "firebase/compat";
// import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import React,{useState,useEffect}from "react";
import SearchOutlined  from "@material-ui/icons/SearchOutlined";
import  AttachFile  from "@material-ui/icons/AttachFile";
import  MoreVert  from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon  from "@material-ui/icons/InsertEmoticon";
import MicIcon from '@material-ui/icons/Mic'
import { useParams } from "react-router-dom";
import {db} from './firebase'
import {serverTimestamp} from 'firebase/firestore'
// import { MicNone } from "@material-ui/icons";
function Chat({user}){
        const {roomId}= useParams()
        // alert(roomId)
    const[input,setform]=useState('')
    const [roomData,setroomdata]=useState('')
    const[messages,setmessage]=useState([])
    const sendmessage=(e)=>{
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection('message').add({
            message:input,
            name:user.displayName,
            timestamp:serverTimestamp(),
        })
        setform('')
    }
    useEffect(()=>{
        if(roomId){
            db.collection("rooms")
            .doc(roomId)
            .onSnapshot(snapshot=>setroomdata(snapshot.data()))
            //////////
            db.collection("rooms")
            .doc(roomId).collection('message')
            .orderBy('timestamp','asc')
            .onSnapshot(snapshot=>setmessage(snapshot.docs.map((doc)=>doc.data())));

        }
    },[roomId])

    return <div className="chat">
        <div className="chat-header">
            <Avatar src={roomData.roomPhoto}/>
        <div className="chat-header-info">
            <h3>{roomData.name}</h3>
            <p>last see{new Date(
                messages[0]?.timestamp?.toDate()
                ).toUTCString()}</p>
        </div>
        <div className="chat-headerRight">
            <IconButton>
                <SearchOutlined/>
            </IconButton>
            <IconButton>
            <AttachFile/>
            </IconButton>
            <IconButton>
                <MoreVert/>
            </IconButton>
        </div>
        </div>
        <div className="chat-body">
                {
                    messages.map(message=>(
                        <p className={`chat-message ${message.name === user.displayName
                        && 'chat-received'
                        }`}>
                            <span className="chat-name">
                                {message.name}
                            </span>
                            {message.message}
                            <span className="chat-timestamp">
                                {new Date(
                messages[messages.length-1]?.timestamp?.toDate()
                ).toUTCString()}
                            </span>
                        </p>
                    ))
                }
        </div>
        <div className="chat-footer">
        <InsertEmoticonIcon/>
        <form action="">
            <input type="text" value={input}onChange={event=>setform(event.target.value)}></input>
            <button onClick={sendmessage} type="submit">send a message</button>
        </form>
        <MicIcon/>
        </div>
    </div>
}
export default Chat;