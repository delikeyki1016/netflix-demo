import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";

const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery();
    console.log("배너쿼리 받아온 데이터", data);
    if (isLoading) {
        <h1>Loading...</h1>;
    }
    if (isError) {
        <Alert variant="danger">{error.message}</Alert>;
    }
    return (
        <div
            style={{
                backgroundImage:
                    "url(" +
                    `https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${data?.results[0].poster_path}` +
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
