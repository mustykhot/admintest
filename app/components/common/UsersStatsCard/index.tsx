import React from "react";
import { Typography } from "antd";

const UsersStatsCard = ({
  title,
  value,
  onClick,
  small,
  className,
  icon,
  activeUsers,
  InActiveUsers,
}: {
  title: string;
  value: string | number;
  className?: string;
  onClick?: Function;
  small?: string;
  icon?: React.ReactNode;
  activeUsers?: number;
  InActiveUsers?: number;
}) => (
  <div
    key={title}
    onClick={() => onClick && onClick()}
    className={`w-full bg-white flex  justify-between items-end rounded-xl border border-[#F5F5F5] h-[150px] md:min-h-[120px] py-2 sm:py-3 md:py-4 px-6 ${
      onClick ? "cursor-pointer" : ""
    } ${className}`}
  >
    <div className="flex flex-col  ">
      <Typography.Text className="font-bold text-[1.5rem] md:text-[2rem] leading-[2rem] md:leading-[3rem] text-[#111111] font-primary">
        {value ?? 0}
      </Typography.Text>
      <Typography.Text className="text-[1rem] text-[#111111] font-primary">
        {title}
      </Typography.Text>

      {activeUsers && (
        <div className="flex mt-2 ">
          <Typography.Text className=" text-[12px] mr-1 text-[#7B7B7B] font-primary">
            Active Users
          </Typography.Text>
          <Typography.Text className="text-[12px] text-[#7B7B7B] font-primary">
            {activeUsers}
          </Typography.Text>
        </div>
      )}
      {activeUsers && (
        <div className="flex mt-2 ">
          <Typography.Text className=" text-[12px] mr-1 text-[#7B7B7B] font-primary">
            Inactive Users
          </Typography.Text>
          <Typography.Text className="text-[12px] text-[#7B7B7B] font-primary">
            {activeUsers}
          </Typography.Text>
        </div>
      )}
      {small && (
        <Typography.Text className="text-xs  text-[#0970AA] font-primary">
          {small}
        </Typography.Text>
      )}
    </div>
    <div className="self-start">
      {icon === undefined ? (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.3333 11.3334C29.3333 16.1201 25.4533 20.0001 20.6667 20.0001C20.44 20.0001 20.2 19.9868 19.9733 19.9734C19.64 15.7468 16.2533 12.3601 12.0267 12.0267C12.0133 11.8001 12 11.5601 12 11.3334C12 6.54675 15.88 2.66675 20.6667 2.66675C25.4533 2.66675 29.3333 6.54675 29.3333 11.3334Z"
            stroke="#10B2B4"
            strokeWidth="2.0625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.0003 20.6664C20.0003 25.4531 16.1203 29.3331 11.3337 29.3331C6.54699 29.3331 2.66699 25.4531 2.66699 20.6664C2.66699 15.8798 6.54699 11.9998 11.3337 11.9998C11.5603 11.9998 11.8003 12.0131 12.027 12.0264C16.2536 12.3597 19.6403 15.7464 19.9737 19.9731C19.987 20.1998 20.0003 20.4398 20.0003 20.6664Z"
            stroke="#10B2B4"
            strokeWidth="2.0625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.16 19.4932L11.3333 17.3333L12.5067 19.4932L14.6667 20.6666L12.5067 21.8399L11.3333 23.9999L10.16 21.8399L8 20.6666L10.16 19.4932Z"
            stroke="#10B2B4"
            strokeWidth="2.0625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        icon
      )}
    </div>
  </div>
);

export default UsersStatsCard;
