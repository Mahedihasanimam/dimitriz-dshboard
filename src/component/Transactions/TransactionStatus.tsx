import React, { useState, useEffect } from "react";
import SelectBox from "../share/SelectBox";
import { FaRegUserCircle } from "react-icons/fa";
import { FiCreditCard } from "react-icons/fi";
import { GrLineChart } from "react-icons/gr";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetAdminTransectionsQuery } from "../../redux/features/admin/dashboard";
import TransactionHistory from "../admin/TransactionHistory";

interface Transaction {
  amount: number;
  date: string;
}

const TransactionsStatus: React.FC = () => {
  const [formattedData, setFormattedData] = useState([]);
  const [selectedValue, setSelectedValue] = useState<string | undefined>("weekly");
  
  // Fetch transactions data based on the selected filter
  const { data, isLoading, isError } = useGetAdminTransectionsQuery({ filter: selectedValue });

  // Format transactions data for the chart whenever data is fetched
  useEffect(() => {
    if (data) {
      const formatted = data.data.transactions.map((transaction) => ({
        name: new Date(transaction.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        amt: transaction.amount,
      }));
      setFormattedData(formatted);
    }
  }, [data]);

  const formatYAxis = (tickItem: number) => `${tickItem / 1000}k`;

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  const selectOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="bg-[#FFFFFF] p-6 rounded-xl">
      <div className="flex justify-between w-full">
        <div>
          <h1 className="text-xl font-bold text-[#5D5D5D]">Overview</h1>
          <p className="text-[#5D5D5D]">Activities summary at a glance</p>
        </div>
        <div className="pr-8">
          <SelectBox
            options={selectOptions}
            placeholder="Week"
            onChange={handleSelectChange}
            style={{ width: 100 }}
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={480}>
        <AreaChart data={formattedData} syncId="anyId">
          <defs>
            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#564FFD" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#564FFD00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis axisLine={false} dataKey="name" />
          <YAxis
            axisLine={false}
            tickFormatter={formatYAxis}
            ticks={[0, 2000, 4000, 6000, 8000, 10000, 12000, 14000]}
            interval={0}
          />
          <Tooltip />
          <Area
            isAnimationActive={false}
            strokeWidth={3}
            stroke="#564FFD"
            type="monotone"
            dataKey="amt"
            fill="url(#colorAmt)"
          />
        </AreaChart>
      </ResponsiveContainer>



      <TransactionHistory/>
    </div>
  );
};

export default TransactionsStatus;
