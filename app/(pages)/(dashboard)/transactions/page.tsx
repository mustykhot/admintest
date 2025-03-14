"use client";

import { useMemo, useState } from "react";
import classes from "@components/styles/buyer.module.scss";
// import useGetUsersAccount from "v2/hooks/useGetUsersAccount";
// import usePostResendUserActivation from "v2/hooks/usePostResendUserActivation";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SendOutlined,
} from "@ant-design/icons";
// import useGetUserRoles from "v2/hooks/useGetUserRoles";
import { notification } from "antd";
// import { useDeleteUser } from "v2/lib/api/admin/user";
import Table from "@components/Table";
import Tag from "@components/blocks/Tag";
import Dropdown from "@components/common/Dropdown";
import { ItemType } from "antd/es/menu/interface";
import toastPopUp from "@utils/toastPopup";
import Button from "@components/common/Button";

export default function Transactions() {
  // const {
  //   data,
  //   loading,
  //   pagination,
  //   setFilter,
  //   setPagination,
  //   setSearchTerm,
  //   mutate: refetchUsers,
  // } = useGetUsersAccount();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerAction, setDrawerAction] = useState<"create" | "edit" | "view">(
    "view"
  );
  const [user, setUser] = useState<Record<string, any> | null>(null);
  // const { resendActivation } = usePostResendUserActivation();
  // const { deleteUser: postDeleteUser } = useDeleteUser();
  // const { data: roles, loading: rolesLoading } = useGetUserRoles({
  //   length: Number.MAX_SAFE_INTEGER,
  // });

  function deleteUser(id: string, name: string) {
    toastPopUp({ title: `Delete ${name}?` }, () => {
      // postDeleteUser(id).then(() => refetchUsers());
    });
  }

  const counts = {
    users: 0,
  };

  const dataSource = useMemo(() => {
    return [];
  }, []);

  return (
    <>
      <div className={classes.main_wrapper}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h3>Transactions</h3>
          </nav>
          <section className={classes.content}>
            <Table
              loading={false}
              dataSource={dataSource}
              meta={
                {
                  // currentPage: data?.currentPage,
                  // total: data?.total,
                  // pageSize: data?.perpage,
                }
              }
              // pagination={pagination}
              // setPagination={setPagination}
              // setFilter={setFilter}
              // setSearchTerm={setSearchTerm}
              placeholder="Search by Business Name"
              showHeader
              showSearch
              showFooter
              customPagination={false}
              showPageSizeChanger={true}
              columns={COLUMNS}
              cards={getCards(counts)}
              listFilter={false}
              showSort={false}
              filters={{ items: getFilterItems() }}
            />
          </section>{" "}
        </div>
      </div>
    </>
  );
}

function getCards(counts: { users: any }) {
  return [
    // { title: "Businesses", value: counts.users },
    { title: "Total Transactions", value: counts.users },
    { title: "Successful Transactions", value: counts.users },
    { title: "Failed Transactions", value: counts.users },
    { title: "Pending Transactions", value: counts.users },
  ];
}

const COLUMNS = [
  {
    dataIndex: "business_name",
    title: "Business Name",
    render: (v: any, obj: any) => v ?? obj?.othernames ?? "",
  },
  {
    dataIndex: "amount",
    title: "Amount",
  },
  {
    dataIndex: "refrence",
    title: "Refrence",
  },
  {
    dataIndex: "date",
    title: "Date",
  },
  {
    dataIndex: "status",
    title: "Status",
    render: (v: any) => <Tag status={v} />,
  },
  {
    title: "Actions",
    align: "center" as "center",
    render: (_: any, data: any) => (
      <Dropdown placement="bottomRight" menu={{ items: getActionItems(data) }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <p style={{ lineHeight: 0 }}>&bull;</p>
          <p style={{ lineHeight: 0 }}>&bull;</p>
          <p style={{ lineHeight: 0 }}>&bull;</p>
        </div>
      </Dropdown>
    ),
  },
];

function getActionItems(data: any): ItemType[] {
  return [
    {
      key: "view",
      label: "View",
      onClick: () => data.viewUser(),
      icon: <EyeOutlined />,
    },
  ];
}

function getFilterItems() {
  return [
    {
      label: "Start Date",
      name: "transaction_date_from",
      type: "date" as const,
      placeholder: "Start Date",
    },
    {
      label: "End Date",
      name: "transaction_date_to",
      type: "date" as const,
      placeholder: "End Date",
    },
    // {
    //   label: "Purchase Order Code",
    //   name: "purchase_order_code",
    //   type: "text" as const,
    //   placeholder: "Purchase Order Code",
    // },
  ];
}
