import React from "react";
import { useUpcommingMoviesQuery } from "../../../../hooks/useUpcommingMovies";
import { Alert, Spinner } from "react-bootstrap";
import MovieSlide from "../../../../common/MovieSlide/MovieSlide";

const UpcommingMovieSlide = () => {
    const { data, isLoading, isError, error } = useUpcommingMoviesQuery();
    console.log("upcomming data", data);

    if (isLoading) {
        return <Spinner variant="danger" className="icon-spinner" />;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }
    return <MovieSlide title="Upcomming Movies" movies={data.results} />;
};

export default UpcommingMovieSlide;
