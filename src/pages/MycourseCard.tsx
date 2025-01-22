import React, { useState } from "react";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CourseCard from "../component/mycourse/CourseCard";
import { useSelector } from "react-redux";

const { Option } = Select;

const MycourseCard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [category, setCategory] = useState("All courses");

  const user = useSelector((state: any) => state.user.user);

  const uploadedCourses = user?.uploadedCourses || [];

  // Filter and sort logic
  const filteredCourses = uploadedCourses
    .filter((course: any) => {
      // Filter by search term
      const searchMatch = course.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      // Filter by category
      const categoryMatch =
        category === "All courses" || course.category === category;
      return searchMatch && categoryMatch;
    })
    .sort((a: any, b: any) => {
      // Sort by selected criteria
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return 0;
    });

  return (
    <div className="p-4">
      {/* Search Input */}
      <div className="flex flex-wrap justify-between space-x-4">
        <div className="mb-4">
          <p className="text-[16px] font-medium text-[#344054] pb-2">Search</p>
          <Input
            className="text-[#D0D5DD] border-[1px] border-[#D0D5DD] rounded-[4px] w-[300px] h-[40px] bg-white"
            placeholder="Search your courses..."
            prefix={<SearchOutlined style={{ color: "#D0D5DD" }} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sort By Dropdown */}
        <div>
          <p className="text-[16px] font-medium text-[#344054] pb-2">Sort by</p>
          <Select
            value={sortBy}
            className="text-[#D0D5DD] border-[1px] border-[#D0D5DD] rounded-[4px] w-[300px] h-[40px] bg-white"
            onChange={(value) => setSortBy(value)}
          >
            <Option value="newest">Newest</Option>
            <Option value="oldest">Oldest</Option>
          </Select>
        </div>

        {/* Category Dropdown */}
        <div>
          <p className="text-[16px] font-medium text-[#344054] pb-2">Category</p>
          <Select
            value={category}
            className="text-[#D0D5DD] border-[1px] border-[#D0D5DD] rounded-[4px] w-[300px] h-[40px] bg-white"
            onChange={(value) => setCategory(value)}
          >
            <Option value="All courses">All courses</Option>
            <Option value="Programming">Programming</Option>
            <Option value="UI/UX Design">UI/UX Design</Option>
            <Option value="Graphic Design">Graphic Design</Option>
            <Option value="Artificial Intelligence">
              Artificial Intelligence
            </Option>
            {/* Add more categories as needed */}
          </Select>
        </div>
      </div>

      {/* Render Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course: any) => (
          <CourseCard key={course._id} data={course} />
        ))}
      </div>
    </div>
  );
};

export default MycourseCard;
