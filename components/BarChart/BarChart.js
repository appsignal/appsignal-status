import Tippy from "@tippyjs/react";

const Bar = () => {
  return (
    <Tippy
      content={
        <div className="text-center text-sm">
          <p className="text-gray-200">July 19th</p>
          <p>No outage</p>
        </div>
      }
    >
      <div className="h-8 flex-grow bg-green-500 rounded" />
    </Tippy>
  );
};

const BarChart = () => {
  return (
    <div className="flex space-x-1">
      {[...Array(30)].map((e, index) => (
        <Bar key={index} />
      ))}
    </div>
  );
};

export default BarChart;
