import { Table } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllEarningByuserQuery } from "../../redux/features/course/productApi";

interface TransactionData {
  key: number;
  date: string;
  method: string;
  amount: number;
  status: string;
  courseTitle: string;
}

const TransactionTable: React.FC = () => {
  const user = useSelector((state: any) => state.user.user);

  const { data } = useGetAllEarningByuserQuery(user?._id);
  console.log("transaction table data", data?.transactions);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  // Prepare the dataSource for the Ant Design Table
  const dataSource = data?.transactions?.map((transaction: any, index: number) => ({
    key: index, // A unique key for each row
    date: new Date(transaction.date).toLocaleDateString(), // Format date to a readable format
    method: transaction.method,
    amount: transaction.amount,
    status: transaction.status,
    courseTitle: transaction.courseTitle,
  })) || [];

  // Calculate total amount
  const totalAmount = dataSource.reduce((sum, transaction) => sum + transaction.amount, 0);

  // Table columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount.toFixed(2)}`, // Format amount as currency
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded ${
            status === "paid" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Course Title",
      dataIndex: "courseTitle",
      key: "courseTitle",
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-4">

          <div className="mt-4 text-lg font-semibold">
              Total Amount: <span className="ml-2 text-green-600">${totalAmount.toFixed(2)}</span>
            </div>
      <div className="flex justify-between w-full">
        <div className="py-4">
          <h1 className="text-xl font-bold text-[#5D5D5D]">Transaction History</h1>
          <p className="text-[#5D5D5D]">Summary of your transaction activities</p>
        </div>
      </div>
      <div>
        <Table
          dataSource={dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize)} // Paginate manually
          columns={columns}
          pagination={{
            pageSize,
            total: dataSource.length,
            current: currentPage,
            onChange: handlePageChange,
          }}
          rowClassName={() => "hover:bg-gray-100"}
     
        />
      </div>
    </div>
  );
};

export default TransactionTable;
