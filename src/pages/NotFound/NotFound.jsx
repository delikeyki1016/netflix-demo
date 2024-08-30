import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceGrinTongueWink } from "@fortawesome/free-regular-svg-icons";

const NotFound = () => {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100%" }}
        >
            <h1>Not Found</h1>
            <FontAwesomeIcon icon={faFaceGrinTongueWink} size="3x" />
            <p>Sorry, please go home</p>
        </div>
    );
};

export default NotFound;
