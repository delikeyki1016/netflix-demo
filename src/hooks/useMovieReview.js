import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieReview = ({ id }) => {
    return api.get(`/movie/${id}/reviews?language=en-US&page=1`);
};

export const useMovieReviewQuery = ({ id }) => {
    console.log("받아온 무비 디테일 id", id);
    return useQuery({
        queryKey: ["movie-review", id],
        queryFn: () => fetchMovieReview({ id }),
        select: (result) => result.data.results,
    });
};
