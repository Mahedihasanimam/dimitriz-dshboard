import { Button, Input, UploadProps, message } from "antd";
import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { Upload } from "antd";
import { Image } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useUpdateOwnProfileMutation } from "../redux/features/admin/userSlice";

type Props = {};
const props: UploadProps = {
  name: "file",
  multiple: false,
  
  onChange(info) {
    const { status } = info.file;
    console
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const SettingsPage = (props: Props) => {
  // State variables for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [fileList, setFileList] = useState<any[]>([]);
const [ updateProfile]=useUpdateOwnProfileMutation();
  // Function to handle logging all values
  const handleLogValues = async(e: React.FormEvent) => {

    

    e.preventDefault();  // Prevent page reload
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("profession", profession);
    formData.append("companyName", companyName);
    formData.append("email", email);

    formData.append('image', fileList[0].originFileObj);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
   formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });



    try {
      
      const response = await updateProfile(formData)
      console.log(response);
      if(response?.data?.success){

        message.success('Profile updated successfully');
        setFirstName('');
        setLastName('');
        setProfession('');
        setCompanyName('');
        setEmail('');
      }

    } catch (error) {
      message.error('Failed to update profile');
    }

  };
  return (
    <div className="max-w-2xl space-y-4 border p-6 rounded-md shadow-md">
      <div className="flex gap-6 ">
        <div className="w-full">
          <label className="block font-medium mb-1 text-[#344054]">First Name</label>
          <Input
            className="w-full"
            style={{
              height: "44px",
              borderColor: "#D0D5DD",
              color: "#667085",
              fontSize: "16px",
              fontWeight: 400,
            }}
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="w-full">
          <label className="block font-medium mb-1 text-[#344054]">Last Name</label>
          <Input
            className="w-full"
            style={{
              height: "44px",
              borderColor: "#D0D5DD",
              color: "#667085",
              fontSize: "16px",
              fontWeight: 400,
            }}
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-6 ">
        <div className="w-full">
          <label className="block font-medium mb-1 text-[#344054]">Profession</label>
          <Input
            className="w-full"
            style={{
              height: "44px",
              borderColor: "#D0D5DD",
              color: "#667085",
              fontSize: "16px",
              fontWeight: 400,
            }}
            placeholder="Lead UX"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label className="block font-medium mb-1 text-[#344054]">Company name</label>
          <Input
            className="w-full"
            style={{
              height: "44px",
              borderColor: "#D0D5DD",
              color: "#667085",
              fontSize: "16px",
              fontWeight: 400,
            }}
            placeholder="Google"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full">
        <label className="block font-medium mb-1 text-[#344054]">Email</label>
        <Input
          prefix={<MdEmail size={20} />}
          className="w-full"
          style={{
            height: "44px",
            borderColor: "#D0D5DD",
            color: "#667085",
            fontSize: "16px",
            fontWeight: 400,
          }}
          placeholder="emily@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="w-full flex gap-6 pt-6">
       

        <div className="w-full">
          <Dragger
            {...props}
            onChange={(info) => setFileList(info.fileList)}
          >
            <p className="ant-upload-text text-[#1253BB] text-xl">Click to upload</p>
            <p className="ant-upload-hint">
              or Drag and drop a
              <span>SVG, PNG, JPG or GIF (max. 800x400px)</span>
            </p>
          </Dragger>
        </div>
      </div>

      <div className="flex justify-end gap-4 items-center py-6">
        <Button style={{ height: "44px", fontSize: "16px", fontWeight: 400 }}>Cancel</Button>
        <Button
          style={{ height: "44px", fontSize: "16px", fontWeight: 400 }}
          type="primary"
          onClick={handleLogValues}  // Calling the handleLogValues function on click
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
