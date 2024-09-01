import axios from "axios";

// const API_KEY = process.env.API_KEY;
const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWZmODRmMWUwNWQ2ZTRkZjlkMDM3NDE5OWYyN2IxZSIsIm5iZiI6MTcyNTE2OTQ3NS4yODEwNjQsInN1YiI6IjY2ZDEzNDAyODQ1NzM4ZjY1Njk0MzBlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a3EzN9m6hAn5-Z7gR4IgI8zRbGYaDOXdtX39lW-VkCc";
// console.log("api key", API_KEY);

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
});

console.log("헤더", api.headers);

// 요청 인터셉터 추가하기
axios.interceptors.request.use(
    function (config) {
        // 요청이 전달되기 전에 작업 수행
        return config;
    },
    function (error) {
        // 요청 오류가 있는 작업 수행
        return Promise.reject(error);
    }
);

// 응답 인터셉터 추가하기
axios.interceptors.response.use(
    function (response) {
        // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
        // 응답 데이터가 있는 작업 수행
        return response;
    },
    function (error) {
        // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
        // 응답 오류가 있는 작업 수행
        return Promise.reject(error);
    }
);

export default api;
