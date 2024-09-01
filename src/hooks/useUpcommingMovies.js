import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUpcommingMovies = () => {
    return api.get(`/movie/upcoming`); // api.js 에서 baseURL 를 설정했으므로 그 다음것만 가져옴
};

export const useUpcommingMoviesQuery = () => {
    return useQuery({
        queryKey: ["movie-upcoming"],
        queryFn: fetchUpcommingMovies,
        select: (result) => result.data,
    });
};
