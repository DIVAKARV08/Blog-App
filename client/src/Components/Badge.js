import React from "react";
import { MDBBadge } from "mdb-react-ui-kit";

const Badge = ({ tag, index }) => {
  //   console.log(tag);
  const colorKey = [
    "primary",
    "secondary",
    "danger",
    "warning",
    "dark",
    "info",
  ];
  var rand = colorKey[Math.floor(Math.random() * colorKey.length)];
  var cn = `btn btn-sm btn-outline-${rand} btn-rounded waves-effect m-0 `;
  return (
    <div style={{ margin: "3px" }}>
      {/* <MDBBadge pill className="m-1" color={rand} style={{ fontSize: "10px" }}>
        {tag}
      </MDBBadge> */}
      <button class={cn} type="button" style={{ fontSize: "1.2vh" }}>
        {tag}
      </button>
    </div>
  );
};

export default Badge;
