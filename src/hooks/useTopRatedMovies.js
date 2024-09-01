import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTopRatedMovies = () => {
    return api.get(`/movie/top_rated`); // api.js 에서 baseURL 를 설정했으므로 그 다음것만 가져옴
};

export const useTopRatedMoviesQuery = () => {
    return useQuery({
        queryKey: ["movie-top_rated"],
        queryFn: fetchTopRatedMovies,
        select: (result) => result.data,
    });
};
