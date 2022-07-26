import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import TitlePage from "../Parts/TitlePage";
import {
  chartIncomeService,
  chartOutcomeService,
  getAllUserMemberService,
} from "../../Services";

const DashboardComponent = () => {
  const [monthChart, setMonthChart] = useState([]);
  const [chartIncome, setChartIncome] = useState([]);
  const [chartOutcome, setChartOutcome] = useState([]);

  const [userMembers, setUserMembers] = useState([]);

  useEffect(() => {
    chartIncomeService()
      .then((data) => {
        let month = [];
        let incomeChart = [];

        data.data.data.forEach((item) => {
          month.push(item.month);
          incomeChart.push(item.total_amount);
        });

        setMonthChart(month);
        setChartIncome(incomeChart);
      })
      .catch((error) => {
        console.log("Chart Error ", error);
      });
    getAllUserMemberService()
      .then((data) => {
        console.log(data.data.data);
        setUserMembers(data.data.data);
      })
      .catch((error) => {
        console.log("Member Error ", error);
      });

    chartOutcomeService()
      .then((data) => {
        let outcomeChart = [];

        data.data.data.forEach((item) => {
          outcomeChart.push(item.total_amount);
        });

        setChartOutcome(outcomeChart);
      })
      .catch((error) => {
        console.log("Chart Error ", error);
      });
  }, []);

  return (
    <>
      <TitlePage title="Dashboard" description="Dashboard Page" />
      <div className="-mt-10 px-5 flex gap-3">
        <div className="border bg-white rounded-md p-10 w-8/12 h-auto">
          <h5 className="text-gray-700 font-medium text-lg">TOTAL PEMASUKAN</h5>
          <div className="flex justify-content-center w-full items-center">
            <Line
              data={{
                labels: monthChart,
                datasets: [
                  {
                    label: "Pemasukan",
                    data: chartIncome,
                    fill: false,
                    backgroundColor: "rgb(54, 162, 235)",
                    borderColor: "rgba(54, 162, 235, 0.2)",
                  },
                  {
                    label: "Pengeluaran",
                    data: chartOutcome,
                    fill: false,
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgba(255, 99, 132, 0.2)",
                  },
                ],
              }}
              width={90}
              height={30}
              options={{
                scales: {
                  yAxes: [
                    {
                      type: "linear",
                    },
                    {
                      type: "linear",
                    },
                  ],
                },
              }}
            />
          </div>
        </div>
        <div className="border bg-white rounded-md px-10 w-4/12 py-5">
          <h5 className="text-gray-700 font-medium text-lg">LIST MEMBER</h5>
          <div className="flex justify-content-center w-full items-center">
            <table className="mx-auto w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 border ">
              <thead className="bg-gray-50">
                <tr className="text-gray-600 text-left">
                  <th className="font-semibold text-sm uppercase px-6 py-1">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody
                className="divide-y divide-gray-200 overflow-y-auto"
                style={{ height: "9px" }}
              >
                {userMembers.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-6 py-1">
                        <div className="flex items-center space-x-3">
                          <div className="inline-flex w-10 h-10">
                            <img
                              className="w-8 h-8 object-cover rounded-full"
                              alt="User avatar"
                              src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
                            />
                          </div>
                          <div>
                            <p className="text-sm">{user.name}</p>
                            <p className="text-gray-500 text-sm font-semibold tracking-wide">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
