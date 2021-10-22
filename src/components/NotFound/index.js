import React from "react";

const NotFound = (error) => {

  return (
    <>
      {error ?
        <div>
          <h1>There's an error with database connection </h1 >
        </div >
        :
        <div>
          <h1>No result found</h1>
        </div>
      }
    </>
  );
};

export default NotFound;
