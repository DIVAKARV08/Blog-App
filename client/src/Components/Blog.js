import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Badge from "./Badge";
var parse = require("html-react-parser");

const Blog = ({ title, bannerimage, blogbody, id, tags }) => {
  const [str, setStr] = useState("");
  const [tag, setTag] = useState([]);

  useEffect(() => {
    if (id) {
      getSingleBlog(id);
      setTag(tags);
    }
  }, [id]);
  const getSingleBlog = async (id) => {
    const response = await axios.get(`http://localhost:5001/blogs/${id}`);
    if (response.status === 200) {
      var s = response.data.blogbody;
      // console.log(s);
      if (s.length > 50) {
        s = s.substring(0, 50) + "...";
      }
      setStr(parse(s));
    } else {
      console.log("error");
    }
  };

  return (
    <MDBCol lg="4" md="6" sm="12">
      <MDBCard className="h-150 mt-5" style={{ maxWidth: "22rem" }}>
        <MDBCardImage
          src={bannerimage}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <MDBCardBody>
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText style={{ display: "flex"}}>
            {tag &&
              tag.map((item, index) => (
                <Badge key={index} index={index} tag={item} />
              ))}
          </MDBCardText>
          <Link to={`/blog/${id}`}>Read more</Link>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default Blog;
