import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies";
import { Alert } from "react-bootstrap";
import MovieSlide from "../../../../common/MovieSlide/MovieSlide";

const TopRatedMovieSlide = () => {
    const { data, isLoading, isError, error } = useTopRatedMoviesQuery();
    console.log("top rated data", data);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }
    return <MovieSlide title="Top Rated Movies" movies={data.results} />;
};

export default TopRatedMovieSlide;
