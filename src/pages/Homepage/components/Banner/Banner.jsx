import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";
import { Spinner } from "react-bootstrap";

const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery();
    console.log("배너쿼리 받아온 데이터", data);
    if (isLoading) {
        return <Spinner variant="danger" className="icon-spinner" />;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }
    return (
        <div
            style={{
                backgroundImage:
                    "url(" +
                    `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/${data?.results[0].poster_path}` +
                    ")",
            }}
            className="banner d-flex align-items-center"
        >
            <div className="banner-text">
                {/* data?는 data && 와 같다. 즉 data가 있으면 실행해 */}
                <h1>{data?.results[0].title}</h1>
                <p>{data?.results[0].overview}</p>
            </div>
        </div>
    );
};

export default Banner;
