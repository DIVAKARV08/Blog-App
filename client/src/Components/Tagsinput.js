import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const Tagsinput = ({ setTags, tags }) => {
  return (
    <div>
      <TagsInput
        value={tags}
        onChange={setTags}
        name="tags"
        placeHolder="Add Tags"
      />
    </div>
  );
};

export default Tagsinput;
