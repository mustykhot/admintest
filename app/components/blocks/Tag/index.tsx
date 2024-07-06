import React from "react";
import { Tag as AntTag } from "antd";
import "./Tag.scss";

const generateStatus = (status?: string | null) => {
  if (!status) return "processing";
  switch (status.toLowerCase()) {
    case "pending":
    case "out for delivery":
    case "partially delivered":
    case "in selection":
    case "in bank selection":
    case "in negotiation":
    case "Not Sent":
    case "pending approval":
    case "invoice posted":
    case "authorizer approval":
      return "processing";
    case "success":
    case "approved":
    case "payment approved":
    case "completed":
    case "awarded":
    case "rfp/rfq submitted":
    case "invite accepted":
    case "revenue":
    case "verified":
    case "brought in":
    case "in stock":
      return "success";
    case "rejected":
    case "error":
    case "closed":
    case "disqualified":
    case "invie rejected":
    case "approval rejected":
    case "expense":
    case "taken out":
    case "out of stock":
      return "error";
    case "warning":
    case "draft":
    case "in draft":
    case "rfx generated":
    case "new":
      return "warning";
    case "default":
    case "generated":
    case "accepted":
    case "executed":
    case "invoice parked":
    case "invoice paid":
    case "delivered":
      return "default";
    default:
      return "processing";
  }
};

interface IProps {
  status?: string | null;
  className?: string;
  text?: string;
}

const Tag = ({ status, className, text }: IProps) => {
  return (
    <AntTag
      className={`font-primary capitalize yaraa-tag ${className}`}
      color={generateStatus(status)}
    >
      {text ?? status ?? "Processing"}
    </AntTag>
  );
};

export default Tag;

Tag.defaultProps = {
  className: "",
};
