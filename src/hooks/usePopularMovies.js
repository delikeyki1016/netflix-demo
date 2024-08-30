import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularMovies = () => {
    return api.get(`/movie/popular`); // api.js 에서 baseURL 를 설정했으므로 그 다음것만 가져옴
};

export const usePopularMoviesQuery = () => {
    return useQuery({
        queryKey: ["movie-popular"],
        queryFn: fetchPopularMovies,
        select: (result) => result.data,
    });
};
