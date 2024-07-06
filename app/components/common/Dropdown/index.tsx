import React from "react";
import { Dropdown as AntDropdown, DropdownProps } from "antd";

interface IProps extends DropdownProps {
  children: React.ReactNode;
}

const Dropdown: React.FC<IProps> = (props) => {
  const { children } = props;

  return <AntDropdown {...props}>{children}</AntDropdown>;
};

export default Dropdown;
