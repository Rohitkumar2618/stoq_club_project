import React from "react";
import { useParams } from "react-router-dom";

function MpopularBasket_details() {
  // Access route parameters
  const { id } = useParams();

  return (
    <div>
      <h1>Details of Basket {id}</h1>
      {/* Render the details of the selected basket based on the id */}
    </div>
  );
}

export default MpopularBasket_details;
