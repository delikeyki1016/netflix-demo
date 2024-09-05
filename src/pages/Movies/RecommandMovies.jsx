import React from "react";
import MovieCard from "../../common/MovieCard/MovieCard";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import { useRecommandMoviesQuery } from "../../hooks/useRecommandMovies";

const RecommandMovies = ({ id }) => {
    const { data, isLoading, isError, error } = useRecommandMoviesQuery({ id });
    // console.log("recommand movie query data:", data);

    if (isLoading) {
        return <Spinner variant="danger" className="icon-spinner" />;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    return (
        <Row className="mt-5">
            <h2>Recommand Movies</h2>
            {data?.results.map((movie, index) => (
                <Col key={index} className="p-2">
                    <MovieCard movie={movie} />
                </Col>
            ))}
        </Row>
    );
};

export default RecommandMovies;
