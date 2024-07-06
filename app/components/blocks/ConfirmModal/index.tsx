import { Typography } from "antd";
import React from "react";
import "./ConfirmationModal.scss";

interface IProps {
  title: React.ReactNode;
  message?: string;
  renderMessage?: React.ReactNode;
}

const ConfirmModalContent = ({ title, message, renderMessage }: IProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <Typography.Text className="font-primary text-xl font-bold text-[#2E2E2E]">
        {title}
      </Typography.Text>
      {renderMessage ||
        (message && (
          <Typography.Text className="font-primary text-base text-opacity-50 text-[#2E2E2E]">
            {message}
          </Typography.Text>
        ))}
    </div>
  );
};

export default ConfirmModalContent;
