import React from "react";

const Dashboard = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Rankings */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">Rankings</h3>
          <div className="flex justify-between mt-2">
            <div>
              <p className="text-gray-600">Google Rankings</p>
              <p className="text-2xl font-bold">10</p>
            </div>
            <div>
              <p className="text-gray-600">Google Change</p>
              <p className="text-2xl font-bold text-green-500">+4</p>
            </div>
          </div>
        </div>

        {/* Google Analytics */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">Google Analytics</h3>
          <p className="text-2xl font-bold">2,787 Sessions</p>
          <p className="text-gray-600">Goal Completions: 3,306</p>
        </div>

        {/* Google Lighthouse Scores */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">Google Lighthouse</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <p className="text-gray-600">Performance</p>
              <p className="text-2xl font-bold text-yellow-500">70</p>
            </div>
            <div>
              <p className="text-gray-600">SEO Score</p>
              <p className="text-2xl font-bold text-red-500">40</p>
            </div>
            <div>
              <p className="text-gray-600">Accessibility</p>
              <p className="text-2xl font-bold text-green-500">80</p>
            </div>
            <div>
              <p className="text-gray-600">Best Practices</p>
              <p className="text-2xl font-bold text-blue-500">90</p>
            </div>
          </div>
        </div>

        {/* Backlinks */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">Backlinks</h3>
          <p className="text-2xl font-bold">Citation Flow: 55</p>
        </div>

        {/* New/Lost Links */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">New/Lost Links</h3>
          <p className="text-gray-600">Track backlink growth</p>
        </div>

        {/* Google Search Console */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">Google Search Console</h3>
          <p className="text-2xl font-bold">Impressions: 262K</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
