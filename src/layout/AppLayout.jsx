import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const AppLayout = () => {
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");

    const searchByKeyword = (event) => {
        event.preventDefault();
        // url을 바꿔주기
        navigate(`/movies/?q=${keyword}`);
        setKeyword("");
    };
    return (
        <>
            <Navbar expand="lg" variant="dark">
                <Container fluid>
                    <Navbar.Brand>
                        <img
                            src="/Netflix_Logo_RGB.png"
                            alt="Netflix"
                            className="logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <Nav.Link onClick={() => navigate("/")}>
                                Home
                            </Nav.Link>
                            <Nav.Link onClick={() => navigate("/movies")}>
                                Movies
                            </Nav.Link>
                        </Nav>
                        <Form
                            className="d-flex"
                            data-bs-theme="dark"
                            onSubmit={searchByKeyword}
                        >
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={keyword}
                                onChange={(event) =>
                                    setKeyword(event.target.value)
                                }
                            />
                            <Button variant="outline-danger" type="submit">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* Outlet은 해당 라우트의 하위에 속한 라우트들을 보여주는 영역이다 */}
            <Outlet />
        </>
    );
};

export default AppLayout;
