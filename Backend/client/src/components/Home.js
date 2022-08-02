import { useNavigate } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import '../App.css';

export default function Home(props) {
    const { setprogress, showAlert, alert } = props;
    const [user, setUser] = useState('')
    let navigate = useNavigate()
    props.setprogress(0)
    useEffect(() => {
        if (!localStorage.getItem('token')){
         navigate("/login")   
        }
    },[])
    const getuser = async () => {

        const response = await fetch(`api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const json = await response.json()
        let name=json.name
        name=name.split(" ")
        name=name[0]
        setUser(name)
    };
    getuser()
    let time = new Date();
    let text;
    if (time.getHours() > 5 && time.getHours() < 12) {
        text = 'Good Morning!!'
    }
    else if (time.getHours() > 12 && time.getHours() < 18) {
        text = 'Good Afternoon!!'
    }
    else if (time.getHours() < 24 || time.getHours() < 5) {
        text = 'Good Evening!!'
    }
    return (
        <div>
            <div> <pre className='welcome-text'>{text} {user}</pre></div>
        </div>
    )
}


