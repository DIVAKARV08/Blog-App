import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogEditor from "./BlogEditor";
import { MDBBtn, MDBInput, MDBInputGroup } from "mdb-react-ui-kit";
import axios from "axios";
import Tagsinput from "../Components/Tagsinput";
//iix6czal
const AddEditBlog = () => {
  const [blogContent, setBlogContent] = new useState("");
  const [tags, setTags] = useState([]);
  // console.log(tags);
  const initialState = {
    title: "",
    bannerimage: "",
    blogbody: "",
  };
  const [formvalue, setFormvalue] = useState(initialState);
  const { title, bannerimage } = formvalue;
  const [file, setFile] = useState();
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
  };

  const onUpload = async (e) => {
    const FILE = e.target.files[0];
    let formData = new FormData();
    formData.append("file", FILE);
    formData.append("upload_preset", "iix6czal");
    await axios
      .post("http://api.cloudinary.com/v1_1/deu9uhlba/image/upload", formData)
      .then((res) => {
        setFile(res.data.url);
        // console.log(res.data.url);
        setFormvalue({ ...formvalue, bannerimage: res.data.url });
      })
      .catch((err) => {
        console.log("Error message", err);
      });
  };
  let navigate = useNavigate();
  const handleSubmit = (a) => {
    if (title && bannerimage && blogContent) {
      const date = new Date();
      const currentDate = date.getDate();
      const updatedBlogData = {
        ...formvalue,
        date: currentDate,
        blogbody: blogContent,
        tags: tags,
      };
      console.log(updatedBlogData);
      const response = axios.post(
        "http://localhost:5001/blogs",
        updatedBlogData
      );
      if (response.status === 201) {
        console.log("success");
      } else {
        console.log("Failed");
      }
      setFormvalue({ title: "", bannerimage: "" });
      setBlogContent("");
      navigate("/");
    }
  };

  const DeleteBlog = (e) => {
    setFormvalue({ title: "", bannerimage: "" });
    setBlogContent("");
    navigate("/");
  };
  return (
    <div>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "600px",
          alginContent: "center",
        }}
        // className="w-75"
      >
        <div className="input-group">
          <span className="input-group-text fw-bold" id="basic-addon1">
            Title
          </span>
          <MDBInput
            name="title"
            type="text"
            required
            label="Title"
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <br />
        <div className="input-group mb-3">
          <span className="input-group-text fw-bold" id="basic-addon1">
            Banner Image
          </span>
          <MDBInput
            name="bannerimage"
            type="file"
            required
            onChange={(e) => onUpload(e)}
            style={{
              opacity: "0",
            }}
          />
        </div>
        <img src={file} width="auto" max-height="600px" />
        <Tagsinput setTags={setTags} tags={tags} />
      </div>
      <div>
        <BlogEditor setBlogContent={setBlogContent} />
      </div>
      <div className="text-center p-2">
        <MDBBtn className="m-2" color="success" onClick={(e) => handleSubmit()}>
          Create Blog
        </MDBBtn>
        <MDBBtn className="m-2" color="danger" onClick={(e) => DeleteBlog()}>
          Delete Blog
        </MDBBtn>
      </div>
    </div>
  );
};

export default AddEditBlog;
