const chartItems = [
  //   { title: "Pie Chart", icon: "🥧", color: "pink" }
  //   { title: "Bar Graph", icon: "📊", color: "blue" },
  //   { title: "Line Graph", icon: "📈", color: "green" },
  //   { title: "Doughnut", icon: "🍩", color: "yellow" },
  //   { title: "Trend", icon: "📉", color: "indigo" },
  { title: "Map", icon: "🗺️", color: "teal" }
];

const ChartGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full xl:w-3/4">
      {chartItems.map(({ title, icon, color }, idx) => (
        <div
          key={idx}
          className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:scale-[1.03] transition-all duration-300 ring-1 ring-${color}-200`}
        >
          <div
            className={`flex flex-col items-center justify-center h-48 bg-gradient-to-br from-${color}-50 to-white p-4`}
          >
            <span className="text-4xl mb-2">{icon}</span>
            <span className="text-sm font-medium text-gray-700">{title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChartGrid;

{
  /* <iframe
        title="sales_visuals"
        width="600"
        height="373.5"
        src="https://app.powerbi.com/view?r=eyJrIjoiMGRiYjA1YTctZjljNy00NDg3LWJhNzItMGI1NjVhY2UyOGM2IiwidCI6ImQ2NmI1MTMzLTc5YWUtNDA0OC04NDllLWIwZjliYjJjMjNiNyJ9"
      /> */
}
