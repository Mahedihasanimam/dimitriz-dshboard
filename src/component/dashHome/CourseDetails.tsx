import React, { useState } from "react";
import { Upload, Button, Input, Typography, message } from "antd";
import { UploadOutlined, VideoCameraOutlined } from "@ant-design/icons";
import EditTermsAndCondition from "../../pages/EditTermsAndConditions";

const { TextArea } = Input;
const { Paragraph } = Typography;
const MAX_FIELDS = 8;
const MAX_CHARACTERS = 120;

const CourseDetails: React.FC = ({ formData }: any) => {

  
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [prevthumbnail, prevsetThumbnail] = useState<string | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [prevVideo, setprevVideo] = useState<string | null>(null);
  const [teachingMaterials, setteachingMaterials] = useState(Array(4).fill(""));
  const [targetAudience, settargetAudience] = useState(Array(4).fill(""));
  const [requirements, setrequirements] = useState(Array(4).fill(""));
  const [contentData, setContentData] = useState<string>("");
  // Helper function to handle image preview
  const handlePreviewImage = (file: File) => {
    console.log(file);
    setThumbnail(file)
    const reader = new FileReader();
    reader.onload = () => {
      prevsetThumbnail(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Helper function to handle video preview
  const handlePreviewVideo = (file: File) => {
    setVideo(file)
    const reader = new FileReader();
    reader.onload = () => {
      setprevVideo(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddField = () => {
    if (teachingMaterials.length < MAX_FIELDS) {
      setteachingMaterials([...teachingMaterials, ""]);
    }
  };

  const handleInputChange = (index, value) => {
    const newteachingMaterials = [...teachingMaterials];
    newteachingMaterials[index] = value;
    setteachingMaterials(newteachingMaterials);
  };

  const handleAddField2 = () => {
    if (targetAudience.length < MAX_FIELDS) {
      settargetAudience([...targetAudience, ""]);
    }
  };

  const handleInputChange2 = (index, value) => {
    const newteachingMaterials = [...targetAudience];
    newteachingMaterials[index] = value;
    settargetAudience(newteachingMaterials);
  };

  const handleAddField3 = () => {
    if (requirements.length < MAX_FIELDS) {
      setrequirements([...requirements, ""]);
    }
  };

  const handleInputChange3 = (index, value) => {
    const newteachingMaterials = [...requirements];
    newteachingMaterials[index] = value;
    setrequirements(newteachingMaterials);
  };


  // Callback function to receive the data from the child
  const handleContentChange = (content: string) => {
    console.log("Received content from child:", content);
    setContentData(content);
  };
  // Function to count the number of words in a string
  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };
  const handleSaveAndNext = () => {
    const courseData = {
      image:thumbnail,
      videoFile:video,
      teachingMaterials,
      targetAudience,
      requirements
    };
  
    // Create a new object to log each field's name and value in the required format
    const formattedData = {
      ...formData,
      thumbnail: thumbnail,
      video: video,
      "teachingMaterials": teachingMaterials,
      "targetAudience": targetAudience,
      "requirements": requirements,
      'decription':contentData
    };
   
    // Log the formatted data object
    console.log("All course data:", formattedData);
  };
  

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Course Thumbnail Preview */}
        <div className="flex gap-4 items-center border p-4 rounded-md w-full">
          {prevthumbnail ? (
            <img
              src={prevthumbnail}
              alt="Course Thumbnail"
              className="w-full h-48 object-cover rounded-md"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md">
              <span className="text-gray-500">No image uploaded</span>
            </div>
          )}
          <div className="flex flex-col items-center">
            <Paragraph className="mt-4 text-center">
              Upload your course thumbnail (1200x800 pixels, .jpg, .jpeg, or
              .png).
            </Paragraph>
            <Upload
              beforeUpload={(file) => {
                handlePreviewImage(file);
                return false; // Prevent auto-upload
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />} className="bg-gray-200 mt-4">
                Upload image
              </Button>
            </Upload>
          </div>
        </div>

        {/* Course Trailer Preview or Placeholder */}
        <div className="flex  items-center border p-4 rounded-md gap-4 w-full">
          {prevVideo ? (
            <video
              src={prevVideo}
              controls
              className="w-full h-48 object-cover rounded-md"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md">
              <span className="text-gray-500">No video uploaded</span>
            </div>
          )}
          <div className="flex flex-col items-center">
            <Paragraph className="mt-4 text-center">
              Great promo videos boost enrollment by 5X, and exceptional ones
              can increase it to 10X.
            </Paragraph>
            <Upload
              beforeUpload={(file) => {
                handlePreviewVideo(file);
                return false; // Prevent auto-upload
              }}
              showUploadList={false}
            >
              <Button
                icon={<VideoCameraOutlined />}
                className="bg-gray-200 mt-4"
              >
                Upload Video
              </Button>
            </Upload>
          </div>
        </div>
      </div>

      {/* Course Descriptions */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Course Descriptions</h3>

        <EditTermsAndCondition onContentChange={handleContentChange} />
        <div className="p-4">
          {/* Header with Flexbox */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">
              What you will teach in this course ({teachingMaterials.length}/
              {MAX_FIELDS})
            </h3>
            {teachingMaterials.length < MAX_FIELDS && (
              <Button onClick={handleAddField} type="primary">
                + Add new
              </Button>
            )}
          </div>

          {/* Input Fields */}
          {teachingMaterials.map((field, index) => {
            const charCount = field.length; // Count characters in the current input field
            return (
              <div key={index} className="mb-4">
                <label className="text-sm text-[#344054] font-medium">
                  0{index + 1}
                </label>
                <Input
                name="courseDescription"
                  style={{
                    width: "100%",
                    height: "44px",
                    borderColor: "#D0D5DD",
                    color: "#667085",
                    fontSize: "16px",
                    fontWeight: 400,
                  }}
                  value={field}
                  placeholder={`What you will teach in this course...`}
                  maxLength={MAX_CHARACTERS} // Limit the input to 120 characters
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
                <p className="text-right text-gray-500 text-sm">
                  {charCount}/{MAX_CHARACTERS} characters
                </p>
              </div>
            );
          })}
        </div>

        <div className="p-4">
          {/* Header with Flexbox */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">
              Target Audience ({targetAudience.length}/{MAX_FIELDS})
            </h3>
            {targetAudience.length < MAX_FIELDS && (
              <Button onClick={handleAddField2} type="primary">
                + Add new
              </Button>
            )}
          </div>

          {/* Input Fields */}
          {targetAudience.map((field, index) => {
            const charCount = field.length; // Count characters in the current input field
            return (
              <div key={index} className="mb-4">
                <label className="text-sm text-[#344054] font-medium">
                  0{index + 1}
                </label>
                <Input
                  style={{
                    width: "100%",
                    height: "44px",
                    borderColor: "#D0D5DD",
                    color: "#667085",
                    fontSize: "16px",
                    fontWeight: 400,
                  }}
                  value={field}
                  placeholder={`Who this course is for...`}
                  maxLength={MAX_CHARACTERS} // Limit the input to 120 characters
                  onChange={(e) => handleInputChange2(index, e.target.value)}
                />
                <p className="text-right text-gray-500 text-sm">
                  {charCount}/{MAX_CHARACTERS} characters
                </p>
              </div>
            );
          })}
        </div>
        <div className="p-4">
          {/* Header with Flexbox */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">
              Course Requirements ({requirements.length}/{MAX_FIELDS})
            </h3>
            {requirements.length < MAX_FIELDS && (
              <Button onClick={handleAddField3} type="primary">
                + Add new
              </Button>
            )}
          </div>

          {/* Input Fields */}
          {requirements.map((field, index) => {
            const charCount = field.length; // Count characters in the current input field
            return (
              <div key={index} className="mb-4">
                <label className="text-sm text-[#344054] font-medium">
                  0{index + 1}
                </label>
                <Input
                  style={{
                    width: "100%",
                    height: "44px",
                    borderColor: "#D0D5DD",
                    color: "#667085",
                    fontSize: "16px",
                    fontWeight: 400,
                  }}
                  value={field}
                  placeholder={`Prerequisites for this course...`}
                  maxLength={MAX_CHARACTERS} // Limit the input to 120 characters
                  onChange={(e) => handleInputChange3(index, e.target.value)}
                />
                <p className="text-right text-gray-500 text-sm">
                  {charCount}/{MAX_CHARACTERS} characters
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save and Next Button */}
      <Button
        type="primary"
        onClick={handleSaveAndNext}
        className="w-full mt-8 h-[44px] text-lg font-semibold"
      >
       Publish Course
      </Button>
    </div>
  );
};

export default CourseDetails;
