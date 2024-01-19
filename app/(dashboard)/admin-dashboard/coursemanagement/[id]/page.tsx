import SingleCourse from "../_components/single-course";

const CourseDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      <SingleCourse id={id} />
    </div>
  );
};
export default CourseDetails;
