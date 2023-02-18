import React from "react";

export default function Hero({children}) {
  return <div className="hero d-flex justify-content-center h-50">
    <div className="container mt-sm-0">
      {children}
    </div>
  </div>;
}
