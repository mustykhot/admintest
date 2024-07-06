import { Tabs as AntTabs, TabPaneProps, TabsProps } from "antd";
import { omit } from "lodash";
import React from "react";
import "./Tabs.scss";

const { TabPane } = AntTabs;

type TabItem = {
  component: React.ReactNode;
  data: TabPaneProps;
};

interface IProps extends TabsProps {
  tabItems: TabItem[];
}

const Tabs: React.FC<IProps> = (props) => {
  const { tabItems, className } = props;
  return (
    <AntTabs
      {...omit(props, ["tabItems"])}
      className={`yaraa-tabs ${className}`}
    >
      {tabItems.map(({ component, data }) => {
        return (
          <TabPane {...data} key={data.tabKey}>
            {component}
          </TabPane>
        );
      })}
    </AntTabs>
  );
};
export default Tabs;

Tabs.defaultProps = {
  className: " ",
};
