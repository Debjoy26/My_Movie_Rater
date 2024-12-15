import React, { useState, useEffect } from 'react';
import API from '../services/api-service';
import { useCookies } from 'react-cookie';


export default function MovieForm({movie, updateMovie}){

    const[title, setTitle]=useState('');
    const[description, setDescription]=useState('');
    const [token]=useCookies("mr-token");

    useEffect(()=>{
        setTitle(movie.title);
        setDescription(movie.description);
    },[movie])

    const saveMovie=async() => {
        console.log("SAVE MOVIE HERE", {title, description});
        const resp = await API.updateMovie(movie.id, {title, description}, token["mr-token"] )
        if(resp) updateMovie(resp);
    }
    const createMovie=async() => {
        console.log("SAVE MOVIE HERE", {title, description});
        const resp = await API.createMovie({title, description}, token["mr-token"] )
        if(resp) updateMovie(resp);
    }

    const isDisabled = title=='' || description=='' ? true : false;

    return (
        <React.Fragment>
            {movie &&
            <div className="grid grid-cols-2 gap-2 text-blue-600 p-3">
                <label htmlFor="title" className="text-white">Title</label>
                <input id="title" type="text" placeholder="Title" value={title} onChange={(evt)=>setTitle(evt.target.value)}/>
                <label htmlFor="descrption" className="text-white">Description</label>
                <textarea id="descrption" placeholder="Descrption" value={description} onChange={(evt)=>setDescription(evt.target.value)}/>
                <p>&nbsp;</p>
                { movie.id ?
                <button onClick={()=>saveMovie()} disabled={isDisabled} className="text-black bg-gradient-to-r from-teal-300 via-pink-200 to-pink-300 font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300">Update Movie</button> : 
                <button onClick={()=>createMovie()} disabled={isDisabled} className="text-black bg-gradient-to-r from-teal-300 via-pink-200 to-pink-300 font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300">Create Movie</button>
            }
                
            </div>}
        </React.Fragment>
    )
}