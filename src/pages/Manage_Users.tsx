'use client';

import React, { useState } from 'react';
import { Pencil, Search, Trash2 } from 'lucide-react';
import { Button, Checkbox, Image, Input, Modal } from 'antd';
import {
  useApproveInstructorMutation,
  useDeleteUsersMutation,
  useGetAllUsersQuery,
} from '../redux/features/admin/userSlice';
import { imageUrl } from '../redux/baseApi';
import avaterimg from '../assets/Images/dashboard/Avatar.png';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  instructorApplicationStatus?: 'approved' | 'pending' | 'notApplied';
}

export default function UserTable() {
  const { data, isLoading, error } = useGetAllUsersQuery();
  const [approveInstructor] = useApproveInstructorMutation();
  const [deleteUser] = useDeleteUsersMutation();

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedInstructorId, setSelectedInstructorId] = useState<string | null>(null);

  const users: User[] = data?.data?.result || [];
  const usersPerPage = 8;

  const toggleUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const toggleAllUsers = () => {
    setSelectedUsers((prev) =>
      prev.length === users.length ? [] : users.map((user) => user._id)
    );
  };

  const handleApprove = async () => {
    
    if (selectedInstructorId) {
      try {
       const res = await approveInstructor({instructorId:selectedInstructorId}).unwrap();
        console.log('Instructor approved successfully',res);
        setIsEditModalVisible(false);
      } catch (error) {
        console.error('Error approving instructor:', error);
      }
    }
  };

  const confirmDelete = (userId: string) => {
    setDeleteUserId(userId);
  };

  const handleDelete = async () => {
    if (deleteUserId) {
      try {
        await deleteUser(deleteUserId).unwrap();
        console.log('User deleted successfully');
        setDeleteUserId(null);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users!</div>;

  return (
    <div className="rounded-lg">
      <Input
        style={{
          height: '44px',
          borderColor: '#D0D5DD',
          color: '#667085',
          fontSize: '16px',
          fontWeight: 400,
        }}
        placeholder="Search by name, role, or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-2"
        prefix={<Search className="h-4 w-4 opacity-50" />}
      />

      <div className="overflow-x-auto border border-gray-200 bg-white mt-4 rounded-lg">
        <div className="p-6 pb-4">
          <h2 className="text-base font-semibold text-gray-900">Total users</h2>
          <p className="text-sm text-gray-500">{filteredUsers.length} users</p>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left">
                <Checkbox
                  checked={selectedUsers.length === currentUsers.length}
                  onChange={toggleAllUsers}
                />
              </th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Email address</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left sr-only">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <tr key={user._id} className="text-sm">
                <td className="px-6 py-4">
                  <Checkbox
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => toggleUser(user._id)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10">
                      {user.image ? (
                        <Image
                          preview={false}
                          src={imageUrl + user.image}
                          alt={user.name}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <Image
                          preview={false}
                          src={avaterimg}
                          alt={user.name}
                          className="rounded-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-gray-500">@{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{user.role}</td>
                <td className="px-6 py-4 text-gray-500">{user.email}</td>
                <td
                  className={`${
                    user.instructorApplicationStatus === 'approved' && 'text-green-500'
                  } ${
                    user.instructorApplicationStatus === 'pending' && 'text-yellow-500'
                  } ${
                    user.instructorApplicationStatus === 'notApplied' && 'text-gray-500'
                  }`}
                >
                  {user.instructorApplicationStatus || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button
                    // disabled={ user.instructorApplicationStatus !== 'pending'}
                      aria-label="Edit user"
                      onClick={() => {
                        setSelectedInstructorId(user._id);
                        setIsEditModalVisible(true);
                      }}
                    >
                      <Pencil className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button
                      aria-label="Delete user"
                      onClick={() => confirmDelete(user._id)}
                    >
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              type={currentPage === page ? 'primary' : 'default'}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={!!deleteUserId}
        onOk={handleDelete}
        onCancel={() => setDeleteUserId(null)}
      >
        <p className="text-[16px] text-[#101828]">
          Are you sure you want to delete this user?
        </p>
      </Modal>

      {/* Approve User Modal */}
      <Modal
        title="Approve User"
        open={isEditModalVisible}
        footer={
          <div className="flex gap-2 items-center justify-end">
            <Button onClick={() => setIsEditModalVisible(false)} type="default">
              Cancel
            </Button>
            <Button onClick={handleApprove} type="primary">
              Approve
            </Button>
          </div>
        }
        onCancel={() => setIsEditModalVisible(false)}
      >
        <p className="text-[16px] text-[#101828]">
          Are you sure you want to approve this instructor's application?
        </p>
      </Modal>
    </div>
  );
}
