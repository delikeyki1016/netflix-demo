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

// 필터 구현
// 받아온 초기data를 filteredData에 넣는다.
// desc, asc를 누르면 해당 화면에서 정렬이 된다. 정렬된 상태에서 2페이지를 눌렀을 때 정렬상태는 유지
//

const Movies = () => {
    const [query, setQuery] = useSearchParams();
    const keyword = query.get("q");

    const [page, setPage] = useState(1);
    const [originData, setOriginData] = useState({}); // 원본 데이터
    const [filteredData, setFilteredData] = useState({}); // 필터드 데이터
    const [orderBy, setOrderBy] = useState("desc");
    const [genre, setGenre] = useState("");
    const [genreName, setGenreName] = useState("All");

    const { data, isLoading, isError, error } = useSearchMovieQuery({
        keyword,
        page,
        orderBy,
        genre,
    }); // 초기 데이터

    const { data: genreData } = useMovieGenreQuery();
    // console.log("장르데이터", genreData);

    const handleSort = (key) => {
        // console.log("키", key);
        if (key === "desc") {
            return (
                setOrderBy("desc"),
                setFilteredData(
                    [...data.results].sort(
                        (a, b) => b.popularity - a.popularity
                    )
                )
            );
        } else if (key === "asc") {
            return (
                setOrderBy("asc"),
                setFilteredData(
                    [...data.results].sort(
                        (a, b) => a.popularity - b.popularity
                    )
                )
            );
        }
    };

    useEffect(() => {
        if (data) {
            console.log("초기데이터", data);
            setFilteredData(data);
            setOriginData(data);
        }
    }, [data]);

    useEffect(() => {
        console.log("필터드데이터", filteredData);
    }, [filteredData]);

    const handlePageClick = ({ selected }) => {
        setPage(selected + 1);
    };

    useEffect(() => {
        setPage(1);
        // setOrderBy("desc");
        // setGenre("");
        // setGenreName("All");
    }, [keyword, orderBy, genre]);

    useEffect(() => {
        console.log("현재페이지", page);
        console.log("현재정렬", orderBy);
        // handleSort(orderBy);
    }, [page]);

    if (isLoading) {
        return <Spinner variant="danger" className="icon-spinner" />;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    const handleGenre = (id) => {
        console.log("id", id);
        if (id !== "") {
            setGenre(id);
            const selectedGenreId = genreData.findIndex(
                (genre) => genre.id === Number(id)
            );
            console.log("선택한 장르명", genreData[selectedGenreId].name);
            setGenreName(genreData[selectedGenreId].name);
            // if (!genreData || !data.results) return;
            const genrefilteredMovies = filteredData.results.filter((movie) =>
                movie.genre_ids.includes(id)
            );

            setFilteredData(genrefilteredMovies);
            console.log("장르 필터드 리스트", filteredData);
        } else {
            console.log("아이디가 all이다");
            setGenre("");
            setGenreName("All");
            setFilteredData(originData);
        }
    };

    return (
        <div className="p-3">
            <Row>
                {filteredData.results?.length > 0 && (
                    <div className="box-dropdown">
                        <DropdownButton
                            id="dropdown-basic-button"
                            title={genreName}
                            size="sm"
                            variant="secondary"
                            onSelect={handleGenre}
                        >
                            <Dropdown.Item eventKey={""}>All</Dropdown.Item>
                            {genreData?.map((genre, index) => (
                                <Dropdown.Item key={index} eventKey={genre.id}>
                                    {genre.name}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                        <DropdownButton
                            id="dropdown-basic-button"
                            title={orderBy}
                            size="sm"
                            variant="secondary"
                            onSelect={handleSort}
                        >
                            <Dropdown.Item eventKey="desc">
                                Popularity Desc
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="asc">
                                Popularity low
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                )}
            </Row>
            <Row>
                <Col lg={12}>
                    <Row>
                        {filteredData.results?.length > 0 ? (
                            <>
                                {filteredData?.results.map((movie, index) => (
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
