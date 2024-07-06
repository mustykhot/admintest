"use client";

import Tag from "@components/blocks/Tag";
import Button from "@components/common/Button";
import classes from "@components/styles/buyer.module.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Table from "@components/Table";
import { useMemo } from "react";
import { APPLICATION_MODULES } from "@constants/types";
import ApplicationItem from "@components/blocks/V2ApplicationItem";
import "./style.scss";
const SingleUser = () => {
  const router = useRouter();
  const dataSource = useMemo(() => {
    return [];
  }, []);

  return (
    <div className={`${classes.main_wrapper} pd_user_details_page`}>
      <div className={classes.alt_container}>
        <nav className={classes.nav}>
          <Button
            name="Back"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.back()}
          />
          <h3>User name here</h3>
          {/* <Tag status={"success"} text={"Type"} /> */}
          <div className="flex items-center gap-2 ml-auto">
            <Button name="Delete" danger />
          </div>
        </nav>
        <div className="px-[20px] pt-8">
          <div className="user_details_section">
            <div className="single_detail">
              <p>Name: Raji Mustapha</p>
            </div>
            <div className="single_detail">
              <p>Email: rajimustapha30@gmail.com</p>
            </div>
            <div className="single_detail">
              <p>Satus: user status</p>
            </div>
            <div className="single_detail">
              <p>Role: Admin Role</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-10">
            <p className="text-lg text-black font-bold">User activities</p>
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
              placeholder="Search by First Name or Last Name"
              showHeader
              showFooter
              customPagination={false}
              showPageSizeChanger={true}
              columns={COLUMNS}
              listFilter={false}
              showSort={false}
              showSearch={false}
              // filters={{ items: getFilterItems({ roleOptions, rolesLoading }) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;

const COLUMNS = [
  {
    dataIndex: "event",
    title: "Event Type",
  },
  {
    dataIndex: "description",
    title: "Description",
  },

  {
    dataIndex: "date",
    title: "Date",
  },
];
