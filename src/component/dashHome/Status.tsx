import React, { useState } from "react";
import SelectBox from "../share/SelectBox";
import { HiMiniUsers } from "react-icons/hi2";
import { FaArrowTrendUp, FaUser } from "react-icons/fa6";
import { SiCoursera, SiPaypal } from "react-icons/si";
import { FcComboChart, FcDocument } from "react-icons/fc";

// import { useGetAllStatusApiQuery } from "../redux/Features/getAllStatusApi";
import { PlayCircleOutlined } from "@ant-design/icons";
import { DiStackoverflow } from "react-icons/di";
import { GrDocumentVerified } from "react-icons/gr";
import { CiCreditCard1, CiTrophy } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { BsStack } from "react-icons/bs";
import { IoIosTrophy } from "react-icons/io";
import { useSelector } from "react-redux";
import { useGetcoursebyInstructorIdQuery } from "../../redux/features/course/productApi";
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
    icon: <PlayCircleOutlined style={{ fontSize: "30px", color: "#0E68E7" }} />,
    title: "684",
    description: "Enrolled Courses",
  },
  {
    id: 2,
    icon: <GrDocumentVerified style={{ fontSize: "30px", color: "#7F56D9" }} />,
    title: "03",
    description: "Active course",
  },
  {
    id: 3,
    icon: <IoIosTrophy style={{ fontSize: "30px", color: "#039855" }} />,
    title: "486",
    description: "Completed Courses",
  },
  {
    id: 4,
    icon: <FaRegUserCircle style={{ fontSize: "30px", color: "#D92D20" }} />,
    title: "47,684",
    description: "Students",
  },
  {
    id: 5,
    icon: <BsStack style={{ fontSize: "30px", color: "#F79009" }} />,
    title: "24,996",
    description: "Total Course Sold",
  },
  {
    id: 6,

    title: "€7,461,767.00",
    description: "USD Total Earning",
  },
];

const Status: React.FC = () => {

  const user = useSelector((state: any) => state.user.user);
  const { data: ratingData } = useGetcoursebyInstructorIdQuery(user?._id);
  console.log('status', ratingData?.data);


  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  const handleCardClick = (cardIndex: number) => {
    setSelectedCard(cardIndex);
  };
  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    console.log("Selected", value);
  };

  return (
    <div className="bg-[#FFFFFF] p-6 rounded-xl rounded-b-none">
      <div className="flex justify-between w-full">
        <div className="pr-8">

        </div>
      </div>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4  mt-[12px]">


        <div

          className={`flex justify-between items-center rounded-2xl cursor-pointer bg-[#FFFAEB] `}

        >
          <div className="flex gap-4 p-6 w-fit">
            <div
              className={``}>
              <svg width="60.000000" height="60.000000" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <desc>
                  Created with Pixso.
                </desc>
                <defs />
                <rect id="Frame 323" rx="7.500000" width="59.000000" height="59.000000" transform="translate(0.500000 0.500000)" fill="#FFFFFF" fill-opacity="1.000000" />
                <rect id="Stack" rx="0.000000" width="31.000000" height="31.000000" transform="translate(14.500000 14.500000)" fill="#FFFFFF" fill-opacity="0" />
                <g opacity="0.200000">
                  <path id="Vector" d="M18 24L30 31L42 24L30 17L18 24Z" fill="#F79009" fill-opacity="1.000000" fill-rule="nonzero" />
                </g>
                <path id="Vector" d="M18 36L30 43L42 36" stroke="#F79009" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" stroke-linecap="round" />
                <path id="Vector" d="M18 30L30 37L42 30" stroke="#F79009" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" stroke-linecap="round" />
                <path id="Vector" d="M30 31L42 24L30 17L18 24L30 31Z" stroke="#F79009" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" />
              </svg>


            </div>
            <div>
              <h1 className="text-[24px] font-semibold">{ratingData?.data?.totalCourses}</h1>
              <p className="text-[16px] text-[#4E5566] font-normal">
                totalCourses
              </p>
            </div>
          </div>
        </div>




        <div

          className={`flex justify-between items-center rounded-2xl cursor-pointer bg-[#FEF3F2] `}

        >
          <div className="flex gap-4 p-6 w-fit">
            <div
              className={``}>
              <svg width="60.000000" height="60.000000" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <desc>
                  Created with Pixso.
                </desc>
                <defs />
                <rect id="Frame 322" rx="7.500000" width="59.000000" height="59.000000" transform="translate(0.500000 0.500000)" fill="#FFFFFF" fill-opacity="1.000000" />
                <rect id="UserCircle" rx="0.000000" width="31.000000" height="31.000000" transform="translate(14.500000 14.500000)" fill="#FFFFFF" fill-opacity="0" />
                <g opacity="0.200000">
                  <path id="Vector" d="M30 18C27.57 18 25.2 18.73 23.2 20.11C21.2 21.48 19.66 23.43 18.79 25.7C17.92 27.96 17.76 30.44 18.33 32.8C18.89 35.16 20.17 37.29 21.97 38.92L21.97 38.92C22.72 37.44 23.87 36.19 25.29 35.32C26.71 34.45 28.33 33.99 30 34C29.01 34 28.04 33.7 27.22 33.15C26.39 32.6 25.75 31.82 25.37 30.91C25 29.99 24.9 28.99 25.09 28.02C25.28 27.05 25.76 26.16 26.46 25.46C27.16 24.76 28.05 24.28 29.02 24.09C29.99 23.9 31 24 31.91 24.38C32.82 24.75 33.6 25.39 34.15 26.22C34.7 27.04 35 28.01 35 29C35 30.32 34.47 31.59 33.53 32.53C32.59 33.47 31.32 34 30 34C31.66 33.99 33.28 34.45 34.7 35.32C36.12 36.19 37.27 37.44 38.02 38.92C39.82 37.29 41.1 35.16 41.66 32.8C42.23 30.44 42.07 27.96 41.2 25.7C40.33 23.43 38.79 21.48 36.79 20.11C34.79 18.73 32.42 18 30 18Z" fill="#D92D20" fill-opacity="1.000000" fill-rule="nonzero" />
                </g>
                <path id="Vector" d="M30 42C23.37 42 18 36.62 18 30C18 23.37 23.37 18 30 18C36.62 18 42 23.37 42 30C42 36.62 36.62 42 30 42Z" stroke="#D92D20" stroke-opacity="1.000000" stroke-width="2.000000" />
                <path id="Vector" d="M30 34C27.23 34 25 31.76 25 29C25 26.23 27.23 24 30 24C32.76 24 35 26.23 35 29C35 31.76 32.76 34 30 34Z" stroke="#D92D20" stroke-opacity="1.000000" stroke-width="2.000000" />
                <path id="Vector" d="M21.97 38.92C22.73 37.44 23.87 36.19 25.29 35.32C26.71 34.45 28.33 34 30 34C31.66 34 33.29 34.45 34.7 35.32C36.12 36.19 37.27 37.44 38.02 38.92" stroke="#D92D20" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" stroke-linecap="round" />
              </svg>

            </div>
            <div>
              <h1 className="text-[24px] font-semibold">{ratingData?.data?.totalEnrolledStudents}</h1>
              <p className="text-[16px] text-[#4E5566] font-normal">
                totalEnrolledStudents
              </p>
            </div>
          </div>
        </div>

        <div

          className={`flex justify-between items-center rounded-2xl cursor-pointer bg-[#F9F5FF] `}

        >
          <div className="flex gap-4 p-6 w-fit">
            <div
              className={``}>
              <svg width="60.000000" height="60.000000" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <desc>
                  Created with Pixso.
                </desc>
                <defs />
                <rect id="Frame 323" rx="7.500000" width="59.000000" height="59.000000" transform="translate(0.500000 0.500000)" fill="#FFFFFF" fill-opacity="1.000000" />
                <rect id="CheckSquareOffset" rx="0.000000" width="31.000000" height="31.000000" transform="translate(14.500000 14.500000)" fill="#FFFFFF" fill-opacity="0" />
                <g opacity="0.200000">
                  <path id="Vector" d="M19.5 19.5L19.5 38.5L21.5 40.5L40.5 40.5L40.5 19.5L19.5 19.5Z" fill="#7F56D9" fill-opacity="1.000000" fill-rule="nonzero" />
                </g>
                <path id="Vector" d="M19.5 31.9L19.5 20.5C19.5 20.23 19.6 19.98 19.79 19.79C19.98 19.6 20.23 19.5 20.5 19.5L39.5 19.5C39.76 19.5 40.01 19.6 40.2 19.79C40.39 19.98 40.5 20.23 40.5 20.5L40.5 39.5C40.5 39.76 40.39 40.01 40.2 40.2C40.01 40.39 39.76 40.5 39.5 40.5L30.95 40.5" stroke="#7F56D9" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" stroke-linecap="round" />
                <path id="Vector" d="M30 33L22 41L18 37" stroke="#7F56D9" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" stroke-linecap="round" />
              </svg>


            </div>
            <div>
              <h1 className="text-[24px] font-semibold">{ratingData?.data?.coursesWithEnrolledStudents}</h1>
              <p className="text-[16px] text-[#4E5566] font-normal">
                coursesWithEnrolledStudents
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Status;
