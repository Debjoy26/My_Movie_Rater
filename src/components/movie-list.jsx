import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import API from '../services/api-service';
import { useCookies } from 'react-cookie';


export default function MovieList({ movieClicked, newMovie }) { // Destructure movieClicked from props

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [token]=useCookies("mr-token");

  const [selectedMovie, setSelectedMovie] = useState(null);

const updateMovie = (updatedMovie) => {
  setSelectedMovie(updatedMovie); // Update the currently selected movie
  setMovies((prevMovies) => 
    prevMovies.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie))
  );
};


  useEffect(()=>{
    const newMovies = movies.map(movie=>
      movie.id === newMovie.id ? newMovie : movie
    );
    setMovies(newMovies);
  },[newMovie])

  useEffect(() => {
    const fetchListOfMovies=async()=>{
      const resp = await API.fetchMovies(token["mr-token"]);
    if(resp) setMovies(resp)
    }
    fetchListOfMovies()
  }, []);

  useEffect(() => {
    if (newMovie && newMovie.id) {
      setMovies(prevMovies => {
        const movieExists = prevMovies.some(movie => movie.id === newMovie.id);
        return movieExists ? prevMovies : [...prevMovies, newMovie];
      });
    }
  }, [newMovie]);

  const removeMovie = (movieToBeRemoved)=>{
    const resp=API.removeMovie(movieToBeRemoved.id, token["mr-token"]);
    if (resp){
      const newMovies = movies.filter(movie=>movie.id !== movieToBeRemoved.id );
    setMovies(newMovies);
    }
    
  }

  if (error) return <h1>{error}</h1>;

  return (
    <div>
      {movies.map(movie => (
        <div key={movie.id} className="grid grid-cols-[1fr_auto_auto] gap-3 p-3">
          <h2 className='text-xl cursor-pointer' onClick={() => movieClicked(movie, false)}>{movie.title}</h2> {/* Call movieClicked on click */}
          <div className='flex justify-center ml-4 space-x-1 mt-2'>  
            <FaEdit onClick={() => movieClicked(movie, true)}/>
            <MdDelete onClick={() => removeMovie(movie)}/>
          </div>
        </div>
      ))}
    </div>
  );
}
