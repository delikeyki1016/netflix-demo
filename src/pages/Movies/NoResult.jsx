import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import MovieCard from "../../common/MovieCard/MovieCard";

import { Alert, Col, Row, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const NoResult = () => {
    const [query, setQuery] = useSearchParams();
    console.log("query", query);
    const searchWord = query.get("q");

    const [page, setPage] = useState(1);
    const keyword = "marvel";
    const { data, isLoading, isError, error } = useSearchMovieQuery({
        keyword,
        page,
    });
    console.log("no result recommand movie query data:", data);

    if (isLoading) {
        return <Spinner variant="danger" className="icon-spinner" />;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100%" }}
        >
            <h3 className="mt-5">No results for "{searchWord}" keyword.</h3>
            <Row className="mt-5">
                <h3>Recommand popular movies</h3>
                {data?.results.map((movie, index) => (
                    <Col key={index} className="p-2">
                        <MovieCard movie={movie} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default NoResult;
