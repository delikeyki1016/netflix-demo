import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";

const MovieCard = ({ movie, index }) => {
    return (
        <div
            style={{
                backgroundImage:
                    "url(" +
                    `https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${movie?.poster_path}` +
                    ")",
            }}
            className="movie-card"
            key={index}
        >
            <div className="overlay">
                <h3 className="movie-title">{movie?.title}</h3>
                {movie.genre_ids.map((id, index) => (
                    <>
                        <Badge bg="info" key={index}>
                            {id}
                        </Badge>{" "}
                    </>
                ))}
                <div className="movie-info">
                    <div>vote average: {movie?.vote_average}</div>
                    <div>popular rate: {movie?.popularity}</div>
                    <div>release date: {movie?.release_date}</div>
                    <div>
                        {movie?.adult ? (
                            <Badge bg="danger">{"18 +"}</Badge>
                        ) : (
                            <Badge bg="success">{"18 -"}</Badge>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
