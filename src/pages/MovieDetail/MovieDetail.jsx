import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useMovieReviewQuery } from "../../hooks/useMovieReview";
import {
    Badge,
    Button,
    Col,
    Container,
    Modal,
    Row,
    Spinner,
} from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Alert } from "bootstrap";
import "./MovieDetail.style.css";
import RecommandMovies from "../Movies/RecommandMovies";
import YouTube from "react-youtube";
import { useVideoQuery } from "../../hooks/useVideo";

const MovieDetail = () => {
    const param = useParams();
    // console.log("무비디테일 param", param);

    const id = param.id;
    const { data, isLoading, isError, error } = useMovieDetailQuery({ id });
    // console.log("무비디테일 query data:", data);

    // data이름을 genreData라는 이름으로 재정의하겠다.
    const { data: genreData } = useMovieGenreQuery();
    // console.log("받아온 장르", genreData);

    const [showModal, setShowModal] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const {
        data: movieReview,
        isLoading: reviewIsLoading,
        isError: reviewIsError,
        error: reviewError,
    } = useMovieReviewQuery({ id });
    // console.log("리뷰", movieReview);

    const { data: video } = useVideoQuery({ id });
    console.log("video 리턴값", video);

    const [isMoreViewArray, setIsMoreViewArray] = useState(
        movieReview ? movieReview.map(() => false) : []
    );

    useEffect(() => {
        setIsMoreViewArray([]);
    }, [id]);

    const toggleReview = (index) => {
        setIsMoreViewArray((prev) => {
            // 이전 상태를 복사
            const newState = [...prev];
            // 해당 인덱스의 상태를 토글
            newState[index] = !newState[index];
            return newState;
        });
    };

    if (isLoading) {
        return <Spinner variant="danger" className="icon-spinner" />;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    if (reviewIsLoading) {
        return <Spinner variant="danger" className="icon-spinner" />;
    }
    if (reviewIsError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    // genreData안에서 해당 카드의 장르 id가 일치하는 것의 name을 리스트로 뽑아내기
    const showGenre = (genreIdList) => {
        // console.log("genreIdList", genreIdList);
        if (!genreData) return [];
        const genreNameList = genreIdList.map((id) => {
            const genreObj = genreData.find((genre) => genre.id === id.id);
            return genreObj.name;
        });

        return genreNameList;
    };

    function showVideo() {
        const onPlayerReady = (event) => {
            // access to player in all event handlers via event.target
            event.target.pauseVideo();
        };

        const opts = {
            height: "510",
            width: "760",
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
            },
        };

        return (
            <YouTube
                videoId={selectedVideo}
                opts={opts}
                onReady={onPlayerReady}
            />
        );
    }

    const handleModal = (item) => {
        setSelectedVideo(item.key);
        setShowModal(true);
    };

    return (
        <Container className="p-3 detail-wrap">
            <Row>
                <Col lg={5} className="poster-wrap">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                        alt={`${data?.title} poster`}
                        className="movie-poster"
                    />
                </Col>
                <Col lg={7}>
                    <h1>
                        {data?.title}
                        {` (${data?.release_date.substr(0, 4)})`}
                    </h1>
                    <div>
                        {showGenre(data.genres).map((genre, index) => (
                            <>
                                <Badge bg="danger" key={index}>
                                    {genre}
                                </Badge>{" "}
                            </>
                        ))}
                        {!data?.adult ? (
                            <Badge bg="success">{"All"}</Badge>
                        ) : (
                            <Badge bg="danger">{"18 +"}</Badge>
                        )}
                    </div>
                    <hr />
                    <ul className="movie-detail-info">
                        <li>runtime: {data?.runtime} min</li>
                        <li className="graph-li">
                            vote_average:
                            <br />
                            <ProgressBar
                                label={`${data?.vote_average.toFixed(2)}%`}
                                now={`${data?.vote_average.toFixed(2)}`}
                                max={10}
                            />
                        </li>
                        <li>release date: {data?.release_date}</li>
                        <li>
                            homepage:{" "}
                            <Link to={`${data?.homepage}`} target="_blank">
                                {data?.homepage}
                            </Link>
                        </li>
                        <li>
                            budget: $
                            {data?.budget
                                .toString()
                                .replace(
                                    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                    ","
                                )}
                        </li>
                    </ul>
                    <hr />
                    <p className="mt-3">
                        overview <br />
                        {data?.overview}
                        <br />
                        {video?.map((item, index) => (
                            <>
                                <Button
                                    key={index}
                                    size="sm"
                                    onClick={() => handleModal(item)}
                                >
                                    video{index + 1}
                                </Button>{" "}
                            </>
                        ))}
                    </p>
                    <Modal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        backdrop="static"
                        keyboard={false}
                        size="lg"
                        centered
                        data-bs-theme="dark"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Video</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{showVideo()}</Modal.Body>
                    </Modal>
                    <hr />
                    <div className="mt-3">
                        backdrop
                        <br />
                        <img
                            src={`https://image.tmdb.org/t/p/w300${data?.backdrop_path}`}
                            alt="backdrop"
                        />
                    </div>
                    <hr />
                    <div className="mt-3">
                        {data.production_companies.length > 0 && (
                            <>
                                made by
                                <br />
                                {data?.production_companies.map(
                                    (com, index) => (
                                        <span
                                            key={index}
                                        >{`${com.name} | `}</span>
                                    )
                                )}
                            </>
                        )}
                    </div>
                </Col>
            </Row>

            <Row>
                {movieReview.length > 0 && (
                    <>
                        <hr />
                        <h2>Review</h2>
                        {movieReview.map((review, index) => (
                            <div className="review-box" key={index}>
                                <strong>{review.author}</strong>
                                <br />
                                <div
                                    className={`review-text ${
                                        isMoreViewArray[index]
                                            ? "review-text-all"
                                            : ""
                                    }`}
                                >
                                    {review.content}
                                </div>
                                {review.content.length > 320 ? (
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => toggleReview(index)}
                                    >
                                        {isMoreViewArray[index]
                                            ? "hide"
                                            : "more"}
                                    </Button>
                                ) : (
                                    ""
                                )}
                            </div>
                        ))}
                    </>
                )}
            </Row>

            <RecommandMovies id={id} />
        </Container>
    );
};

export default MovieDetail;
