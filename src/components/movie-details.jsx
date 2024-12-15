import React, { useState, useEffect } from "react";
import { MdOutlineStarPurple500, MdStarHalf } from "react-icons/md";
import API from "../services/api-service";
import { useCookies } from 'react-cookie';

export default function MovieDetails({ movie, updateMovie }) {
  const rating = movie?.avg_rating; // Safe access in case movie is null or undefined
  const fullStars = Math.floor(rating); // Calculate full stars
  const hasHalfStar = rating % 1 >= 0.5; // Check for half star based on the fractional part

  const [highlighted, setHighlighted] = useState(2);
  const [error, setError] = useState(null);
  const [token] = useCookies("mr-token");

  

  const rateMovie = async (rate) => {
    try {
      const resp = await API.rateMovie(movie.id, { star: rate }, token["mr-token"]);
      if (resp) {
        const updatedMovie = { ...movie, avg_rating: resp.avg_rating, no_of_rating: resp.no_of_rating };
        // After successfully rating, re-fetch the updated movie details
        updateMovie(updatedMovie);
        getNewMovie();
      }
    } catch (error) {
      setError("An error occurred while rating the movie.");
    }
  };

  const getNewMovie = async () => {
    try {
      const resp = await API.getMovie(movie.id, token["mr-token"]);
      if (resp) {
        // Update the movie details in the parent component
        updateMovie(resp);
      }
    } catch (error) {
      setError("Failed to fetch movie details.");
    }
  };

  return (
    <React.Fragment>
      {movie && (
        <div className="border border-yellow-400 p-4">
          <h1 className="text-2xl"><b>{movie.title}</b></h1>
          <p>{movie.description}</p>
          <div className="flex justify-center ml-4 space-x-1 mt-2">
            {/* Full stars */}
            {Array.from({ length: fullStars }).map((_, index) => (
              <MdOutlineStarPurple500 key={index} className="text-orange-500" />
            ))}

            {/* Half star */}
            {hasHalfStar && <MdStarHalf className="text-orange-500" />}

            {/* Empty stars */}
            {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map((_, index) => (
              <MdOutlineStarPurple500 key={fullStars + index + 1} className="text-gray-300" />
            ))}
            <p>({movie.no_of_rating})</p>
          </div>
          <h1 className='border-t-2 border-green-600'>Rate the Movie!!🐼</h1>
          <div className="flex justify-center ml-4 space-x-1 mt-2">
            {[...Array(5)].map((el, indx) => {
              return (
                <MdOutlineStarPurple500
                  key={indx}
                  className={highlighted > indx ? 'text-purple-500' : 'text-gray-300'}
                  onMouseEnter={() => setHighlighted(indx + 1)}
                  onMouseLeave={() => setHighlighted(-1)}
                  onClick={() => rateMovie(indx + 1)}
                />
              );
            })}
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
    </React.Fragment>
  );
}
