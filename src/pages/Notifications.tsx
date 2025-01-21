import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge } from "antd";
import avg from "../assets/Images/Notifications/Avatar.png";
import { useSelector } from "react-redux";
import { useGetNotifiByUserIdQuery } from "../redux/features/users/UserApi";
import moment from "moment";

type Props = {};

const Notifications = (props: Props) => {
  const user = useSelector((state: any) => state.user.user);
  console.log("user id from notification", user?._id);

  const { data } = useGetNotifiByUserIdQuery(user?._id);

  console.log(data?.notifications);

  const navigate = useNavigate();
  const handleBack = () => {
    console.log("click,");
    navigate("/");
  };

  return (
    <div className="px-8">
      <div onClick={handleBack} className="flex items-center cursor-pointer">
        <IoIosArrowBack />
        <h1> Back</h1>
      </div>
      <div className="flex justify-between py-6">
        <div className="flex">
          <h1 className="text-[24px] font-bold">Notifications</h1>
          <a href="#">
            <sup>
              <Badge count={data?.notifications?.length || 0} />
            </sup>
          </a>
        </div>
        <h1 className="text-[#5E7FD3] cursor-pointer">See All</h1>
      </div>
      {/* Notifications List */}
      {data?.notifications?.map((notification: any) => (
        <div
          key={notification._id}
          className="flex justify-between items-center py-4 border-b"
        >
          <div className="flex gap-4 items-center">
            <Avatar size={60} src={avg} />
            <div>
              <h1 className="text-xl font-bold">
                {notification.type === "course"
                  ? "New Course"
                  : notification.type === "others"
                  ? "System Message"
                  : "Notification"}
              </h1>
              <p>{notification.message}</p>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-sm text-gray-500">
              {moment(notification.createdAt).fromNow()}
            </h1>
            {!notification.isRead && (
              <Badge color="red" count="New" offset={[10, 0]} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
