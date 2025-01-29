import React, { useState } from 'react';
import { Table, Tag, Avatar, Badge } from 'antd';
import { FaCheck } from 'react-icons/fa';
import SelectBox from '../share/SelectBox';
import { useGetAdminTransectionsQuery } from '../../redux/features/admin/dashboard';
import { format } from 'date-fns'; // Ensure date-fns is installed

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (date) => (
      <p className="text-lg font-bold text-[#475467]">
        {format(new Date(date), 'yyyy-MM-dd')}
      </p>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <div className="flex gap-2 items-center justify-center bg-[#ECFDF3] text-[#027A48] py-1 px-4 text-[16px] rounded-full w-fit">
        <FaCheck />
        <Badge className="font-bold" color="green">
          {status}
        </Badge>
      </div>
    ),
  },
  {
    title: 'From',
    dataIndex: 'user',
    key: 'user',
    render: (user) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={`http://your-server-url/${user.image}`} />
        <div style={{ marginLeft: '10px' }}>
          <p className="text-[16px] font-bold">{user.name}</p>
          <p className="text-[16px] text-gray-500">{user.email}</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount) => (
      <p className="text-lg font-bold text-[#475467]">${amount}</p>
    ),
  },
];

const TransactionHistory = () => {
  const [filter, setFilter] = useState('weekly');
  const { data, isLoading, isError } = useGetAdminTransectionsQuery({ filter });

  console.log('data', data?.data?.transactions);

  const handleSelectChange = (value) => {
    setFilter(value);
  };

  const selectOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  return (
    <div>
      <div className="pr-6 py-4 flex items-center justify-end">
        <SelectBox
          
          options={selectOptions}
          placeholder="Week"
          onChange={handleSelectChange}
          style={{ width: 100 }}
        />
      </div>
      <div className="border-[2px] border-[#E4E7EC] rounded-[8px] p-[20px]">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Failed to fetch data.</p>
        ) : (
          <Table
            columns={columns}
            dataSource={data?.data?.transactions.map((transaction) => ({
              key: transaction._id,
              date: transaction.date,
              status: transaction.status,
              user: {
                name: transaction.user.name,
                email: transaction.user.email,
                image: transaction.user.image,
              },
              amount: transaction.amount,
            }))}
            pagination={{
              pageSize: 10,
              showSizeChanger: false,
              showQuickJumper: true,
              total: data?.data?.count || 0,
              position: ['bottomCenter'],
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
