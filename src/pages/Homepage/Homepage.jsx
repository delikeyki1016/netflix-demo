import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovie/TopRatedMovieSlide";
import UpcommingMovieSlide from "./components/UpcommingMovies/UpcommingMoviesSlide";

// 1. 배너 만들기 : popular movie의 첫번째 아이템을 보여주기
// 2. popular movie 가져오기
// 3. top rated movie 가져오기
// 4. upcoming move 가져오기

const Homepage = () => {
    return (
        <div>
            <Banner />
            <PopularMovieSlide />
            <TopRatedMovieSlide />
            <UpcommingMovieSlide />
        </div>
    );
};

export default Homepage;
