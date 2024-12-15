import { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { IoLogOut } from "react-icons/io5";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [newMovie, setNewMovie] = useState(null);
  const [token, setToken, deleteToken]=useCookies("mr-token");
  const navigate = useNavigate();

  useEffect(()=>{
    //console.log('token', token['mr-token']);
    if(!token['mr-token']) navigate('/');
},[token])
  

  const movieClicked = (movie, isEdit) => {
    if (isEdit){
      console.log(null);
    setSelectedMovie(null);
    setEditedMovie(movie);
    }else{
      console.log(movie);
    setSelectedMovie(movie);
    setEditedMovie(null);
    }
    
  };

  const updateMovie=(movie)=>{
    setNewMovie(movie);
    setSelectedMovie(movie);
    navigate('/movies');
  }
  

  const createNewMovie = () => {
    setSelectedMovie(null);
    setEditedMovie({title:"", description:""})
  }

  const userLogout=()=> {
    deleteToken(['mr-token']);
    navigate('/');
  }

  return (
    <div className="App">
      <header className="App-header p-10 border-b-2 border-green-700 mb-5">
        <h1 className="text-4xl font-serif"><b>Movie Rater</b></h1>
        <h1 className='absolute top-5 right-5 cursor-pointer'onClick={()=>userLogout()}><IoLogOut /></h1>
        
      </header>
        <div className="grid grid-cols-2" align="center">
          {/* Pass movieClicked as a prop */}
          <div>
            <MovieList movieClicked={movieClicked} newMovie={newMovie} updateMovie={updateMovie}/>
            <button onClick={()=>createNewMovie()}>Create New Movie</button>
          </div>

          {selectedMovie && (
            <div className="border border-yellow-400 p-4 rounded-lg">
              <MovieDetails movie={selectedMovie} updateMovie={setSelectedMovie} />
            </div>
          )}
          
          {editedMovie && <MovieForm movie={editedMovie} updateMovie={setNewMovie}/>}
        </div>
    </div>
  );
}

export default App;
