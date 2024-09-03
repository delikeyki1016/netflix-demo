import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// keyword가 있냐 없냐에 따라 받아오는 데이타를 달리 가져오자==>없으면 popular movie호출
const fetchSearchMovie = ({ keyword, page }) => {
    return keyword
        ? api.get(`/search/movie?query=${keyword}&page=${page}`)
        : api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery = ({ keyword, page }) => {
    return useQuery({
        queryKey: ["movie-search", { keyword, page }],
        queryFn: () => fetchSearchMovie({ keyword, page }), // keyword 넘겨주기, page 추가하기
        select: (result) => result.data,
    });
};
