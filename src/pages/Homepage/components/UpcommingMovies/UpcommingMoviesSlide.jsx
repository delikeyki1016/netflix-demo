import React from "react";
import { useUpcommingMoviesQuery } from "../../../../hooks/useUpcommingMovies";
import { Alert } from "react-bootstrap";
import MovieSlide from "../../../../common/MovieSlide/MovieSlide";

const UpcommingMovieSlide = () => {
    const { data, isLoading, isError, error } = useUpcommingMoviesQuery();
    console.log("upcomming data", data);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }
    return <MovieSlide title="Upcomming Movies" movies={data.results} />;
};

export default UpcommingMovieSlide;
