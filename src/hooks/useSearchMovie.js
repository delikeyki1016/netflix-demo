import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// keyword가 있냐 없냐에 따라 받아오는 데이타를 달리 가져오자==>없으면 popular movie호출
const fetchSearchMovie = ({ keyword, page, orderBy, genre }) => {
    return keyword
        ? api.get(
              `/search/movie?query=${keyword}&page=${page}&sort_by=popularity.${orderBy}&with_genres=${genre}`
          )
        : api.get(
              `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.${orderBy}&with_genres=${genre}`
          );
};

export const useSearchMovieQuery = ({ keyword, page, orderBy, genre }) => {
    return useQuery({
        queryKey: ["movie-search", { keyword, page, orderBy, genre }],
        queryFn: () => fetchSearchMovie({ keyword, page, orderBy, genre }), // keyword 넘겨주기, page 추가하기, orderBy 추가
        select: (result) => result.data,
    });
};
