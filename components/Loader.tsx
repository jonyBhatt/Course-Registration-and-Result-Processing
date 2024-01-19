import Image from "next/image";

const Loader = () => {
  return (
    <Image
      src="/Infinity-1s-200px.svg"
      alt="loader"
      width={200}
      height={200}
      className="loader mt-[100px] md:ml-[300px] sm:ml-0 "
    />
  );
};
export default Loader;
