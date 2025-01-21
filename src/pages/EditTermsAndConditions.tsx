import { Form, Input, Button } from "antd";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import React from "react";

// Define the types for the API response
interface ApiResponse {
  data: {
    statusCode: number;
    message: string;
  };
}

// Mock data for content (replace this with real data fetching logic)
const data = {
  data: {
    attributes: {
      content: "Enter your course descriptions",
    },
  },
};

interface EditTermsAndConditionProps {
  onContentChange: (content: string) => void; // Parent callback function type
}

const EditTermsAndCondition: React.FC<EditTermsAndConditionProps> = ({ onContentChange }) => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    setContent(data?.data?.attributes?.content || "");
  }, []);

  const setData = async (newData: { content: string }): Promise<ApiResponse> => {
    // Mock API response (replace with actual API call)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            statusCode: 201,
            message: "Terms and conditions updated successfully!",
          },
        });
      }, 1000);
    });
  };

  const handleBackTermsAndCondition = () => {
    // navigate("/termsAndConditons");
  };

  const handleSave = async () => {
    // Log the content before sending it to the API
    console.log("Content before saving:", content);

    // Call setData with the updated content
    const response = await setData({ content });
    
    // After saving, log the response
    console.log("API Response:", response);
    
    // Show a success message
    if (response.data.statusCode === 201) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: response.data.message,
      });
    }

    // Send the content back to the parent component
    onContentChange(content); // This will call the parent callback function
  };

  return (
    <div className="relative bg-white p-6 rounded-md">
      <div
        onClick={handleBackTermsAndCondition}
        className="mt-[44px] cursor-pointer flex items-center pb-3 gap-2"
      >
        <MdOutlineKeyboardArrowLeft size={34} />
        <h1 className="text-[24px] font-semibold">Course Descriptions</h1>
      </div>
      <div className="text-justify mt-[24px] relative">
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => {
            setContent(newContent);
            // Use DOMParser to extract plain text
            const parser = new DOMParser();
            const doc = parser.parseFromString(newContent, "text/html");
            const plainText = doc.body.textContent || "";
            console.log("Content changed (plain text):", plainText);
            onContentChange(plainText);
          }}
          className="text-wrap bg-red-900"
        />
      </div>
      <div className="mt-4">
        <Button onClick={handleSave}>Save & Next</Button>
      </div>
    </div>
  );
};

export default EditTermsAndCondition;
