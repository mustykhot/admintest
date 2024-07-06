"use client";
import { useMemo, useState } from "react";
import classes from "@components/styles/buyer.module.scss";
// import toastPopUp from "v2/utils/toastPopup";
// import useGetUsersAccount from "v2/hooks/useGetUsersAccount";
// import usePostResendUserActivation from "v2/hooks/usePostResendUserActivation";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SendOutlined,
} from "@ant-design/icons";
// import useGetUserRoles from "v2/hooks/useGetUserRoles";
import UserDrawer from "./drawer";
// import { useDeleteUser } from "v2/lib/api/admin/user";
import Dropdown from "@components/common/Dropdown";
import { ItemType } from "antd/es/menu/interface";
import Button from "@components/common/Button";
import Tag from "@components/blocks/Tag";
import Table from "@components/Table";

export default function Users() {
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

  // function deleteUser(id: string, name: string) {
  //   toastPopUp({ title: `Delete ${name}?` }, () => {
  //     postDeleteUser(id).then(() => refetchUsers());
  //   });
  // }

  const counts = {
    users: 0,
  };

  // const roleOptions = useMemo(() => {
  //   return roles?.data?.map((role) => ({
  //     value: role.id,
  //     label: role.user_role_name,
  //   }));
  // }, [roles]);

  const dataSource = useMemo(() => {
    return [];
  }, []);

  return (
    <>
      <div className="flex justify-end w-full">
        <Button
          type="primary"
          name="Create user"
          onClick={() => {
            setUser(null);
            setDrawerAction("create");
            setDrawerOpen(true);
          }}
        />
      </div>

      <section className={classes.content}>
        <Table
          // loading={loading}
          dataSource={dataSource}
          // meta={{
          //   currentPage: data?.currentPage,
          //   total: data?.total,
          //   pageSize: data?.perpage,
          // }}
          // pagination={pagination}
          // setPagination={setPagination}
          // setFilter={setFilter}
          // setSearchTerm={setSearchTerm}
          placeholder="Search by First Name or Last Name"
          showHeader
          showSearch
          showFooter
          customPagination={false}
          showPageSizeChanger={true}
          // @ts-ignore
          columns={COLUMNS}
          cards={getCards(counts)}
          listFilter={false}
          showSort={false}
          // filters={{ items: getFilterItems({ roleOptions, rolesLoading }) }}
        />
      </section>
      <UserDrawer
        open={drawerOpen}
        user={user}
        action={drawerAction}
        onClose={() => setDrawerOpen(false)}
        // afterMutation={refetchUsers}
      />
    </>
  );
}

function getCards(counts: { users: any }) {
  return [{ title: "Users", value: counts.users }];
}

const COLUMNS = [
  {
    dataIndex: "firstname",
    title: "First Names",
    render: (v: any, obj: { othernames: any }) => v ?? obj?.othernames ?? "",
  },
  {
    dataIndex: "lastname",
    title: "Last Name",
  },
  {
    dataIndex: "phone_number",
    title: "Phone Number",
  },
  {
    dataIndex: "email",
    title: "Email",
  },
  {
    dataIndex: "status",
    title: "Status",
    render: (v: any) => <Tag status={v} />,
  },
  {
    dataIndex: "role",
    title: "Role",
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
    {
      key: "edit",
      label: "Edit",
      onClick: () => data.editUser(),
      icon: <EditOutlined />,
    },
    {
      key: "resend",
      label: "Resend",
      onClick: () => data.resend(),
      icon: <SendOutlined />,
    },
    {
      key: "delete",
      label: "Delete",
      danger: true,
      className: classes.procurement_users_delete,
      onClick: () => data.deleteUser(),
      icon: <DeleteOutlined style={{ color: "#FF3333" }} />,
    },
  ];
}

// function getFilterItems({ roleOptions, rolesLoading }) {
//   return [
//     {
//       name: "role",
//       type: "select",
//       label: "Role",
//       placeholder: "Select a role",
//       options: roleOptions,
//       loading: rolesLoading,
//     },
//   ];
// }
