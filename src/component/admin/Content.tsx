'use client';

import React, { useState } from 'react';
import { MoreHorizontal, Pencil, Search, Trash } from 'lucide-react';
import { Input, Select, Table, Checkbox, Dropdown, Menu, Button, message, Modal } from 'antd';
import { useApproveCourseMutation, useDelteCourseMutation, useGetallcourseQuery } from '../../redux/features/course/productApi';

const { Option } = Select;

interface Course {
  _id: string;
  title: string;
  instructor: {
    name: string;
    email: string;
    role: string[];
    instructorApplicationStatus: string;
  };
  status: string;
  category: string;
}

export default function CourseTable() {
  const { data, isLoading, error } = useGetallcourseQuery();
  const courses = data?.data?.result || [];

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [ deleteCourse]=useDelteCourseMutation();
  const [ approveCourse]=useApproveCourseMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');

  const filteredUsers = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || course.category === category;
    const matchesStatus = status === 'all' || course.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((course) => course._id));
    }
  };

  const toggleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleDeleteUser = async(userId: string) => {
    // Handle user deletion logic here
    console.log('Deleting user with ID:', userId);
  const res= await  deleteCourse(userId);

  if(res?.data?.success){
      message.success('Course deleted successfully');
  }
  };

  const handleApproveCourse = async () => {
    try {
      const res = await approveCourse(selectedCourseId);
      console.log('res',res)
      if (res?.data?.success) {
        message.success('Course approved successfully');
        setIsModalOpen(false);
      }
    } catch (error) {
      message.error('Failed to approve course');
    }
  };


  const columns = [
    {
      title: (
        <Checkbox
          checked={selectedUsers.length === filteredUsers.length}
          onChange={toggleSelectAll}
        />
      ),
      dataIndex: '_id',
      render: (id: string) => (
        <Checkbox
          checked={selectedUsers.includes(id)}
          onChange={() => toggleSelectUser(id)}
        />
      ),
    },
    {
      title: 'Company',
      dataIndex: 'instructor',
      render: (_: any, record: Course) => (
        <div className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <img
              className="aspect-square h-full w-full"
              alt={record.instructor.name}
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${record.instructor.name}`}
            />
          </span>
          <div>
            <div className="font-medium">{record.instructor.name}</div>
            <div className="text-sm text-muted-foreground">{record.instructor.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: ['instructor', 'role'],
      render: (roles: string[]) => roles?.[0] || 'N/A',
    },
    {
      title: 'Requested for review',
      dataIndex: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            status === 'approved'
              ? 'bg-green-50 text-green-700'
              : 'bg-yellow-50 text-[#B42318]'
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, record: Course) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item 
                key="edit" 
                icon={<Pencil className="mr-2 h-4 w-4" />}
                onClick={() => {
                  setSelectedCourseId(record._id);
                  setIsModalOpen(true);
                }}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                onClick={() => handleDeleteUser(record._id)}
                key="delete"
                danger
                icon={<Trash className="mr-2 h-4 w-4" />}
              >
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button icon={<MoreHorizontal />} />
        </Dropdown>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading courses</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
          prefix={<Search className="h-4 w-4 opacity-50" />}
        />
        <Select value={sortBy} onChange={(value) => setSortBy(value)} className="w-32">
          <Option value="latest">Latest</Option>
          <Option value="oldest">Oldest</Option>
        </Select>
        <Select value={category} onChange={(value) => setCategory(value)} className="w-40">
          <Option value="all">All category</Option>
          <Option value="design">Design</Option>
          <Option value="development">Development</Option>
        </Select>
        <Select value={status} onChange={(value) => setStatus(value)} className="w-32">
          <Option value="all">All</Option>
          <Option value="approved">Approved</Option>
          <Option value="pending">Pending</Option>
        </Select>
      </div>

      <div className="rounded-lg border">
        <div className="flex items-center gap-2 p-4">
          <h2 className="text-base font-semibold">Total Courses</h2>
          <span className="rounded bg-blue-50 px-2 text-sm text-blue-700">
            {filteredUsers.length} Courses
          </span>
        </div>
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="_id"
          pagination={{
            total: filteredUsers.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`
          }}
        />
      </div>
      <Modal
        title={
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3L4.5 8.5L2 6" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span>Publish course</span>
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button 
            key="approve" 
            type="primary" 
            onClick={handleApproveCourse}
            className="bg-blue-600"
          >
            Approve
          </Button>
        ]}
      >
        <p className="text-gray-500">This blog post has not been published yet. It will be live while approve</p>
      </Modal>
    </div>
  );
}

