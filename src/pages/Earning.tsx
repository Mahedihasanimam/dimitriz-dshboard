
import React from "react";

// Define the type for each data point
interface DataPoint {
  name: string;
  amt: number;
}
const data: DataPoint[] = [
  { name: "Jan", amt: 12000 },
  { name: "Feb", amt: 12000 },
  { name: "Mar", amt: 7000 }, 
  { name: "Apr", amt: 15000 },
  { name: "May", amt: 8000 }, 
  { name: "Jun", amt: 16000 },
  { name: "Jul", amt: 9000 }, 
  { name: "Aug", amt: 14000 },
  { name: "Sep", amt: 8500 }, 
  { name: "Oct", amt: 13000 },
  { name: "Nov", amt: 7500 }, 
  { name: "Dec", amt: 6000 }, 
];

import TransactionTable from "../component/Transactions/TransactionsTable";
import { useGetAllEarningByuserQuery } from "../redux/features/course/productApi";
import { useSelector } from "react-redux";
// Define a type for the API response
interface StatusAttributes {
  totalEarnings: number;
  allUsers: number;
  paidUsers: number;
}

interface StatusData {
  data: {
    attributes: StatusAttributes;
  };
}

const Earning: React.FC = () => {




  return (
    <div>
         <div className="bg-[#FFFFFF] p-6 rounded-xl rounded-b-none">
  
   

      {/* revinew chart ----------------- */}
   
      <TransactionTable/>
    </div>
    </div>
  );
};

export default Earning;