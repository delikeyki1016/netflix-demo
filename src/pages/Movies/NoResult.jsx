import React from "react";
import { useSearchParams } from "react-router-dom";
import RecommandMovies from "./RecommandMovies";

const NoResult = () => {
    const [query, setQuery] = useSearchParams();
    console.log("query", query);
    const searchWord = query.get("q");

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100%" }}
        >
            <h3 className="mt-5">No results for "{searchWord}" keyword.</h3>
            <RecommandMovies id={748783} />
        </div>
    );
};

export default NoResult;
