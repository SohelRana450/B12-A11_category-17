import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const RevenueOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const { data = {}, isLoading } = useQuery({
    queryKey: ["revenue", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/total-revenue`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading...</p>;

  const pieData = [
    { name: "Revenue", value: data.totalRevenue},
    { name: "Tickets Sold", value: data.totalTicketsSold },
    { name: "Tickets Added", value: data.totalTicketsAdded },
  ];

  return (
    <div className="">
      <div>
          <div className=" p-4">
      <h2 className="font-bold mb-2">Tickets Sold</h2>

      <ResponsiveContainer width="100%" height="400" style={{aspectRatio: 1.618}}>
        <BarChart className="font-bold w-10"  data={pieData}>
          <XAxis dataKey="name" type="category" />
          <YAxis dataKey="value" type="number" />
          <Tooltip />
          <Bar dataKey='value' fill="#10B981" />
          <Legend/>
        </BarChart>
      </ResponsiveContainer>
    </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
