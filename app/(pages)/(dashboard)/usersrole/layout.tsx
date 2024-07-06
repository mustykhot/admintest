"use client";
import { ReactNode, useMemo } from "react";
import classes from "@components/styles/buyer.module.scss";
// import { RootState } from "store/store";
import { useSelector } from "react-redux";
import Tabs from "@components/common/Tabs";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

export default function UserMgtLayout({ children }: Props) {
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
            onTabClick={(key) => router.push(`/admin/user-mgt/${key}`)}
            tabItems={USER_MGT_TAB_ITEMS.map((item) => ({
              component: null,
              data: {
                tabKey: item.key,
                tab: <span className="yaraa-tab-title">{item.label}</span>,
              },
            }))}
          />
        </nav>
        {children}
      </div>
    </div>
  );
}

const USER_MGT_TAB_ITEMS = [
  { key: "users", label: "Users" },
  { key: "roles", label: "Roles" },
  { key: "role-assignment", label: "Role Assignment" },
];
