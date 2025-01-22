import { BsStack } from "react-icons/bs"
import React, { useState } from "react"
import { Tabs, Input, Select, Button, Menu } from "antd"
import { MdDetails } from "react-icons/md"
import { FaClipboardList } from "react-icons/fa"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { GoStack } from "react-icons/go"
import { IoClipboardOutline, IoPlayCircleOutline } from "react-icons/io5"
import { PiMonitorLight } from "react-icons/pi"
import CourseDetails from "../component/dashHome/CourseDetails"
import CurriculumSection from "../component/dashHome/CurriculumSection"
import PublishCourse from "../component/dashHome/PublishCourse"
import { useGetallCategoryQuery } from "../redux/features/course/productApi"
// import { GoStack, MdDetails, FaClipboardList, AiOutlineCheckCircle } from 'react-icons/all'; // Import icons

const { TabPane } = Tabs
const { Option } = Select
type CreateNewCourseProps = {}

const CreateNewCourse: React.FC<CreateNewCourseProps> = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1">Video</Menu.Item>
      <Menu.Item key="2">Attach File</Menu.Item>
      <Menu.Item key="3">Captions</Menu.Item>
      <Menu.Item key="4">Description</Menu.Item>
      <Menu.Item key="5">Lecture Notes</Menu.Item>
    </Menu>
  )
  const { data } = useGetallCategoryQuery({ refetchOnMountOrArgChange: true })
  const [selectedkey, setSelectedkey] = React.useState("1")
  console.log('selectedkey', data?.data?.categories);

  const [formData, setFormData] = useState({
    basicInfo: {
      title: "",
      subtitle: "",
      price: "",
      platformFees: 20,
      category: "",
      subCategory: "",
      courseTopic: "",
      language: "",
    
      subtitleLanguage: "",
      lavel: "",
      duration: "",

    },

  })

  const handleChange = (e, tab = "basicInfo") => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [tab]: {
        ...prevData[tab],
        [name]: value,
      },
    }))
  }

  const handleSubmit = (e, tab) => {
    setSelectedkey('2')
    e.preventDefault()



  }

  return (
    <div>
      <div className="container mx-auto my-10">
        <Tabs defaultActiveKey={selectedkey} tabBarStyle={{ marginBottom: 32 }} >
          <TabPane
            tab={
              <span className="flex items-center gap-2 text-[#1D2939] font-semibold">
                <GoStack size={24} />
                Basic Information
              </span>
            }
            key="1"
          >
            <div className=" p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
              <form className="space-y-4" onSubmit={(e) => handleSubmit(e, "basicInfo")}>
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Your course title"
                    maxLength={80}
                    value={formData.basicInfo.title}
                    onChange={(e) => handleChange(e, "basicInfo")}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-sm font-medium mb-1">Subtitle</label>
                  <input
                    type="text"
                    name="subtitle"
                    placeholder="Your course subtitle"
                    maxLength={120}
                    value={formData.basicInfo.subtitle}
                    onChange={(e) => handleChange(e, "basicInfo")}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Pricing */}
                <div>
                  <label className="block text-sm font-medium mb-1">Pricing</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.basicInfo.price}
                    onChange={(e) => handleChange(e, "basicInfo")}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter price"
                  />
                </div>


                {/* Platform Fees */}
                <div>
                  <label className="block text-sm font-medium mb-1">Platform Fees</label>
                  <input
                    type="text"
                    name="platformFees"
                    value={formData.basicInfo.platformFees}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                  />
                </div>

                {/* Course Category and Sub-category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Course Category</label>
                    <select
                      name="category"
                      value={formData.basicInfo.category}
                      onChange={(e) => handleChange(e, "basicInfo")}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {
                        data?.data?.categories?.map((item) => (
                          <option key={item.count} value={item.courseCategory}>{item.courseCategory}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Course Sub-category</label>
                    <select
                      name="courseSubCategory"
                      value={formData.basicInfo?.courseSubCategory}
                      onChange={(e) => handleChange(e, "basicInfo")}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select...</option>
                    </select>
                  </div>
                </div>

                {/* Course Topic */}
                <div>
                  <label className="block text-sm font-medium mb-1">Course Topic</label>
                  <input
                    type="text"
                    name="courseTopic"
                    placeholder="What is primarily taught in your course?"
                    value={formData.basicInfo.courseTopic}
                    onChange={(e) => handleChange(e, "basicInfo")}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Language, Subtitle Language, Level, and Duration */}
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Select Language</label>
                    <select
                      name="language"
                      value={formData.basicInfo.language}
                      onChange={(e) => handleChange(e, "basicInfo")}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select...</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Subtitle Language (Optional)</label>
                    <select
                      name="subtitleLanguage"
                      value={formData.basicInfo.subtitleLanguage}
                      onChange={(e) => handleChange(e, "basicInfo")}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select...</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Course Level</label>
                    <select
                      name="lavel"
                      value={formData.basicInfo.lavel}
                      onChange={(e) => handleChange(e, "basicInfo")}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select...</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration</label>
                    <select
                      name="duration"
                      value={formData.basicInfo.duration}
                      onChange={(e) => handleChange(e, "basicInfo")}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Hours</option>
                    </select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                  <button type="button" className="px-6 py-2 border border-gray-300 rounded-md text-gray-700">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Save & Next
                  </button>
                </div>
              </form>
            </div>
          </TabPane>

          {/* Additional TabPanes */}
          <TabPane
            tab={
              <span className="flex items-center gap-2 text-[#1D2939] font-semibold">
                <IoClipboardOutline size={24} />
                Details
              </span>
            }
            key="2"
          >
            <div>
              <CourseDetails formData={formData?.basicInfo} handleChange={handleChange} handleSubmit={handleSubmit} />
            </div>
          </TabPane>

          


        </Tabs>
      </div>
    </div>
  )
}

export default CreateNewCourse

