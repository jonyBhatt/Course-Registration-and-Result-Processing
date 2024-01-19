import ReportsDetails from "./_components/reports";

const Report = () => {
  return (
    <div>
      <h2 className="font-bold text-3xl mb-6">Report</h2>
      <div className="p-4 border border-gray-300 rounded-md">
        <ReportsDetails />
      </div>
    </div>
  );
};
export default Report;
