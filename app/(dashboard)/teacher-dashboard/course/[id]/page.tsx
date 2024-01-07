import React from "react";
import SingleCourseForm from "../../_components/SingleCourseForm";

const Course = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <SingleCourseForm id={params.id} />
    </div>
  );
};

export default Course;
