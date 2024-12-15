import React, { useState, useContext, useEffect } from 'react';
import API from '../services/api-service';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
//import { TokenContest } from '..';


export default function Auth(){
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginView, setIsLoginView] = useState(true);

    const [token, setToken]=useCookies("mr-token");
    const navigate = useNavigate();

    useEffect(()=>{
        //console.log('token', token['mr-token']);
        if(token['mr-token']) navigate('/movies');
    },[token])

    const loginUser = () => {
        const getToken = async() =>{
            const resp = await API.loginUser({username, password});
            if (resp) {
                setToken("mr-token", resp.token);
                navigate('/movies');
            }
        }
        getToken();
    }

    const registerUser = () => {
        const register = async() =>{
            const resp = await API.registerUser({username, password});
            if (resp) loginUser();
        }
        register();
    }
    

    const isDisabled = username =='' || password =='' ? true : false;
    
    return (
        <div className="App p-12">
            <header className="App-header p-10 border-b-2 border-green-700 mb-5">
                <h1 className="text-4xl font-serif"><b>Movie Rater</b></h1>
                <div className='text-xl font-thin'>
                    {isLoginView ? <h1><i>Login</i></h1> : <h1><i>Register</i></h1>}
                </div>
            </header>
            
            <div className="grid grid-cols-2 gap-2 text-blue-600 p-3 w-1/2 mx-auto">
                    
                    <label htmlFor="username" className="text-amber-400">Username</label>
                    <input id="username" type="text" placeholder="Username" value={username} onChange={(evt)=>setUsername(evt.target.value)}/>
                    <label htmlFor="password" className="text-amber-400">Password</label>
                    <input id="password" type="password" placeholder="Password" value={password} onChange={(evt)=>setPassword(evt.target.value)}/>

                    <p>&nbsp;</p>
                    {isLoginView ?
                    <button onClick={()=>loginUser()} disabled={isDisabled} className="text-black bg-gradient-to-r from-teal-300 via-pink-200 to-pink-300 font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300">Login</button> :
                    <button onClick={()=>registerUser()} disabled={isDisabled} className="text-black bg-gradient-to-r from-teal-300 via-pink-200 to-pink-300 font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300">Register</button>}
                    
            </div>
            <div className='p-3 w-1/2 mx-auto'>
                {isLoginView ?
                <p className='cursor-pointer' onClick={()=>setIsLoginView(false)}>You don't have an account? Register here</p> :
                <p className='cursor-pointer' onClick={()=>setIsLoginView(true)}>Already have an account? Login here</p>}
            </div>
        </div>
    )
}