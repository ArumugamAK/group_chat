import React ,{useEffect, useState}from "react";
import Sidechat from './Sidechat';
import {db} from './firebase'
import './Sidebar.css'
import { Avatar,IconButton } from "@material-ui/core";
import  DonutLarge  from "@material-ui/icons/DonutLarge";
import MoreVert from "@material-ui/icons/MoreVert";
import SearchOutlined  from "@material-ui/icons/SearchOutlined";
import ChatIcon from '@material-ui/icons/Chat';
function Sidebar({setUser,user}){
    const [rooms,setroom]=useState([]);
    useEffect(()=>{
        const unsubscribe=db.collection("rooms").onSnapshot((Snapshot)=>(
            setroom(Snapshot.docs.map((doc)=>({
                id:doc.id,
                data:doc.data()
            })))
        ))
        return ()=>unsubscribe()
    },[]);
    console.log(rooms);
    return <div className="sidebar">
        <button onClick={()=>{sessionStorage.setItem('user','');
              setUser('');
              }}>Logout</button>
                <div className="sidebar-header">
                    <Avatar src={user.photoURL}/>
                    <div className="headerRight">
                        <IconButton>
                        <DonutLarge/>

                        </IconButton>
                        <IconButton>

                        <ChatIcon/>
                        </IconButton>
                        <IconButton>

                        <MoreVert/>
                        </IconButton>
                    </div>
                </div>
                <div className="sidebar-search">
                    <div className="sidebar-search-container">
                    <SearchOutlined/>
                    <input style={{border:"none"}} placeholder="Search the chat" type='text'> 
                    </input>
                    </div>
                </div>
                <div className="sidebar-chat">
                    <Sidechat addNewChat/>
                    { rooms.map(room =>(
                        <Sidechat key={room.id} name={room.data.name} 
                        id={room.id} photo={room.data.roomPhoto} />
                    ))}
                </div>
            </div>
}
export default Sidebar;