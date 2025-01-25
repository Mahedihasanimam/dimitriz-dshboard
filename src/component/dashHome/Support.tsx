import { Checkbox, Input, message } from "antd";
import React, { useState } from "react";
import { useSupportMutation } from "../../redux/features/admin/dashboard";
import { useNavigate } from 'react-router-dom';
const { TextArea } = Input;

type Props = {};

const Support = (props: Props) => {
  const navigate = useNavigate();

  const [Support]=useSupportMutation();
  // State to manage form values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
    agree: false,
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      agree: checked,
    }));
  };

  // Handle form submission
  const handleSubmit = async() => {
    console.log("Form Data:", formData);

    const res=await Support(formData);
    if(res?.data?.success){
      message.success('Email sent successfully');
      navigate('/');

    }




    console.log('respons',res);
  };

  return (
    <div className="max-w-2xl space-y-4">
      <div className="w-full">
        <label className="block font-medium mb-1 text-[#344054]">Name</label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full"
          style={{
            height: "44px",
            borderColor: "#D0D5DD",
            color: "#667085",
            fontSize: "16px",
            fontWeight: 400,
          }}
          placeholder="Full Name"
        />
      </div>

      <div className="w-full">
        <label className="block font-medium mb-1 text-[#344054]">Email</label>
        <Input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full"
          style={{
            height: "44px",
            borderColor: "#D0D5DD",
            color: "#667085",
            fontSize: "16px",
            fontWeight: 400,
          }}
          placeholder="you@company.com"
        />
      </div>

      <div className="w-full">
        <label className="block font-medium mb-1 text-[#344054]">Phone number</label>
        <Input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="w-full"
          style={{
            height: "44px",
            borderColor: "#D0D5DD",
            color: "#667085",
            fontSize: "16px",
            fontWeight: 400,
          }}
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div className="w-full">
        <label className="block font-medium mb-1 text-[#344054]">Message</label>
        <TextArea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          className="w-full"
          style={{
            height: "128px",
            borderColor: "#D0D5DD",
            color: "#667085",
            fontSize: "16px",
            fontWeight: 400,
          }}
        />
      </div>

      <div>
        <Checkbox
          id="agree"
          checked={formData.agree}
          onChange={handleCheckboxChange}
          className="text-[16px] font-normal text-[#475467]"
        >
          <label htmlFor="agree">You agree to our friendly privacy policy.</label>
        </Checkbox>
      </div>

      <Input
        type="button"
        value="Send message"
        onClick={handleSubmit}
        style={{
          backgroundColor: "#0E68E7",
          color: "#FFFFFF",
          height: "44px",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "16px",
          width: "100%",
          marginTop: "24px",
        }}
      />
    </div>
  );
};

export default Support;
