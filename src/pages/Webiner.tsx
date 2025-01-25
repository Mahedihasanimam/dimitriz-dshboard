'use client';

import React, { useState } from 'react';
import { Form, Input, DatePicker, TimePicker, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { useAddWebinerMutation } from '../redux/features/admin/dashboard';

const { TextArea } = Input;

const WebinarForm: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
const [addWebiner]=useAddWebinerMutation();
  const onFinish = async(values: any) => {
    setLoading(true);

    // Create a FormData object
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('date', values.date.format('MMMM D, YYYY')); // Formatted date
    formData.append('time', values.time.format('h:mm A'));
    formData.append('description', values.description);
    formData.append('hostName', values.hostName);
    formData.append('hostTitle', values.hostTitle);
    formData.append('webinarLink', values.webinarLink);

    if (values.promoCode) {
      formData.append('promoCode', values.promoCode);
    }

    if (fileList[0]?.originFileObj) {
      formData.append('image', fileList[0].originFileObj); // Use originFileObj
    }

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });


    const res = await addWebiner(formData);
    console.log('resp',res);
    if(res?.data?.success){
      setLoading(false);
      form.resetFields();
      setFileList([]);
      message.success('Webinar created successfully');
    }

  };

  const handleUploadChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList);
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }
      return true;
    },
    fileList,
    onChange: handleUploadChange,
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Your Webinar</h1>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Thumbnail Image */}
        <Form.Item
          label="Thumbnail Image"
          name="thumbnail"
          extra="Suggested Height: 330px Width: 545px"
          rules={[{ required: true, message: 'Please upload a thumbnail image' }]}
        >
          <Upload {...uploadProps} listType="picture-card" maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        {/* Webinar Title */}
        <Form.Item
          label="Webinar Title"
          name="title"
          rules={[{ required: true, message: 'Please enter the webinar title' }]}
        >
          <Input placeholder="e.g., Advanced JavaScript Concepts" />
        </Form.Item>

        {/* Date */}
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Please select the webinar date' }]}
        >
          <DatePicker className="w-full" format="MMMM D, YYYY" />
        </Form.Item>

        {/* Time */}
        <Form.Item
          label="Time"
          name="time"
          rules={[{ required: true, message: 'Please select the webinar time' }]}
        >
          <TimePicker className="w-full" format="h:mm A" />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter the webinar description' }]}
        >
          <TextArea placeholder="Enter webinar description..." rows={4} />
        </Form.Item>

        {/* Host Details */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Host Name"
            name="hostName"
            rules={[{ required: true, message: 'Please enter the host name' }]}
          >
            <Input placeholder="e.g., John Doe" />
          </Form.Item>

          <Form.Item
            label="Host Title"
            name="hostTitle"
            rules={[{ required: true, message: 'Please enter the host title' }]}
          >
            <Input placeholder="e.g., Senior Developer" />
          </Form.Item>
        </div>

        {/* Webinar Link */}
        <Form.Item
          label="Webinar Link"
          name="webinarLink"
          rules={[
            { required: true, message: 'Please enter the webinar link' },
            { type: 'url', message: 'Please enter a valid URL' },
          ]}
        >
          <Input placeholder="Paste your webinar link here" />
        </Form.Item>

        {/* Promo Code */}
        <Form.Item label="Promo Code" name="promoCode">
          <Input placeholder="Enter promo code" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            style={{ height: '44px', fontSize: '16px', fontWeight: 600 }}
            type="primary"
            htmlType="submit"
            // loading={loading}
            className="w-full"
          >
            Submit Webinar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WebinarForm;
