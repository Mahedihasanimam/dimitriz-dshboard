"use client";

import { Badge, Tabs } from "antd";
import { PiMonitorLight } from "react-icons/pi";
import { IoPlayCircleOutline } from "react-icons/io5";
import CurriculumSection from "../component/dashHome/CurriculumSection";
import PublishCourse from "../component/dashHome/PublishCourse";
import { useParams } from "react-router-dom";
import { useGetSectionbyCourseIdQuery } from "../redux/features/course/productApi";

const CoursePage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSectionbyCourseIdQuery(id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const sections = data?.data?.sections || [];

  console.log("section---------------------------", data);

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
      <h1 className="text-2xl font-bold text-[#1D2939] mb-4">
        Add Course Sections and Lecture
      </h1>
      <div className="p-4">
        <Tabs defaultActiveKey="3" className="bg-white rounded-lg shadow p-6">
          {/* Curriculum Tab */}
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
              <h2 className="text-lg font-bold text-[#1D2939] mb-4">Sections</h2>
              {sections.length > 0 ? (
                sections.map((section,idx) => (
                  <div
                    key={section._id}
                    className="mb-4 p-4 border border-gray-200 rounded-md"
                  >
                  <span className="text-sm text-gray-500 bg-[#E9EAF0] py-1 px-2 ">sections {idx+1}</span>
                    <h3 className="text-md font-semibold text-[#1D2939]">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      section ID: {section._id}
                    </p>
                    <p className="text-sm text-gray-500">
                      Lectures: {section.lectures.length}
                    </p> 
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No sections available.</p>
              )}
            </div>
            <CurriculumSection
            id={id}
              formData={formData.curriculum}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Tabs.TabPane>

          {/* Publish Course Tab */}
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
