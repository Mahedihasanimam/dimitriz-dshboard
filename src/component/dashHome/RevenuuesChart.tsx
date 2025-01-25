import React, { useState } from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import Title from '../share/Title';
import SelectBox from '../share/SelectBox';
import { useGetAnalyticsQuery } from '../../redux/features/admin/dashboard';
import { useGetcoursebyInstructorIdQuery } from '../../redux/features/course/productApi';
import { useSelector } from 'react-redux';
import { Progress, Rate } from 'antd';

interface RevenueDataItem {
  month?: string;
  day?: string;
  totalSalesAmount: number;
}

const RevenueChart: React.FC = () => {
  const [filter, setFilter] = useState<string>('weekly');

  const { data: apiData, isLoading, isError } = useGetAnalyticsQuery(filter);

  const user = useSelector((state: any) => state.user.user);

  console.log('usere', user?._id);
  const { data: ratingData } = useGetcoursebyInstructorIdQuery(user?._id);

console.log(ratingData,'rating data');


const chartData =
    ratingData?.data?.courses?.map((item) => ({
      date: new Date(item.createdDate).toLocaleDateString(), // Format date
      amt: parseFloat(item.averageRating), // Use averageRating as amt
    })) || []; // Fallback to empty array









  const revenueData =
    apiData?.data?.map((item: RevenueDataItem) => ({
      name: item.month || item.day,
      amt: item.totalSalesAmount,
    })) || [];

  const formatYAxis = (tickItem: number) => {
    return `$${tickItem.toLocaleString()}`;
  };

  const handleSelectChange = (value: string) => {
    setFilter(value);
  };

  const selectOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load data. Please try again.</p>;
  }

  return (
    <div className="bg-[#FFFFFF] rounded-2xl rounded-t-none p-2 pr-14">
      <div className="flex justify-between px-4 py-2 border-b-2 border-[#E9EAF0]">
        <Title>Revenue</Title>
        <SelectBox
          options={selectOptions}
          placeholder="Revenue"
          onChange={handleSelectChange}
          style={{ width: 100 }}
        />
      </div>

      <br />
      <ResponsiveContainer width="100%" height={480}>
        <AreaChart data={revenueData}>
          <defs>
            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#564FFD" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#564FFD00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            axisLine={false}
            dataKey="name"
            tickFormatter={(value) => {
              if (value.includes("/")) {
                const [month, day] = value.split("/");
                return `${month}/${day}`;
              }
              return value.substring(0, 3);
            }}
          />
          <YAxis
            axisLine={false}
            tickFormatter={formatYAxis}
            ticks={[0, 2000, 4000, 6000, 8000, 10000, 12000, 14000]}
            interval={0}
          />
          <Tooltip
            formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
            labelFormatter={(label) => `Date: ${label}`}
          />
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


      {/* <div>
        <div className="flex justify-between px-4 pt-12 pb-6 border-b-2 border-[#E9EAF0]">
          <Title>Overall Course Rating</Title>
          <SelectBox
            options={selectOptions}
            placeholder="This week"
            onChange={handleSelectChange}
            style={{ width: 100 }}
          />
        </div>

        <br />
        <div className="flex items-center justify-center h-full p-6 gap-6 border-b-2 border-[#E9EAF0]">
          <div className="bg-[#FFF2E5] p-6 rounded-md min-w-[180px] min-h-[180px] text-center py-2 pt-8">
            <h1 className="text-[40px] font-semibold text-[#1D2026]">
              {ratingData?.data?.averageRating }
            </h1>
            <Rate
              disabled
              allowHalf
              style={{ fontSize: 20, color: "#FDB022" }}
              defaultValue={ratingData?.data?.averageRating }
            />
            <p className="text-[14px] text-[#1D2026] font-medium pt-1">
              Overall Rating
            </p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={ratingData}>
              <defs>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FDB022" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FDB02200" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip />
              <Area
                isAnimationActive={false}
                strokeWidth={3}
                stroke="#FDB022"
                type="monotone"
                dataKey="amt"
                fill="url(#colorAmt)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div> */}







<div className="flex justify-between px-4 pt-12 pb-6 border-b-2 border-[#E9EAF0]">
        <Title>Overall Course Rating</Title>
        
      </div>

      <br />

      <div className="flex items-center justify-center h-full p-6 gap-6  border-b-2 border-[#E9EAF0]">
        <div className="bg-[#FFF2E5] p-6 rounded-md min-w-[180px] min-h-[180px] text-center py-2 pt-8 ">
          <h1 className="text-[40px] font-semibold text-[#1D2026]">{ratingData?.data?.averageRating}</h1>
          {/* rating todo  */}
          <Rate
            allowHalf
           disabled
            style={{ fontSize: 20, color: "#FDB022" }}
            defaultValue={ratingData?.data?.averageRating}
          />
          <p className="text-[14px] text-[#1D2026] font-medium pt-1">
            Overall Rating
          </p>
        </div>


        {/* TO DO ADD WORK ON IT ---------------------------------------------- */}
        <div className=" w-full">
     
   
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorAmt">
                <stop offset="5%" stopColor="#FFF2E5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FFF2E5" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Tooltip />
            <Area
              isAnimationActive={false}
              strokeWidth={3}
              stroke="#FDB022"
              type="monotone"
              dataKey="amt"
              fill="#FFF2E5"
            />
          </AreaChart>
        </ResponsiveContainer>

    </div>
        {/* TO DO ADD WORK ON IT ---------------------------------------------- */}

      </div>
      <div className="space-y-4 py-8">


      {
  ratingData?.data?.ratingPercentages &&
  Object.entries(ratingData.data.ratingPercentages).map(([rating, percentage], index) => (
    <div className="px-6 flex items-center justify-start gap-6" key={index}>
      <div className="flex items-center justify-center gap-2">
        <Rate
          allowHalf
          style={{ fontSize: 20, color: "#FDB022" }}
          defaultValue={Number(rating)}
          className="flex-shrink-0"
        />
        <span className="text-[16px] font-medium text-[#4E5566] px-4 flex-shrink-0">
          {rating} Star
        </span>
      </div>
      <Progress
        className="max-w-[330px]"
        type="line"
        strokeColor="#FDB022"
        strokeLinecap="butt"
        strokeWidth={10}
        percent={Number(percentage)}
        status="active"
      />
    </div>
  ))
}

        

       

      </div>







    </div>
  );
};

export default RevenueChart;

