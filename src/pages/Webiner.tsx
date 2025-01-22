'use client'

import React, { useState } from 'react'
import { Form, Input, DatePicker, TimePicker, Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd/es/upload/interface'

const { TextArea } = Input

interface WebinarFormData {
  title: string
  date: string
  time: string
  description: string
  hostName: string
  hostTitle: string
  webinarLink: string
  promoCode?: string
  thumbnail: UploadFile[]
}

const WebinarForm: React.FC = () => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [loading, setLoading] = useState(false)

  const onFinish = (values: WebinarFormData) => {
    setLoading(true)
    console.log('Form values:', {
      ...values,
      thumbnail: fileList,
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
            <Button icon={<svg width="48.000000" height="48.000000" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<desc>
			Created with Pixso.
	</desc>
	<defs>
		<filter id="filter_82_83559_dd" x="0.000000" y="0.000000" width="48.000000" height="48.000000" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
			<feFlood flood-opacity="0" result="BackgroundImageFix"/>
			<feGaussianBlur in="BackgroundImage" stdDeviation="2.66667"/>
			<feComposite in2="SourceAlpha" operator="in" result="effect_backgroundBlur_1"/>
			<feBlend mode="normal" in="SourceGraphic" in2="effect_backgroundBlur_1" result="shape"/>
		</filter>
		<clipPath id="clip82_83560">
			<rect id="upload-cloud" rx="0.000000" width="23.000000" height="23.000000" transform="translate(12.500000 12.500000)" fill="white" fill-opacity="0"/>
		</clipPath>
	</defs>
	<g filter="url(#filter_82_83559_dd)" >
		<rect id="Featured icon" rx="23.500000" width="47.000000" height="47.000000" transform="translate(0.500000 0.500000)" fill="#344054" fill-opacity="0.400000"/>
		<g clip-path="url(#clip82_83560)">
			<path id="Icon" d="M27.99 28L23.99 24L19.99 28M23.99 24L23.99 33M32.38 30.39C33.36 29.85 34.13 29.01 34.57 27.99C35.01 26.98 35.11 25.84 34.83 24.76C34.56 23.69 33.94 22.73 33.06 22.05C32.18 21.37 31.1 21 29.99 21L28.73 21C28.43 19.82 27.87 18.74 27.08 17.82C26.3 16.89 25.32 16.16 24.21 15.68C23.1 15.19 21.9 14.96 20.69 15C19.48 15.05 18.3 15.37 17.23 15.93C16.17 16.5 15.24 17.3 14.53 18.28C13.82 19.26 13.33 20.38 13.12 21.57C12.9 22.76 12.96 23.98 13.28 25.15C13.61 26.31 14.19 27.39 14.99 28.3" stroke="#FFFFFF" stroke-opacity="1.000000" stroke-width="2.000000" stroke-linejoin="round" stroke-linecap="round"/>
		</g>
	</g>
</svg>
}></Button>
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
          <Button style={{height: '44px',fontSize: '16px',fontWeight: 600}} type="primary" htmlType="submit" loading={loading} className="w-full">
            Submit Webinar
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default WebinarForm
