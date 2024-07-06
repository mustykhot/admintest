import "./Button.scss";
import { Button as AntButton, ButtonProps } from "antd";

const Button = (props: ButtonProps) => {
  const { name, children, className = "" } = props;
  return (
    <AntButton {...props} className={`yaraa-btn ${className}`}>
      {name}
      {children}
    </AntButton>
  );
};

export default Button;
