import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommandMovies = ({ id }) => {
    return api.get(`/movie/${id}/recommendations?language=en-US&page=1`); // api.js 에서 baseURL 를 설정했으므로 그 다음것만 가져옴
};

export const useRecommandMoviesQuery = ({ id }) => {
    return useQuery({
        queryKey: ["movie-recommand", id],
        queryFn: () => fetchRecommandMovies({ id }),
        select: (result) => result.data,
    });
};
