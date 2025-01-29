import { Avatar, Button, Collapse } from "antd";
const { Panel } = Collapse;

const panels = [
  { id: "01", title: "Getting started", time: "02:30 min", isVideo: true },
  { id: "02", title: "Basic Fundamental", time: "10:30 min", isVideo: true },
  { id: "03", title: "Practice Project", fileSize: "5.3 MB", isVideo: false },
  { id: "04", title: "Basic Fundamental", time: "10:30 min", isVideo: true },
  { id: "05", title: "Basic Fundamental", time: "10:30 min", isVideo: true },
  { id: "06", title: "Basic Fundamental", time: "10:30 min", isVideo: true },
];
import React from "react";
import {
  ClockCircleOutlined,
  PlayCircleOutlined,
  FolderOutlined,
  FileOutlined,
} from "@ant-design/icons";

import coursevideo from "../../../src/assets/video/7647629-hd_1920_1080_30fps.mp4";

import { DownloadCloud, File } from "lucide-react"; 
import { FcDocument } from "react-icons/fc";
import { useSelector } from "react-redux";
import { useGetSingleCourseByidQuery } from "../../redux/features/course/productApi";
import { imageUrl } from "../../redux/baseApi";

const Recordings: React.FC = () => {

const [videLink,SetselectedVideoLink]=React.useState('')
const [lectureTitle,setLectureTitle]=React.useState('')
  const user = useSelector((state: any) => state.user.user);
  console.log('lksflks', user?.enrolledCourses[0]?._id)

  const { data, isLoading } = useGetSingleCourseByidQuery(user?.enrolledCourses[0]?._id)

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  console.log('data', user)




  const handleLectureClick = (lecture : any) => {
    console.log('lecture', lecture)
    SetselectedVideoLink(lecture?.videoLink)
    setLectureTitle(lecture?.title)
  }
  return (
    <div className="bg-white p-6">
      <h1 className="text-[24px] font-bold ">{data?.data?.title}</h1>
      <div className="xl:flex justify-between gap-6 item-center justify-between mb-4 container mx-auto">
        {/* left content ---------- */}
        <div className=" w-full">
        <iframe width="560" height="315" src={videLink} title={lectureTitle} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <h1 className="text-[24px] font-bold py-4 ">{lectureTitle}</h1>

          {/* avater  */}
          <div>
            <div className="lg:flex flex-col justify-between space-x-2">

              <div>
                <p className="text-[#263238] text-[14px] font-normal flex items-center gap-2">
                  Last updated :{" "}
                  <span className="text-[#1D2939] block text-[14px] font-semibold">
                    {

                      data?.data?.updatedAt && new Date(data?.data?.updatedAt).toLocaleDateString()
                    }
                  </span>
                </p>
              </div>

             
            </div>
          </div>

          <div className="border rounded-lg xl:flex md:flex flex-wrap item-center justify-between gap-4 my-4">
            <a
              className="bg-[#F2F4F7] px-6 py-2 text-[14px] text-[#1D2939] font-semibold rounded-md flex itemcenter gap-2"
              href="#decription"
            >
              <button> Decription</button>
            </a>
            {/* <a
              className=" px-6 py-2 text-[14px] text-[#1D2939] font-semibold rounded-md flex itemcenter gap-2"
              href="#decription"
            >
              <button> Lectures Notes</button>
            </a> */}
            {/* <a
              className=" px-6 py-2 text-[14px] text-[#1D2939] font-semibold rounded-md flex itemcenter gap-2"
              href="#decription"
            >
              <button>
                {" "}
                Attach File{" "}
                <span className="bg-[#A9EBF8] rounded-sm py-1 ml-2 px-3 text-[14px]   text-[#1D2939] font-semibold">
                  01
                </span>
              </button>
            </a> */}
          </div>
          {/* decription here */}
          <div>
            <h1 className="text-[24px] font-bold py-4 ">
              Lectures Description
            </h1>
            <p className="text-[14px] font-normal leading-8">
              {
                data?.data?.description
              }
            </p>
          </div>
          {/* <div>
            <div className="flex items-center justify-between space-x-2  py-5">
              <h1 className="text-[24px] font-bold py-4 ">Lecture Notes</h1>
              <button className="bg-[#D8F0FF] text-[14px] font-semibold rounded-md px-4 py-2 text-[#1253BB] flex itemcenter gap-2">
                {" "}
                <DownloadCloud /> Download Notes
              </button>
            </div>
            <p className="text-[14px] font-normal leading-8">
              In ut aliquet ante. Curabitur mollis tincidunt turpis, sed aliquam
              mauris finibus vel. Praesent eget mi in mi maximus egestas. Mauris
              eget ipsum in justo bibendum pellentesque. Sed id arcu in arcu
              ullamcorper eleifend condimentum quis diam. Phasellus tempus, urna
              ut auctor mattis, nisi nunc tincidunt lorem, eu egestas augue
              lectus sit amet sapien. Maecenas tristique aliquet massa, a
              venenatis augue tempor in. Aliquam turpis urna, imperdiet in lacus
              a, posuere suscipit augue.
            </p>
            <p className="text-[14px] font-normal leading-8">
              Nullam non quam a lectus finibus varius nec a orci. Aliquam
              efficitur sem cursus elit efficitur lacinia
            </p>
            <ul className="text-[14px] font-normal leading-8 list-disc	pl-4">
              <li className="">
                Morbi sit amet pretium tellus. Donec blandit fermentum
                tincidunt.
              </li>
              <li>
                Proin iaculis sem et imperdiet tristique. Nam varius ac nisl id
                sodales. Donec iaculis interdum mattis.
              </li>
              <li>Curabitur posuere ultricies diam in egestas.</li>
              <li>
                Donec id diam et lacus pharetra vestibulum a id est. Mauris
                vestibulum massa quis elit feugiat, dictum maximus ipsum
                pellentesque.
              </li>
              <li>
                Sed elementum, libero id lacinia aliquet, purus nibh consectetur
                mauris, eget interdum mi lacus vitae sem.
              </li>
            </ul>

            <p className="text-[14px] font-normal leading-8 pt-4">
              Donec congue aliquam lorem nec congue. Suspendisse eu risus
              mattis, interdum ante sed, fringilla urna. Praesent mattis dictum
              sapien a lacinia. Ut scelerisque magna aliquet, blandit arcu quis,
              consequat purus. Suspendisse eget scelerisque felis. Integer
              vulputate urna laoreet purus vehicula condimentum. Donec quis
              luctus quam. Curabitur quis molestie ante. Nam pharetra sagittis
              varius. Sed ullamcorper facilisis bibendum.
            </p>

            <div id="decription" className="py-10">
              <h1 className="text-[24px]  font-bold text-[#1D2026]">
                Attach Files <span className="font-normal">(01)</span>
              </h1>
              <div className="bg-[#F5F7FA] rounded-md mt-6 p-6 xl:flex lg:flex flex-wrap item-center justify-between max-w-lg">
                <div className="flex gap-2 items-center ">
                  <FileOutlined className="text-[#475467] text-[40px]" />
                  <div>
                    <p className="text-[16px] font-medium text-[#1D2026]">
                      Create account on webflow.pdf
                    </p>
                    <p className="text-[#6E7485]">12.6 MB</p>
                  </div>
                </div>
                <div>
                  <Button size="large" type="primary">
                    {" "}
                    Download File
                  </Button>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* ritht content --------------- */}
        <div className="xl:max-w-2xl  w-full">
          {/* Course curriculum section here ------------- */}
          <div className="xl:max-w-2xl  w-full  my-12  lg:p-4 p-0">
            {/* lacture folder ----------------- */}
            <div className="flex items-center justify-between mb-4 pl-8 ">
              <div className="flex flex-wrap items-center justify-between lg:gap-6 md:gap-6 gap-1">
                <div className="lg:text-[16px] text-sm font-normal text-[#4E5566] flex items-center gap-3">
                  <FolderOutlined className="lg:text-2xl text-xl text-[#4E5566]" />{" "}
                  {data?.data?.sections?.length} Sections
                </div>
                <div className="lg:text-[16px] text-sm font-normal text-[#4E5566] flex items-center gap-3">
                  <PlayCircleOutlined className="lg:text-2xl text-xl text-[#4E5566]" />{" "}
                  {data?.data?.lectureCount} lectures
                </div>
                <div className="lg:text-[16px] text-sm font-normal text-[#4E5566] flex items-center gap-3">
                  <ClockCircleOutlined className="lg:text-2xl text-xl text-[#4E5566]" />{" "}
                  {data?.data?.duration} hours
                </div>
              </div>
            </div>

           



            <div className="mx-auto bg-[#F2F4F7] rounded-md lg:p-4 md:p-4 p-0 border-none">
              <Collapse
                defaultActiveKey={["1"]}
                accordion
                expandIconPosition="right"
                className="bg-[#F2F4F7] rounded-lg border-none"
              >
                {data?.data?.sections?.map((section, index) => (
                  <Panel
                    header={
                      <div>
                        <div className="text-lg font-semibold text-[#475467]">
                          {section.title}
                        </div>
                        <div className="text-xs text-[#98A2B3] font-normal">
                          {`${section.lectureCount} Lectures • ${section.totalDuration} Minutes`}
                        </div>
                      </div>
                    }
                    key={index + 1}
                    className="mb-2 bg-transparent"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <div className="space-y-3 cursor-pointer">
                      {section.lectures?.map((lecture, lectureIndex) => (
                        <div
                          onClick={() => handleLectureClick(lecture)}
                          key={lectureIndex}
                          className="flex justify-between items-center p-4 bg-white rounded-lg shadow mb-4"
                        >
                          <div className="flex items-center">
                            <div className="bg-[#F2F4F7] text-[#475467] w-10 h-10 rounded-lg flex items-center justify-center mr-4 font-bold">
                              {lectureIndex + 1}
                            </div>
                            <div>
                              <p className="font-semibold text-[#475467] text-[16px]">
                                {lecture.title || `Lecture ${lectureIndex + 1}`}
                              </p>
                              <p className="text-sm text-[#98A2B3]">
                                {lecture.videoUrl ? lecture.time : lecture.fileSize}
                              </p>
                              <p className="text-[#98A2B3] flex items-center space-x-2">
                                <svg width="12.000000" height="12.000000" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                  <desc>
                                    Created with Pixso.
                                  </desc>
                                  <defs>
                                    <clipPath id="clip56_77420">
                                      <rect id="clock" rx="0.000000" width="11.000000" height="11.000000" transform="translate(0.500000 0.500000)" fill="white" fill-opacity="0" />
                                    </clipPath>
                                  </defs>
                                  <g clip-path="url(#clip56_77420)">
                                    <path id="Icon" d="M6 11C3.23 11 1 8.76 1 6C1 3.23 3.23 1 6 1C8.76 1 11 3.23 11 6C11 8.76 8.76 11 6 11ZM6 3L6 6L8 7" stroke="#98A2B3" stroke-opacity="1.000000" stroke-width="1.000000" stroke-linejoin="round" stroke-linecap="round" />
                                  </g>
                                </svg>
                                <span>
                                  {lecture.videoUrl ? lecture.duration : lecture.fileSize} m
                                </span>

                              </p>
                            </div>
                          </div>
                          <div>
                            {lecture.videoUrl ? (
                              <PlayCircleOutlined className="text-[#14698A] text-2xl" />
                            ) : (
                              <FileOutlined className="text-[#14698A] text-2xl" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Panel>
                ))}
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recordings;
