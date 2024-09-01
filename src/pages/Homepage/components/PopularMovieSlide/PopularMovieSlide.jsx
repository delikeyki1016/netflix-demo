import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "bootstrap";
import MovieSlide from "../../../../common/MovieSlide/MovieSlide";

const PopularMovieSlide = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery();
    console.log("popular data", data);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    return <MovieSlide title="Popular Movies" movies={data.results} />;
};

export default PopularMovieSlide;
