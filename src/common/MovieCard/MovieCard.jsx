import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie, index }) => {
    // data이름을 genreData라는 이름으로 재정의하겠다.
    const { data: genreData } = useMovieGenreQuery();
    // console.log("genreData", genreData);

    // genreData안에서 해당 카드의 장르 id가 일치하는 것의 name을 리스트로 뽑아내기
    const showGenre = (genreIdList) => {
        if (!genreData) return [];
        const genreNameList = genreIdList.map((id) => {
            const genreObj = genreData.find((genre) => genre.id === id);
            return genreObj.name;
        });

        return genreNameList;
    };

    // const truncate = (str, n) => {
    //     return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    //   };

    return (
        <div
            style={{
                backgroundImage:
                    "url(" +
                    `https://image.tmdb.org/t/p/w300${movie?.poster_path}` +
                    ")",
            }}
            className="movie-card"
            key={index}
        >
            <div className="overlay">
                <h3
                    className={`movie-title ${
                        movie?.title.length > 50 && `movie-title-overtext`
                    }`}
                >
                    {/* {console.log("글자수", movie.title.length)} */}
                    {movie?.title}
                </h3>
                {/*  movie.genre_ids를 함수를 한번 거친 후에 map 돌리기 */}
                {showGenre(movie.genre_ids).map((genre, index) => (
                    <>
                        <Badge bg="info" key={index}>
                            {genre}
                        </Badge>{" "}
                    </>
                ))}
                <div className="movie-info">
                    <div>vote average: {movie?.vote_average}</div>
                    <div>popular rate: {movie?.popularity}</div>
                    <div>release date: {movie?.release_date}</div>
                    <div>
                        {movie?.adult ? (
                            <Badge bg="danger">{"18 +"}</Badge>
                        ) : (
                            <Badge bg="success">{"18 -"}</Badge>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
