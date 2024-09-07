import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import {
    Alert,
    Col,
    Dropdown,
    DropdownButton,
    Row,
    Spinner,
} from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import NoResult from "./NoResult";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

// 경로2가지
// navbar에서 클릭해서 온 경우 ==> popular move 보여주기
// keyword를 입력해서 온 경우 ==> 키워드에 해당하는 영화 보여주기

// 페이지네이션 설치
// page state 만들기
// page 바뀔 때마다 useSearchMovie에 page까지 넣어서 fetch

const Movies = () => {
    const [query, setQuery] = useSearchParams();
    const keyword = query.get("q");

    const [page, setPage] = useState(1);
    const [filteredData, setFilteredData] = useState({}); // 필터드 데이터

    const { data, isLoading, isError, error } = useSearchMovieQuery({
        keyword,
        page,
    }); // 초기 데이터

    const { data: genreData } = useMovieGenreQuery();

    useEffect(() => {
        if (data) {
            console.log("초기데이터", data);
            setFilteredData(data);
            console.log("필터드데이타", filteredData);
        }
    }, [data]);

    useEffect(() => {
        setPage(1);
    }, [keyword]);

    if (isLoading) {
        return <Spinner variant="danger" className="icon-spinner" />;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    const handlePageClick = ({ selected }) => {
        setPage(selected + 1);
    };

    const handleSort = (key) => {
        // console.log("키", key);
        if (key === "desc") {
            return setFilteredData(
                [...data?.results].sort((a, b) => b.popularity - a.popularity)
            );
        } else if (key === "asc") {
            return setFilteredData(
                [...data?.results].sort((a, b) => a.popularity - b.popularity)
            );
        }
    };

    const handleGenre = (id) => {
        setFilteredData(data);
        if (!genreData || !data.results) return;
        const filteredMovies = data.results.filter((movie) =>
            movie.genre_ids.includes(id)
        );

        setFilteredData(filteredMovies);
        console.log("장르 필터드 리스트", filteredData);
    };

    return (
        <div className="p-3">
            <Row>
                {filteredData?.results?.length > 0 && (
                    <div className="box-dropdown">
                        <DropdownButton
                            id="dropdown-basic-button"
                            title="Sort"
                            size="sm"
                            variant="secondary"
                            onSelect={handleSort}
                        >
                            <Dropdown.Item eventKey="desc">
                                Popularity high
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="asc">
                                Popularity low
                            </Dropdown.Item>
                        </DropdownButton>

                        <DropdownButton
                            id="dropdown-basic-button"
                            title="Genre"
                            size="sm"
                            variant="secondary"
                            onSelect={handleGenre}
                        >
                            <Dropdown.Item eventKey={0}>All</Dropdown.Item>
                            {genreData?.map((genre, index) => (
                                <Dropdown.Item key={index} eventKey={genre.id}>
                                    {genre.name}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                )}
            </Row>
            <Row>
                <Col lg={12}>
                    <Row>
                        {filteredData?.results?.length > 0 ? (
                            <>
                                {filteredData.results.map((movie, index) => (
                                    <Col key={index} className="p-2">
                                        <MovieCard movie={movie} />
                                    </Col>
                                ))}
                                <div className="d-flex justify-content-center mt-4">
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel=">"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        pageCount={filteredData?.total_pages}
                                        previousLabel="<"
                                        renderOnZeroPageCount={null}
                                        forcePage={page - 1}
                                        containerClassName="pagination"
                                        activeClassName="active"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link"
                                        variant="secondary"
                                    />
                                </div>
                            </>
                        ) : (
                            <NoResult />
                        )}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Movies;
