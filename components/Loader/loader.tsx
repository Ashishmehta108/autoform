// Loader.jsx
import React from "react";
import "./loader.css";

export default function Loader() {
  return (
    <div className="loader-container">
      <svg className="youtube-loader" viewBox="0 0 50 50">
        <circle className="loader-bg" cx="25" cy="25" r="20" />
        <circle className="loader-fg" cx="25" cy="25" r="20" />
      </svg>
    </div>
  );
}
