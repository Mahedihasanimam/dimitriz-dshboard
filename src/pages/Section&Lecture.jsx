// pages/course.js
"use client";

import { Tabs } from "antd";
import { PiMonitorLight } from "react-icons/pi";
import { IoPlayCircleOutline } from "react-icons/io5";
import CurriculumSection from "../component/dashHome/CurriculumSection";
import PublishCourse from "../component/dashHome/PublishCourse";



const CoursePage = () => {
  // Sample form data and handlers (replace with your logic)
  const formData = {
    curriculum: {},
    publishCourse: {},
  };

  const handleChange = (e) => {
    console.log("Input Changed", e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-[#1D2939] mb-4">Add Course Sections and Lecture </h1>
      <div className="p-4">

      <Tabs  defaultActiveKey="3" className="bg-white rounded-lg shadow p-6">
        <Tabs.TabPane
          tab={
            <span className="flex items-center gap-2 text-[#1D2939] font-semibold">
              <PiMonitorLight size={24} />
              Curriculum
            </span>
          }
          key="3"
        >
          <div>
            {/* Add content for the Curriculum tab here */}
            <CurriculumSection
              formData={formData.curriculum}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <span className="flex items-center gap-2 text-[#1D2939] font-semibold">
              <IoPlayCircleOutline size={24} />
              Publish Course
            </span>
          }
          key="4"
        >
          <div>
            {/* Add content for the Publish Course tab here */}
            <PublishCourse
              formData={formData.publishCourse}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </Tabs.TabPane>
      </Tabs>
      </div>
    </div>
  );
};

export default CoursePage;
