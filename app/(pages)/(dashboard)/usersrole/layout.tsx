"use client";
import { ReactNode, useMemo } from "react";
import classes from "@components/styles/buyer.module.scss";
// import { RootState } from "store/store";
import { useSelector } from "react-redux";
import Tabs from "@components/common/Tabs";
import { useRouter } from "next/navigation";

interface Props {
  activeKey: "users" | "roles" | "role-assignment";
  tabButton?: JSX.Element | null;
  children: ReactNode;
}

export default function UserMgtLayout(props: Props) {
  const router = useRouter();
  // const { profile, user } = useSelector((state: RootState) => state.user);

  // const appsInstalled = useMemo(
  //   () =>
  //     profile?.appsInstalled ? profile?.appsInstalled : user?.appsInstalled,
  //   [profile?.appsInstalled, user?.appsInstalled]
  // );

  return (
    <div className={classes.main_wrapper}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h3>User Management</h3>
          <Tabs
            className={classes.ant_tabs}
            activeKey={props.activeKey}
            onTabClick={(key) => router.push(`/admin/user-mgt/${key}`)}
            tabBarExtraContent={props?.tabButton ? props.tabButton : null}
            tabItems={USER_MGT_TAB_ITEMS.map((item) => ({
              component: null,
              data: {
                tabKey: item.key,
                tab: <span className="yaraa-tab-title">{item.label}</span>,
              },
            }))}
          />
        </nav>
        {props.children}
      </div>
    </div>
  );
}

export const USER_MGT_TAB_ITEMS = [
  { key: "users", label: "Users" },
  { key: "roles", label: "Roles" },
  { key: "role-assignment", label: "Role Assignment" },
];
