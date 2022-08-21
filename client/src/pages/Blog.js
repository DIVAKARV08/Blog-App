import React, { useEffect, useState } from "react";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
var parse = require("html-react-parser");

const Blog = () => {
  const [blog, setBlog] = useState();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleBlog(id);
    }
  }, [id]);
  const getSingleBlog = async (id) => {
    const response = await axios.get(`http://localhost:5001/blogs/${id}`);
    if (response.status === 200) {
      setBlog(response.data);
      // console.log(response.data);
    } else {
      console.log("error");
    }
  };

  return (
    <MDBContainer style={{ border: "1px solid #d1ebe8" }}>
      <Link to="/">
        <strong style={{ float: "left" }} className="mt-3">
          Go Back
        </strong>
      </Link>
      <MDBTypography tag="h2" className="text-center mt-2" style={{}}>
        {blog && blog.title}
      </MDBTypography>
      <img
        src={blog && blog.bannerimage}
        className="fluid-round center"
        style={{ width: "100%", maxHeight: "600px" }}
      />
      <MDBTypography
        className="text-center"
        style={{ width: "100%", overflow: "hidden" }}
      >
        {blog && parse(blog.blogbody)}
      </MDBTypography>
    </MDBContainer>
  );
};

export default Blog;
