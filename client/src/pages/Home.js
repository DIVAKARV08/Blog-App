import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBCol, MDBRow, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import Blog from "../Components/Blog";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    loadBlogdata();
  }, []);

  const loadBlogdata = async () => {
    const response = await axios.get("http://localhost:5001/blogs");
    if (response.status === 200) {
      // console.log(response.data);
      setData(response.data);
    } else {
      console.log("Error");
    }
  };

  return (
    <>
      <MDBContainer>
        <MDBRow>
          {data.length === 0 && (
            <MDBTypography className="text-center mb-0" tag="h2">
              No Blog Found
            </MDBTypography>
          )}

          <MDBCol>
            <MDBContainer>
              <MDBRow>
                {data &&
                  data.map((item, index) => <Blog key={index} {...item} />)}
              </MDBRow>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Home;
