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

// 경로2가지
// navbar에서 클릭해서 온 경우 ==> popular move 보여주기
// keyword를 입력해서 온 경우 ==> 키워드에 해당하는 영화 보여주기

// 페이지네이션 설치
// page state 만들기
// page 바뀔 때마다 useSearchMovie에 page까지 넣어서 fetch

const Movies = () => {
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

    const { data, isLoading, isError, error } = useSearchMovieQuery({
        keyword,
        page,
    });
    console.log("search movie query data:", data);

    if (isLoading) {
        return <Spinner variant="danger" className="icon-spinner" />;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    return (
        <div className="p-3">
            <Row>
                <Col lg={12}>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="filter"
                        size="sm"
                        variant="secondary"
                    >
                        <Dropdown.Item>Not yet</Dropdown.Item>
                        <Dropdown.Item>oh my god</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <Row>
                        {data && data.results.length > 0 ? (
                            <>
                                {data.results.map((movie, index) => (
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
                                        pageCount={data?.total_pages} // 전체 페이지
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
                            <div className="text-center">no result</div>
                        )}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Movies;
