"use client";
import { ReactNode, useState } from "react";
import {
  Avatar,
  Dropdown,
  Layout,
  Menu,
  Popover,
  Spin,
  Tag,
  Typography,
} from "antd";
import { ItemType } from "antd/es/menu/interface";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "store/store";
// import Notification from "components/NavbarHeader/Notfication";
// import { logout } from "store/slice/UserSlice/UserSlice";
import { startCase } from "lodash";
import { getMenuSelectedKeys } from "@constants/utils";
import {
  AppsIcon,
  HomeIcon,
  I3SquareIcon,
  MagicPenIcon,
  ManufacturingIcon,
  MedalStarIcon,
  MoneyIcon,
  NoteAddIcon,
  PenAddIcon,
  PeopleIcon,
  PeopleIcon2,
  Profile2UserIcon,
  ProjectManagementIcon,
  ReceiptSearchIcon,
  SettingsIcon,
  TruckIcon,
  TruckTickIcon,
} from "@components/icons/icons";
import YaraaLogo from "@components/blocks/YaraaLogo";
import { usePathname, useRouter } from "next/navigation";

const { Header, Content, Sider } = Layout;
type MenuItemType = "app";

const MENU_NAME = {
  app: "Admin",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // const { pathname, state } = useLocation() as {
  //   pathname: string;
  //   state: { module?: string };
  // };

  const pathname = usePathname();
  // const { profile, portal, user } = useSelector(
  //   (state: RootState) => state.user
  // );
  const [collapsed, setCollapsed] = useState(false);
  const [popOpen, setPopOpen] = useState(false);
  // const [selected, setSelected] = useState<string>(getActiveApp(pathname));

  // useEffect(() => {
  //   setSelected(getActiveApp(pathname, selected));
  // }, [pathname]);

  // const history = useHistory();
  const router = useRouter();

  // const role_access = user?.role_access ?? profile?.role_access;
  // const userPermissions = role_access?.map((perm) => perm.controller_name);

  // const isAppInstalled = user?.appsInstalled?.length >= 1;

  // const isProcurementInstalled =
  //   user?.appsInstalled === "E-PROCUREMENT" ||
  //   user?.appsInstalled?.includes("E-PROCUREMENT");

  // const isContractManagementInstalled = user?.appsInstalled?.includes(
  //   "CONTRACT_MANAGEMENT"
  // );

  // const isOwner = profile?.account_type === "owner";
  // const isUser = profile?.account_type === "user";
  // const { role } = useUserRole();
  const MENU_ITEMS: Record<MenuItemType, ItemType[]> = {
    app: [
      {
        onClick: (info) => {
          router.push(info.key);
        },
        label: "Dashboard",
        key: "/home",
        icon: <HomeIcon />,
      },
      {
        onClick: (info) => {
          router.push(info.key);
        },
        label: "Business",
        key: "/business",
        icon: <AppsIcon />,
      },
      {
        onClick: (info) => {
          router.push(info.key);
        },
        label: "Transaction",
        key: "/transactions",
        icon: <AppsIcon />,
      },
      {
        onClick: (info) => {
          router.push(info.key);
        },
        label: "Users",
        key: "/usersrole",
        icon: <AppsIcon />,
      },
    ],
  };

  // const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(logout(portal));
  };

  const handleProfile = () => {
    router.push("/profile/details");
  };

  // if (typeof profile?.account_type === "undefined") return <Skeleton />;

  return (
    <Layout className="yaraa-layout">
      <Sider
        width="16%"
        className="yaraa-sider"
        collapsible={false}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <section>
          <div>
            <div className="yaraa-logo-section flex items-center gap-3 sticky top-0">
              <button
                type="button"
                onClick={() => setCollapsed((prev) => !prev)}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="36" height="36" rx="12" fill="white" />
                  <path
                    d="M12 18H24"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 14H24"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22H24"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {!collapsed ? (
                <div className="flex items-center gap-2">
                  <YaraaLogo />
                </div>
              ) : null}
            </div>

            <Menu
              className="yaraa-menu"
              selectedKeys={getMenuSelectedKeys(
                pathname,
                MENU_ITEMS["app"]
                // state?.module as string | undefined
              )}
              defaultSelectedKeys={getMenuSelectedKeys(
                pathname,
                MENU_ITEMS["app"]
                // state?.module
              )}
              mode="inline"
              items={MENU_ITEMS["app"]}
            />
          </div>
        </section>
      </Sider>

      <Layout className="yaraa-layout-inner">
        <Header className="yaraa-header">
          <div className="yaraa-header-content">
            <div className="yaraa-header-content-children flex items-center gap-2 mt-4">
              <button type="button">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="36" height="36" rx="16" fill="white" />
                  <path
                    d="M17.5834 25.4993C21.9556 25.4993 25.5 21.9549 25.5 17.5827C25.5 13.2104 21.9556 9.66602 17.5834 9.66602C13.2111 9.66602 9.66669 13.2104 9.66669 17.5827C9.66669 21.9549 13.2111 25.4993 17.5834 25.4993Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M26.3334 26.3327L24.6667 24.666"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {/* <Notification /> */}
              <Dropdown
                trigger={["click"]}
                menu={{
                  items: [
                    {
                      label: "Profile",
                      key: "profile",
                      onClick: () => handleProfile(),
                    },
                    {
                      label: "Logout",
                      key: "logout",
                      onClick: () => handleLogout(),
                      danger: true,
                    },
                  ],
                }}
              >
                <div className="cursor-pointer flex items-center space-x-2 bg-white rounded-3xl px-1 py-1 pr-2">
                  <Avatar
                    style={{ background: "#0970aa" }}
                    className="bg-[#0970aa]"
                    src={""}
                  />
                  <Typography.Text className="text-xs text-gray-700 font-primary">
                    Raji Mustapha
                  </Typography.Text>
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content className="yaraa-content">
          <div>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
