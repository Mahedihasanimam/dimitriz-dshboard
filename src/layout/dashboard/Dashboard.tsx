import React from "react";
import { Avatar, Badge, Input, Layout, Menu, Popover } from "antd";
import { Bell, Lock, LogOut, Search, User, User2Icon } from "lucide-react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/Images/logo.png";
import logoChoozy from "../../assets/Images/dashboard/pie-chart.svg";
import productListing from "../../assets/Images/dashboard/tag.png";
import categoryManagement from "../../assets/Images/dashboard/categoryManagement.png";
import manageUser from "../../assets/Images/dashboard/ManageUser.png";
import { FaRegUserCircle, FaRegHeart } from "react-icons/fa";
import { CiCreditCard1, CiFlag1 } from "react-icons/ci";
import settings from "../../assets/Images/dashboard/settings.png";
import SubMenu from "antd/es/menu/SubMenu";
import Settings_personalInformation from "./../../pages/Settings_personalInformation";

import {
  SearchOutlined,
  AlignRightOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { HiOutlineSupport } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { BsStack } from "react-icons/bs";
import { FiCreditCard } from "react-icons/fi";
const { Header, Sider, Content } = Layout;

interface MenuItem {
  path: string;
  title: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    path: "/",
    title: "Dashboard",
    icon: (
      <AlignRightOutlined
        style={{ color: "#667085", fontSize: 20 }}
        className="rotate-90 "
      />
    ),
  },
  {
    path: "/createnewcourse",
    title: "Create new course",
    icon: <PlusOutlined style={{ color: "#667085", fontSize: 20 }} />,
  },
  // {
  //   path: "/category_management",
  //   title: "Category Management",
  //   icon: <img src={categoryManagement} alt="Logo" width={18} height={18} />,
  // },
  {
    path: "/manage-users",
    title: "My courses",
    icon: <BsStack  size={18} color="#667085" />,
  },
  {
    path: "/love",
    title: "Earning",
    icon: <FiCreditCard color="#667085" size={18} />,
  },
  {
    path: "/transactions",
    title: "Webinar",
    icon: <CiFlag1 color="#667085" size={20} />,
  },
  
];
const bottomMenuItems: MenuItem[] = [
  {
    path: "/support",
    title: "Support",
    icon: <HiOutlineSupport size={20} color="#667085" /> ,
  },
  {
    path: "/settings",
    title: "Settings",
    icon: <IoSettingsOutline  size={20} color="#667085"/>
  },
  
];

const content = (
  <div className="w-40">
    <p className="mb-2">
      <Link to="/profile" className="flex items-center gap-2">
        <User2Icon size={18} /> <span className="text-md">Profile</span>
      </Link>
    </p>
    <p className="mb-3">
      <Link to="/change-password" className="flex items-center gap-2">
        <Lock size={18} /> <span className="text-md">Change password</span>
      </Link>
    </p>
  </div>
);

interface NotificationBadgeProps {
  handleNotifications: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Dashboard: React.FC<NotificationBadgeProps> = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/auth/login");
  };

  const handleNotifications = () => {
    console.log("clicked");
    navigate("/notifications");
  };

  // Map the pathnames to header titles
  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return (
        
            <div className=" ">
              <h1 className="text-[#333333] font-bold text-[24px] font-Merriweather pb-0">
              Dashboard analytics
              </h1>
              
            </div>

        );
      case "/createnewcourse":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
            Create a new course
            </h1>
          </div>
        );
      case "/category_management":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
              Manage Category
            </h1>
          </div>
        );
      case "/manage-users":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
              Manage Users
            </h1>
          </div>
        );
      case "/love":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">Love</h1>
          </div>
        );
      case "/transactions":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
              Transactions
            </h1>
          </div>
        );
      case "/settings":
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">
            Personal info
            </h1>
          </div>
        );
      case "/support":
        return (
          <div>
            <h1 className="text-[#101828] font-bold text-[24px]">
            Get in touch
     
            </h1>
         
          </div>
        );
     
      case "/settings/faq":
        // return "Settings";
        // default:
        return (
          <div>
            <h1 className="text-[#333333] font-bold text-[24px]">FAQ</h1>
          </div>
        );
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        width={312}
        className="sidebar-menu  overflow-scroll"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          overflow: "auto",
          zIndex: 2,
        }}
        trigger={null}
      >
        <img src={logo} alt="Logo" className="mx-auto py-6  w-[264px]" />
        <div className="px-2">
          <Input
            placeholder="Search"
            className="w-full mt-4 px-4 py-2  mb-6"
            prefix={
              <SearchOutlined
                className="text-xl text-gray-500"
                size={100}
                color="#667085"
              />
            }
            size="large"
          />
        </div>
        <Menu
          mode="inline"
          style={{ background: "#1E1E1E", color: "`white`" }}
          defaultSelectedKeys={["1"]}
        >
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            if (item.children) {
              return (
                <SubMenu
                  key={`submenu-${index}`}
                  title={item.title}
                  icon={item.icon}
                  style={{
                    color: isActive ? "red" : "#fff",
                    fontWeight: isActive ? "bold" : "normal",
                    fontSize: "16px",
                    marginBottom: "10px",
                    backgroundColor: isActive ? "#F2F5FC" : "transparent",
                  }}
                >
                  {item.children.map((child, childIndex) => (
                    <Menu.Item
                      key={`child-${childIndex}`}
                      icon={child.icon}
                      style={{
                        color:
                          location.pathname === child.path ? "red" : "#fff",
                        fontWeight:
                          location.pathname === child.path ? "bold" : "normal",
                        fontSize: "16px",
                      }}
                    >
                      <Link to={child.path}>{child.title}</Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item
                  key={`item-${index}`}
                  icon={item.icon}
                  style={{
                    color: isActive ? "blue" : "#fff",
                    fontWeight: isActive ? "bold" : "normal",
                    fontSize: "16px",
                    marginBottom: "10px",
                    backgroundColor: isActive ? "#F2F5FC" : "transparent",
                  }}
                >
                  <Link to={item.path}>{item.title}</Link>
                </Menu.Item>
              );
            }
          })}



          <div className="py-36 mt-16 px-4 w-full">

            
         <div className="py-4">
         {bottomMenuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
          
              return (
                <Menu.Item
                  key={`item-${index}`}
                  icon={item.icon}
                  style={{
                    color: isActive ? "blue" : "#fff",
                    fontWeight: isActive ? "bold" : "normal",
                    fontSize: "16px",
                    padding: "0 10px",
                    backgroundColor: isActive ? "#F2F5FC" : "transparent",
                  }}
                >
                  <Link to={item.path}>{item.title}</Link>
                </Menu.Item>
              );
            }
          )}
         </div>
          <div className="flex  gap-8 ">
            <div className="flex gap-2 w-3/4 items-center">
              <Popover
                className="cursor-pointer"
                placement="top"
                content={content}
              >
                <div>
                  <Avatar
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "gray",
                    }}
                    icon={<User size={25} />}
                  />
                </div>
              </Popover>
    

             <div className="space-y-4">
                <h1 className="text-black">John Doe</h1>
                <h1 className="text-black">ex@ample.com</h1>
              </div>
         
            </div>

            <div>
              <Menu.Item
                key="500"
                icon={<LogOut size={20} />}
                style={{ color: "red", fontSize: "16px" }}
                onClick={handleLogout}
              />
            </div>
          </div>
          </div>
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: 312 }}>
        <Header
          style={{
            position: "fixed",
            width: "83vw",
            top: 0,
            left: 312,
            background: "#F6F6F6",
            height: "80px",
            paddingTop: "20px",
            zIndex: 10, // Increased z-index
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div className="w-full justify-between flex items-center">
            <div>{getTitle()}</div>
            <div
              onClick={handleNotifications}
              className="cursor-pointer"
              style={{ zIndex: 11 }} // Ensure the badge has a higher z-index than other elements
            >
              <Badge count={5}>
                <Bell size={30} color="gray" />
              </Badge>
            </div>
          </div>
        </Header>

        <Content
          style={{
            marginTop: 80,
            padding: "20px",
            overflowY: "auto",
            height: `calc(100vh - 80px)`,
            background: "#1e1e1ef7",
          }}
        >
          <div className="h-full m-2 rounded p-3">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
