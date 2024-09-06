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
    const [currentData, setCurrentData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(1);

    const handlePageClick = ({ selected }) => {
        console.log("page", selected);
        setPage(selected + 1);
    };

    const [query, setQuery] = useSearchParams();
    console.log("query", query);
    const keyword = query.get("q");

    useEffect(() => {
        setPage(1);
    }, [keyword]);

    useEffect(() => {
        setFilteredData([]);
    }, []);

    const { data, isLoading, isError, error } = useSearchMovieQuery({
        keyword,
        page,
    });
    console.log("search movie query data:", data);

    useEffect(() => {
        if (data) {
            setCurrentData(data);
            console.log("currentData state", currentData);
        }
    }, [data]);

    const { data: genreData } = useMovieGenreQuery();
    console.log("장르데이타", genreData);

    if (isLoading) {
        return <Spinner variant="danger" className="icon-spinner" />;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    const fnSortHigh = () => {
        if (currentData && currentData.results) {
            const arraySortHigh = currentData?.results.sort(function (a, b) {
                return b.popularity - a.popularity;
            });
            console.log("정렬내림차순", arraySortHigh);
            setCurrentData({ ...currentData, results: arraySortHigh });
        }
    };

    const fnSortLow = () => {
        if (currentData && currentData.results) {
            const arraySortLow = currentData?.results.sort(function (a, b) {
                return a.popularity - b.popularity;
            });
            console.log("정렬오름차순", arraySortLow);
            setCurrentData({ ...currentData, results: arraySortLow });
        }
    };

    const findGenre = (id) => {
        setFilteredData([]);
        if (!genreData || !currentData.results) return;
        const filteredMovies = currentData.results.filter((movie) =>
            movie.genre_ids.includes(id)
        );

        setFilteredData(filteredMovies);
        console.log("필터드 리스트", filteredData);
    };

    return (
        <div className="p-3">
            <Row>
                {currentData?.results?.length > 0 && (
                    <div className="box-dropdown">
                        <DropdownButton
                            id="dropdown-basic-button"
                            title="Sort"
                            size="sm"
                            variant="secondary"
                        >
                            <Dropdown.Item onClick={fnSortHigh}>
                                Popularity high
                            </Dropdown.Item>
                            <Dropdown.Item onClick={fnSortLow}>
                                Popularity low
                            </Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton
                            id="dropdown-basic-button"
                            title="Genre"
                            size="sm"
                            variant="secondary"
                        >
                            <Dropdown.Item
                                onClick={() => window.location.reload()}
                            >
                                All
                            </Dropdown.Item>
                            {genreData?.map((genre, index) => (
                                <Dropdown.Item
                                    key={index}
                                    onClick={() => findGenre(genre.id)}
                                >
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
                        {filteredData && filteredData.length > 0 ? (
                            filteredData.map((movie, index) => (
                                <Col key={index} className="p-2">
                                    <MovieCard movie={movie} />
                                </Col>
                            ))
                        ) : currentData?.results?.length > 0 ? (
                            <>
                                {currentData.results.map((movie, index) => (
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
                                        pageCount={currentData?.total_pages} // 전체 페이지
                                        previousLabel="<"
                                        renderOnZeroPageCount={null}
                                        forcePage={page - 1} // 현재 페이지
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
