import {Button, Checkbox, Input } from "antd";
const { TextArea } = Input;
import React from "react";
import { MdEmail } from "react-icons/md";

type Props = {};

const SettingsPage = (props: Props) => {
  return (
    <div className="max-w-2xl space-y-4 border p-6 rounded-md shadow-md">
      <div className="flex gap-6 ">
        <div className="w-full" >
          <label className="block font-medium mb-1 text-[#344054]">
            First Name
          </label>
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
          />
        </div>

        <div className="w-full">
          <label className="block font-medium mb-1 text-[#344054]">
            Last Name
          </label>
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
          />
        </div>
      </div>
      <div className="flex gap-6 " >
      <div className="w-full" >
          <label className="block font-medium mb-1 text-[#344054]">
          Profession
          </label>
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
          />
      </div>
      <div className="w-full" >
          <label className="block font-medium mb-1 text-[#344054]">
          Company name
          </label>
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
          />
      </div>
      </div>
      <div className="w-full" >
          <label className="block font-medium mb-1 text-[#344054]">
         Email
          </label>
          <Input
          prefix={
            <MdEmail size={20}/>
          }
          className="w-full"
            style={{
              
              height: "44px",
              borderColor: "#D0D5DD",
              color: "#667085",
              fontSize: "16px",
              fontWeight: 400,
            }}
            placeholder="emily@gmail.com"
          />
        </div>
      <div className="w-full" >
          <label className="block font-medium mb-1 text-[#344054]">
          Message
          </label>
          <TextArea
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
            <Checkbox id="agree" className="text-[16px] font-normal text-[#475467]">
                <label htmlFor="agree">You agree to our friendly privacy policy.</label>
            </Checkbox>
        </div>
        <Input
          type="submit"
          value="Send message"
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

<div className="flex justify-end gap-4 items-center  py-6">
              <Button style={{height: '44px',fontSize: '16px', fontWeight:400}} >Cancel</Button>
              <Button style={{height: '44px',fontSize: '16px', fontWeight:400}} type="primary">Save & Next</Button>
            </div>
    </div>
  );
};

export default SettingsPage;
