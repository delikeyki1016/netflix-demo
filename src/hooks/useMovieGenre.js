import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieGenre = () => {
    return api.get(`/genre/movie/list`);
};
export const useMovieGenreQuery = () => {
    return useQuery({
        queryKey: ["movie-genre"],
        queryFn: fetchMovieGenre,
        // data안의 genres만 뽑아오겠다.
        select: (result) => result.data.genres,
        // 자주 호출할 필요가 없는 데이터이기 때문에 아래처럼 설정하면 5분동안 호출하지 않고 캐시사용
        staleTime: 30000, //5분
    });
};
