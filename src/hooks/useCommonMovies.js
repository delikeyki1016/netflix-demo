import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useCommonMoviesQuery = ({ item }) => {
    console.log("common query에서 받은 item", item);

    let getName = "";
    let queryKeyName = "";

    if (item === "popular") {
        getName = "/movie/popular";
        queryKeyName = "movie-popular";
    } else if (item === "top_rated") {
        getName = "/movie/top_rated";
        queryKeyName = "movie-top_rated";
    } else if (item === "upcoming") {
        getName = "/movie/upcoming";
        queryKeyName = "movie-upcoming";
    }

    const fetchMovies = () => {
        return api.get(getName); // api.js 에서 baseURL 를 설정했으므로 그 다음것만 가져옴
    };

    return useQuery({
        queryKey: [queryKeyName],
        queryFn: fetchMovies,
        select: (result) => result.data,
    });
};
