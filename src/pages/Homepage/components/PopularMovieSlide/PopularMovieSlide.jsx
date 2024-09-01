import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import "./PopularMovieSlide.style.css";
import useResponsive from "../MovieCard/CardResponse";

const PopularMovieSlide = () => {
    const responsive = useResponsive;

    const { data, isLoading, isError, error } = usePopularMoviesQuery();
    console.log("popular data", data);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    return (
        <div className="p-4">
            <h2>TOP Popular Movies</h2>
            <Carousel
                infinite={true}
                centerMode={true}
                itemClass="movie-slider p-1"
                containerClass="carousel-container"
                responsive={responsive}
            >
                {data?.results.map((movie, idx) => (
                    <MovieCard movie={movie} key={idx} />
                ))}
            </Carousel>
        </div>
    );
};

export default PopularMovieSlide;
