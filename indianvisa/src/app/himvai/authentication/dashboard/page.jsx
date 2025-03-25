
import { BarCharts } from "@/components/admin-dashboard/chart/bar-charts";
import { LineCharts } from "@/components/admin-dashboard/chart/line-charts";
import { LineInteractiveCharts } from "@/components/admin-dashboard/chart/line-interactive-charts";
import { PieCharts } from "@/components/admin-dashboard/chart/pie-charts";
import { RadialCharts } from "@/components/admin-dashboard/chart/radial-charts";
import { Card } from "@/components/ui/card";
import { ChartNoAxesColumnIncreasing, ReceiptCent, User } from "lucide-react";

export default function Page({ children }) {
  return (
    <div className="min-h-screen bg-[EAEDEF] dark:bg-[#181818]">
      {/* Dashboard Layout */}
      <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <Card className="bg-blue-300 dark:bg-[#181818]">
          <h3 className="text-center">Rankings</h3>
        </Card>

        <Card className="bg-blue-300 dark:bg-[#181818]">
          <h3 className="text-center">Analytics</h3>
        </Card>

        <Card className="bg-blue-300 dark:bg-[#181818]">
          <h3 className="text-center">LightHouse</h3>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 w-full bg-blue-50 dark:bg-[#181818]">
              <div className="flex gap-1 items-center justify-between">
                <ReceiptCent className="text-green-500" />
                <h3 className="text-center text-green-600 font-semibold">
                  Total Revenue
                </h3>
              </div>
              <h2 className="text-center text-2xl font-bold text-blue-700">
                10
              </h2>
            </Card>

            <Card className="p-4 w-full bg-pink-50 dark:bg-[#181818]">
              <div className="flex gap-1 items-center justify-between">
                <User className="text-pink-600" />
                <h3 className="text-center text-pink-600 font-semibold">
                  Active Users
                </h3>
              </div>
              <h2 className="text-center text-2xl font-bold text-pink-700">
                8
              </h2>
            </Card>
          </div>

          <div>
            <BarCharts />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <PieCharts />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 w-full bg-yellow-50 dark:bg-[#181818]">
              <div className="flex gap-1 items-center">
                <ChartNoAxesColumnIncreasing className="text-yellow-600" />
                <h3 className="text-center text-green-600 font-semibold">
                  Session
                </h3>
              </div>
              <h2 className="text-center text-2xl font-bold text-yellow-700 ">
                22,000
              </h2>
            </Card>

            <Card className="p-4 w-full bg-green-50 dark:bg-[#181818]">
              <div className="flex gap-1 items-center justify-between">
                <ChartNoAxesColumnIncreasing className="text-yellow-600" />
                <h3 className="text-center text-pink-600 font-semibold">
                  Goal Completions
                </h3>
              </div>
              <h2 className="text-center text-2xl font-bold text-green-700">
                8000
              </h2>
            </Card>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-4">
            <RadialCharts title={"Performance Score"} />
            <RadialCharts title={"Accessibility Score"} />
            <RadialCharts title={"SEO Score"} />
            <RadialCharts title={"Best Practices Score"} />
          </div>
        </div>
      </div>

      <div className="hidden sm:grid sm:grid-cols-12 gap-4 mt-3">
        {/* Rankings */}
        <Card className="col-span-8 bg-blue-300 dark:bg-[#181818]">
          <h3 className="text-center">Backlinks</h3>
        </Card>

        {/* Google Analytics */}
        <Card className="col-span-4 bg-blue-300 dark:bg-[#181818] ">
          <h3 className="text-center">Search Console</h3>
        </Card>
      </div>

      <div className="sm:grid sm:grid-cols-12 gap-4 mt-3">
        <div className="col-span-8">
          <div className="sm:grid sm:grid-cols-12 gap-4">
            <div className="col-span-4">
              <RadialCharts title={"Creation Flow"} />
            </div>
            <div className="col-span-8">
              <LineInteractiveCharts />
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <LineCharts />
        </div>
      </div>
    </div>
  );
}
