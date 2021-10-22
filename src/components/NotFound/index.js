import React from "react";

const NotFound = ({ error }) => {

  return (
    <>
      {error ?
        <div>
          <h1>There's an error with server connection </h1 >
        </div >
        :
        <div>
          <h1>No results found</h1>
        </div>
      }
    </>
  );
};

export default NotFound;
