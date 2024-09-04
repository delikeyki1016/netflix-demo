import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetail = ({ id }) => {
    return api.get(`/movie/${id}`);
};

export const useMovieDetailQuery = ({ id }) => {
    console.log("받아온 무비 디테일 id", id);
    return useQuery({
        queryKey: ["movie-detail", id],
        queryFn: () => fetchMovieDetail({ id }),
        select: (result) => result.data,
    });
};
