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

const SingleBusiness = () => {
  const router = useRouter();
  const dataSource = useMemo(() => {
    return [];
  }, []);

  return (
    <div className={classes.main_wrapper}>
      <div className={classes.alt_container}>
        <nav className={classes.nav}>
          <Button
            name="Back"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.back()}
          />
          <h3>Business name here</h3>
          <Tag status={"success"} text={"Type"} />
          <div className="flex items-center gap-2 ml-auto">
            <Button type="dashed" name="Blacklist" />
            <Button name="Delete" danger />
          </div>
        </nav>
        <div className="px-[20px] pt-8">
          <div className="flex flex-col gap-2">
            <p className="text-lg text-black font-bold">Applications</p>
            {APPLICATION_MODULES.map((item) => (
              <ApplicationItem
                key={item.key}
                itemKey={item.key}
                name={item.value ?? item.name}
                onboardClass={item.onboardClass}
                isGray={item.isGray}
                installed={true}
              />
            ))}
          </div>

          <div className="flex flex-col gap-2 mt-10">
            <p className="text-lg text-black font-bold">Transaction history</p>
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

export default SingleBusiness;

const COLUMNS = [
  {
    dataIndex: "amount",
    title: "Amount",
  },
  {
    dataIndex: "reference",
    title: "Reference",
  },

  {
    dataIndex: "date",
    title: "Date",
  },
];
