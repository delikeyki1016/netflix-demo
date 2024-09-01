import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./MovieSlide.style.css";
import MovieCard from "../MovieCard/MovieCard";
import { cardResponsive } from "../../constants/CardResponse";

const MovieSlide = ({ title, movies }) => {
    return (
        <div className="p-4">
            <h2>{title}</h2>
            <Carousel
                infinite={true}
                centerMode={true}
                itemClass="movie-slider p-1"
                containerClass="carousel-container"
                responsive={cardResponsive}
            >
                {movies.map((movie, index) => (
                    <MovieCard movie={movie} key={index} />
                ))}
            </Carousel>
        </div>
    );
};

export default MovieSlide;
