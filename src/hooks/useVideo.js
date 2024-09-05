import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchVideo = ({ id }) => {
    return api.get(`/movie/${id}/videos?language=en-US`);
};

export const useVideoQuery = ({ id }) => {
    // console.log("받아온 무비 디테일 id", id);
    return useQuery({
        queryKey: ["movie-video", id],
        queryFn: () => fetchVideo({ id }),
        select: (result) => result.data.results.slice(0, 3),
    });
};
