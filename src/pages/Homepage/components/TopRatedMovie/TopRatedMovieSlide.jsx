import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies";
import { Alert } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import MovieCard from "../MovieCard/MovieCard";
import useResponsive from "../MovieCard/CardResponse";

const TopRatedMovieSlide = () => {
    const responsive = useResponsive;

    const { data, isLoading, isError, error } = useTopRatedMoviesQuery();
    console.log("top rated data", data);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }
    return (
        <div className="p-4">
            <h2>Top Rated Movies</h2>
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

export default TopRatedMovieSlide;
