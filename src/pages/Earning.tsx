import React, { useState } from "react";

import { HiMiniUsers } from "react-icons/hi2";
import { FaArrowTrendUp, FaUser } from "react-icons/fa6";
import { SiCoursera } from "react-icons/si";
import { FcComboChart, FcDocument } from "react-icons/fc";

// import { useGetAllStatusApiQuery } from "../redux/Features/getAllStatusApi";
import { PlayCircleOutlined } from "@ant-design/icons";
import { DiStackoverflow } from "react-icons/di";
import { GrDocumentVerified } from "react-icons/gr";
import { CiCreditCard1, CiTrophy } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { BsStack } from "react-icons/bs";
import { IoIosTrophy } from "react-icons/io";
import SelectBox from "../component/share/SelectBox";
import { FiCreditCard } from "react-icons/fi";
import { LuCrown } from "react-icons/lu";
import RevenueChart from "../component/dashHome/RevenuuesChart";
// Define a type for the API response
interface StatusAttributes {
  totalEarnings: number;
  allUsers: number;
  paidUsers: number;
}

interface StatusData {
  data: {
    attributes: StatusAttributes;
  };
}

const cardData = [
  {
    id: 1,
    icon: <LuCrown style={{fontSize: '30px',color:'#039855'}} />,
    title: '€27,350.00',
    description: 'Total Revenue',
  },
  {
    id: 2,
    icon: <GrDocumentVerified  style={{fontSize: '30px',color:'#7F56D9'}} />,
    title: '€33,350.00',
    description: 'Current Balance',
  },
  {
    id: 3,
    icon: <FiCreditCard style={{fontSize: '30px',color:'#D92D20'}} />,
    title: '486',
    description: 'Total Withdrawals',
  },
  
 
];


const Earning: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  const handleCardClick = (cardIndex: number) => {
    setSelectedCard(cardIndex);
  };
  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    console.log("Selected", value);
  };

  const selectOptions = [
    { value: "1", label: "week" },
    { value: "2", label: "Month" },
    { value: "3", label: "Year" },
  ];
  return (
    <div>
         <div className="bg-[#FFFFFF] p-6 rounded-xl rounded-b-none">
  
      <div className="grid grid-cols-3 gap-4  mt-[12px]">
        {cardData.map((card, index) => {
          const bgColors = [
            "bg-[#ECFDF3]",
            "bg-[#F9F5FF]",
            "bg-[#FEF3F2]",
         
          ]; // Define your background colors here
          const selectedBgColor =
            selectedCard === index
              ? "bg-[#D8F0FF]"
              : bgColors[index % bgColors.length]; // Use different bg color for each index

          return (
            <div
              key={card.id}
              className={`flex justify-between items-center rounded-2xl cursor-pointer ${selectedBgColor}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="flex gap-4 p-6 w-fit">
                <div
                  className={`bg-[#F6F6F6] px-6 py-6 rounded-xl flex items-center justify-center ${
                    selectedCard === index
                      ? "bg-white text-[#0E68E7]"
                      : "px-4 bg-[#FFFFFF]"
                  }`}
                >
                  {card.icon}
                </div>
                <div>
                  <h1 className="text-[24px] font-semibold">{card.title}</h1>
                  <p className="text-sm text-[#4E5566] font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <RevenueChart/>
    </div>
    </div>
  );
};

export default Earning;