'use client'

import React, { useState } from 'react'
import { Form, Input, DatePicker, TimePicker, Radio, Upload, Button, message, Image } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd/es/upload/interface'
import type { RadioChangeEvent } from 'antd'

const { TextArea } = Input
const { RangePicker } = TimePicker

interface WebinarFormData {
  title: string
  date: string
  timeRange: [string, string]
  description: string
  hostName: string
  hostTitle: string
  webinarLink: string
  pricing: string
  promoCode?: string
  thumbnail: UploadFile[]
}

const options = [
  { label: '€5 for 7 Days', value: '5' },
  { label: '€10 for 30 Days', value: '10' },
  { label: '€30 for 90 Days', value: '30' },
]

const WebinarForm: React.FC = () => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [loading, setLoading] = useState(false)

  const onFinish = (values: WebinarFormData) => {
    setLoading(true)
    console.log('Form values:', {
      ...values,
      thumbnail: fileList
    })
    
    // Simulate API call
    setTimeout(() => {
      message.success('Webinar created successfully!')
      setLoading(false)
      form.resetFields()
      setFileList([])
    }, 1500)
  }

  const handleUploadChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList)
  }

  const uploadProps = {
    beforeUpload: (file: File) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('You can only upload image files!')
        return false
      }
      return true
    },
    fileList,
    onChange: handleUploadChange,
  }

  return (
    <div className="border border-gray-300 rounded-lg bg-white">
      <div className="max-w-xl mx-auto p-[40px]">


        <h1 className="text-center text-lg font-semibold text-[#101828] mb-4">
          Create Your Webinar
        </h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            label="Webinar Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the webinar title' }]}
          >
            <Input 
              placeholder="e.g., Advanced JavaScript Concepts" 
              className="h-[44px] border-[#D0D5DD]" 
            />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select the webinar date' }]}
          >
            <DatePicker 
              className="w-full h-[44px] border-[#D0D5DD]" 
              format="MMMM D, YYYY"
            />
          </Form.Item>

          <Form.Item
            label="Time Range"
            name="timeRange"
            rules={[{ required: true, message: 'Please select the webinar time range' }]}
          >
            <RangePicker 
              className="w-full h-[44px] border-[#D0D5DD]" 
              format="h:mm A"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the webinar description' }]}
          >
            <TextArea 
              placeholder="Enter webinar description..." 
              rows={4}
              className="border-[#D0D5DD]"
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Host Name"
              name="hostName"
              rules={[{ required: true, message: 'Please enter the host name' }]}
            >
              <Input 
                placeholder="e.g., John Doe" 
                className="h-[44px] border-[#D0D5DD]" 
              />
            </Form.Item>

            <Form.Item
              label="Host Title"
              name="hostTitle"
              rules={[{ required: true, message: 'Please enter the host title' }]}
            >
              <Input 
                placeholder="e.g., Senior Developer" 
                className="h-[44px] border-[#D0D5DD]" 
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Thumbnail Image"
            name="thumbnail"
            extra="Suggested Height: 330px Width: 545px"
          >
            <Upload {...uploadProps} listType="picture-card" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Webinar Link"
            name="webinarLink"
            rules={[
              { required: true, message: 'Please enter the webinar link' },
              { type: 'url', message: 'Please enter a valid URL' }
            ]}
          >
            <Input 
              placeholder="Paste your webinar link here" 
              className="h-[44px] border-[#D0D5DD]" 
            />
          </Form.Item>

          <Form.Item
            label="Select a Plan"
            name="pricing"
            rules={[{ required: true, message: 'Please select a pricing plan' }]}
          >
            <Radio.Group
              className="w-full space-y-2"
              options={options}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>

          <Form.Item label="Promo Code" name="promoCode">
            <div className="flex gap-4">
              <Input 
                placeholder="Enter promo code" 
                className="h-[44px] border-[#D0D5DD]" 
              />
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="h-[44px] px-8"
              >
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default WebinarForm
