import React from "react";
import { Divider, Drawer as AntDrawer, DrawerProps, Typography } from "antd";
import { omit } from "lodash";
import { useWindowSize } from "@hooks/useWindowSize";

interface IProps extends DrawerProps {
  description?: string;
  hideLine?: boolean;
  responsiveWidth?: number;
  dontShowClose?: boolean;
  childClass?: string;
}

const Drawer = (props: IProps) => {
  const { width } = useWindowSize();
  const {
    children,
    title,
    description,
    className,
    onClose,
    hideLine,
    responsiveWidth,
    childClass,
  } = props;
  return (
    <AntDrawer
      {...omit(props, ["title", "description", "width"])}
      destroyOnClose
      width={width < (responsiveWidth || 450) ? "100%" : props.width}
      className={`yaraa-drawer ${className}`}
    >
      <section
        className={`flex flex-col ${
          childClass ? childClass : " space-y-2"
        } font-primary antialiased`}
      >
        <div className="flex items-center justify-between space-x-10">
          <Typography.Text className="text-[#505566] font-bold text-xl font-primary">
            {title}
          </Typography.Text>
          {props.dontShowClose ? null : (
            <button onClick={onClose} className="cursor-pointer">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  stroke="#111111"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.16992 14.8299L14.8299 9.16992"
                  stroke="#111111"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.8299 14.8299L9.16992 9.16992"
                  stroke="#111111"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        <Typography.Text className="text-[#7B7B7B] text-sm font-primary">
          {description}
        </Typography.Text>
        {!hideLine && <Divider />}
      </section>
      <section className={`${childClass ? childClass : "mt-4 grow"}`}>
        {children}
      </section>
    </AntDrawer>
  );
};

export default Drawer;
