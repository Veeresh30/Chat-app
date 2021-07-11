import React, {useState,useEffect} from 'react';
import './Sidebar.css';
import {Avatar} from "@material-ui/core";
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import { actionTypes } from './reducer';
import db from './firebase';
import firebase from "firebase";
import { useStateValue } from './StateProvider';
import { Button } from '@material-ui/core';

function Sidebar(props) {

    const [rooms, setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )

            ))
        ));

        return () => {
            unsubscribe();
        }
    },[]); 

    const signOutUser = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({ type: actionTypes.LOGOUT_SUCCESS });
            })
            .catch((error) => alert(error.message));
    }

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                    <div className="sidebar_headerRight">
                        <Button size='medium' variant='outlined' color='secondary' onClick = {signOutUser}>Logout</Button>
                    </div>
            </div>
            
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start new chat"/>
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat/>
                {rooms.map(room=> (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;