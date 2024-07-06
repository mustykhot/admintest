import React, { useEffect } from "react";
import {
  Dropdown,
  Input,
  Table as AntdTable,
  Button,
  Typography,
  Popover,
  Form,
} from "antd";
import "./Table.scss";
import { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AppInput from "../common/Input";
import AppButton from "../common/Button";
import Download from "./Components/Download";
import { ItemType } from "antd/es/menu/interface";
import { CustomInputProps } from "@constants/types";
import { getPaginationText } from "@utils/index";

interface IProps<T> {
  columns?: ColumnsType<Record<string, any>>;
  dataSource?: T[];
  showHeader?: boolean;
  showFooter?: boolean;
  placeholder?: string;
  rowSelection?: TableRowSelection<Record<string, any>>;
  loading?: boolean;
  meta?: Record<string, any>;
  customPagination?: boolean;
  className?: string;
  filterBtnName?: string;
  cards?: {
    title: string;
    value?: string;
    small?: string;
    onClick?: () => void;
  }[];
  listFilter?: boolean;
  formFilter?: boolean;
  showPageSizeChanger?: boolean;
  showSort?: boolean;
  showSearch?: boolean;
  setFilterTerm?: any;
  filterTerm?: any;
  onChange?: any;
  filters?: {
    items: Omit<CustomInputProps, "control" | "formState">[];
  };
  onRow?: any;
  pagination?:
    | {
        page: number;
        pageLimit: number;
      }
    | false;
  sortItems?: ItemType[];
  rowKey?: any;
  onChangePage?: any;
  onChangePageLimit?: any;
  extraHeader?: JSX.Element;
  bottomHeader?: boolean;
  tableTitle?: string;
  actionButton?: JSX.Element;
  filterComponent?: JSX.Element;
  showDownload?: boolean;
  expandable?: any;
  expandIcon?: React.ReactNode;
  downloadData?: {
    name: string;
    downloadCb: () => Promise<any>;
  };
  setFilter?: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
  setPagination?: React.Dispatch<
    React.SetStateAction<{
      page: number;
      pageLimit: number;
    }>
  >;
  extraHeaders?: React.ReactNode;
  filterItems?: ItemType[];
  summary?:
    | ((data: readonly Record<string, any>[]) => React.ReactNode)
    | undefined;
}

const Table = <T extends Record<string, any>>(
  props: IProps<T>
): JSX.Element => {
  const {
    columns,
    cards,
    className,
    dataSource,
    showHeader,
    showFooter,
    placeholder,
    loading,
    setPagination,
    setFilter,
    summary,
    showPageSizeChanger,
    showSort,
    filterBtnName,
    showSearch,
    filterItems,
    filters,
    listFilter,
    setSearchTerm,
    customPagination,
    meta,
    pagination,
    rowSelection,
    onRow,
    rowKey = "id",
    sortItems,
    extraHeader,
    bottomHeader,
    tableTitle,
    actionButton,
    filterComponent,
    showDownload,
    downloadData,
    extraHeaders,
    expandable,
  } = props;

  const PAGE_SIZE_ITEMS: ItemType[] = [
    {
      key: "10",
      label: "10",
      onClick: ({ key }) =>
        setPagination?.((prev) => ({ ...prev, pageLimit: +key })),
    },
    {
      key: "20",
      label: "20",
      onClick: ({ key }) =>
        setPagination?.((prev) => ({ ...prev, pageLimit: +key })),
    },
    {
      key: "30",
      label: "30",
      onClick: ({ key }) =>
        setPagination?.((prev) => ({ ...prev, pageLimit: +key })),
    },
  ];
  const { control, handleSubmit, reset, formState } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (payload: any) => {
    setFilter?.({
      ...payload,
    });
    setPagination?.((prev) => ({ ...prev, page: 1 }));
  };

  function handleReset() {
    if (filters?.items) {
      let payload = {};
      filters.items.forEach((item) => {
        //@ts-ignore
        payload[item.name] = "";
      });
      reset(payload);
    }
  }

  useEffect(() => {
    handleReset();
  }, []);

  useEffect(() => {
    window.onload = function () {
      sessionStorage.removeItem("payloadData");
    };
  });

  const Header = (
    <div className="flex flex-col gap-3 md:space-y-0 md:flex-row md:items-center md:justify-between font-primary items-center">
      {showSearch && (
        <div className="max-w-xs w-full">
          <Input
            allowClear
            onChange={(e) => setSearchTerm?.(e.target.value)}
            placeholder={placeholder || "Search"}
            className="yaraa-search-input"
            prefix={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.58335 17.4998C13.9556 17.4998 17.5 13.9554 17.5 9.58317C17.5 5.21092 13.9556 1.6665 9.58335 1.6665C5.2111 1.6665 1.66669 5.21092 1.66669 9.58317C1.66669 13.9554 5.2111 17.4998 9.58335 17.4998Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.3334 18.3332L16.6667 16.6665"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
      )}
      <div className="flex space-x-2 mdiv">
        {showPageSizeChanger && pagination && (
          <Dropdown menu={{ items: PAGE_SIZE_ITEMS }}>
            <Button className="!px-2.5 !rounded-lg !text-black !text-opacity-50 !h-[2.125rem] flex items-center gap-2">
              Show: {pagination?.pageLimit}{" "}
              <svg
                className="ml-1"
                width="10"
                height="7"
                viewBox="0 0 10 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.29301 0.332031C9.71227 0.332031 9.94536 0.816997 9.68345 1.14438L5.39043 6.51065C5.19027 6.76086 4.80972 6.76086 4.60956 6.51065L0.316539 1.14438C0.0546331 0.816996 0.287721 0.332031 0.706974 0.332031L9.29301 0.332031Z"
                  fill="#7B7B7B"
                />
              </svg>
            </Button>
          </Dropdown>
        )}
        {Boolean(filters) && (
          <Popover
            trigger={["click"]}
            overlayClassName={
              (filters?.items?.length ?? 0) > 4
                ? "yaraa-app-wide-filter-popover"
                : "yaraa-app-filter-popover"
            }
            placement="bottomLeft"
            content={
              <Form
                onFinish={handleSubmit(onSubmit)}
                layout="vertical"
                className="bg-[#F7FAFA] p-2 lg:p-4  rounded-md !max-w-md !w-full"
              >
                <div
                  className={`grid gap-x-5 gap-y-0 ${
                    (filters?.items?.length ?? 0) > 4
                      ? "grid-cols-2"
                      : "grid-cols-1"
                  }`}
                >
                  {filterComponent ? filterComponent : null}
                  {filters?.items?.map((value) => (
                    <AppInput
                      className="font-primary"
                      key={value.name}
                      {...value}
                      control={control}
                      formState={formState}
                      required={false}
                    />
                  ))}
                </div>
                {Boolean(filters?.items?.length) && (
                  <div className="!mt-4 flex  justify-end md:!mt-5">
                    <AppButton
                      name="Clear"
                      type="dashed"
                      loading={loading}
                      className="flex justify-center w-[50%]"
                      onClick={() => {
                        handleReset();
                        setFilter?.(() => ({}));
                        sessionStorage.removeItem("payloadData");
                      }}
                    />
                    <AppButton
                      name="Submit"
                      type="primary"
                      loading={loading}
                      className=" flex justify-center ml-3 w-[50%]"
                      htmlType="submit"
                    />
                  </div>
                )}
              </Form>
            }
          >
            <Button className="!px-2.5 !rounded-lg !text-black !text-opacity-50 !h-[2.125rem] flex items-center gap-2">
              {"Filters"}{" "}
              <svg
                className="ml-1"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.6 1.3999H12.4C13.1333 1.3999 13.7333 1.9999 13.7333 2.73324V4.1999C13.7333 4.73324 13.4 5.3999 13.0667 5.73324L10.2 8.26657C9.8 8.5999 9.53333 9.26657 9.53333 9.7999V12.6666C9.53333 13.0666 9.26667 13.5999 8.93333 13.7999L8 14.3999C7.13333 14.9332 5.93333 14.3332 5.93333 13.2666V9.73324C5.93333 9.26657 5.66667 8.66657 5.4 8.33324L2.86667 5.66657C2.53333 5.33324 2.26667 4.73324 2.26667 4.33324V2.7999C2.26667 1.9999 2.86667 1.3999 3.6 1.3999Z"
                  stroke="#7B7B7B"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.28667 1.3999L4 6.66657"
                  stroke="#7B7B7B"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </Popover>
        )}
        {listFilter &&
          (filterItems ? (
            <Dropdown menu={{ items: filterItems || [] }}>
              <Button className="!px-2.5 !rounded-lg !text-black !text-opacity-50 !h-[2.125rem] flex items-center gap-2">
                {filterBtnName || "Filter"}{" "}
                <svg
                  className="ml-1"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.6 1.3999H12.4C13.1333 1.3999 13.7333 1.9999 13.7333 2.73324V4.1999C13.7333 4.73324 13.4 5.3999 13.0667 5.73324L10.2 8.26657C9.8 8.5999 9.53333 9.26657 9.53333 9.7999V12.6666C9.53333 13.0666 9.26667 13.5999 8.93333 13.7999L8 14.3999C7.13333 14.9332 5.93333 14.3332 5.93333 13.2666V9.73324C5.93333 9.26657 5.66667 8.66657 5.4 8.33324L2.86667 5.66657C2.53333 5.33324 2.26667 4.73324 2.26667 4.33324V2.7999C2.26667 1.9999 2.86667 1.3999 3.6 1.3999Z"
                    stroke="#7B7B7B"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.28667 1.3999L4 6.66657"
                    stroke="#7B7B7B"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </Dropdown>
          ) : (
            <Button className="!px-2.5 !rounded-lg !text-black !text-opacity-50 !h-[2.125rem]">
              {filterBtnName || "Filter"}{" "}
              <svg
                className="ml-1"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.6 1.3999H12.4C13.1333 1.3999 13.7333 1.9999 13.7333 2.73324V4.1999C13.7333 4.73324 13.4 5.3999 13.0667 5.73324L10.2 8.26657C9.8 8.5999 9.53333 9.26657 9.53333 9.7999V12.6666C9.53333 13.0666 9.26667 13.5999 8.93333 13.7999L8 14.3999C7.13333 14.9332 5.93333 14.3332 5.93333 13.2666V9.73324C5.93333 9.26657 5.66667 8.66657 5.4 8.33324L2.86667 5.66657C2.53333 5.33324 2.26667 4.73324 2.26667 4.33324V2.7999C2.26667 1.9999 2.86667 1.3999 3.6 1.3999Z"
                  stroke="#7B7B7B"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.28667 1.3999L4 6.66657"
                  stroke="#7B7B7B"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          ))}
        {showSort && (
          <Dropdown menu={{ items: sortItems || [] }}>
            <Button className="!px-2.5 !rounded-lg !text-black !text-opacity-50 !h-[2.125rem] flex items-center gap-2">
              Sort{" "}
              <svg
                className="ml-1"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4.6665H14"
                  stroke="#7B7B7B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M4 8H12"
                  stroke="#7B7B7B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M6.66666 11.3335H9.33333"
                  stroke="#7B7B7B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </Button>
          </Dropdown>
        )}
        {actionButton && actionButton}
        {showDownload && downloadData && (
          <Download
            name={downloadData?.name || ""}
            downloadCb={downloadData?.downloadCb}
          />
        )}
      </div>
    </div>
  );

  return (
    <section className="w-full flex flex-col gap-3">
      {showHeader && !bottomHeader && Header}
      {cards ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {cards.map(({ title, value, onClick, small }) => (
            <div
              key={title}
              onClick={() => onClick && onClick()}
              className={`bg-white flex  justify-between items-end rounded-xl border border-[#F5F5F5] min-h-[120px] py-4 px-6 ${
                onClick ? "cursor-pointer" : ""
              } `}
            >
              <div className="flex flex-col  ">
                <Typography.Text className="font-bold text-[2rem] leading-[3rem] text-[#111111] font-primary">
                  {value ?? 0}
                </Typography.Text>
                <Typography.Text className="text-sm text-[#7B7B7B] font-primary">
                  {title}
                </Typography.Text>
                {small && (
                  <Typography.Text className="text-xs  text-[#0970AA] font-primary">
                    {small}
                  </Typography.Text>
                )}
              </div>
              <div className="self-start">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.3333 11.3334C29.3333 16.1201 25.4533 20.0001 20.6667 20.0001C20.44 20.0001 20.2 19.9868 19.9733 19.9734C19.64 15.7468 16.2533 12.3601 12.0267 12.0267C12.0133 11.8001 12 11.5601 12 11.3334C12 6.54675 15.88 2.66675 20.6667 2.66675C25.4533 2.66675 29.3333 6.54675 29.3333 11.3334Z"
                    stroke="#10B2B4"
                    strokeWidth="2.0625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.0003 20.6664C20.0003 25.4531 16.1203 29.3331 11.3337 29.3331C6.54699 29.3331 2.66699 25.4531 2.66699 20.6664C2.66699 15.8798 6.54699 11.9998 11.3337 11.9998C11.5603 11.9998 11.8003 12.0131 12.027 12.0264C16.2536 12.3597 19.6403 15.7464 19.9737 19.9731C19.987 20.1998 20.0003 20.4398 20.0003 20.6664Z"
                    stroke="#10B2B4"
                    strokeWidth="2.0625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.16 19.4932L11.3333 17.3333L12.5067 19.4932L14.6667 20.6666L12.5067 21.8399L11.3333 23.9999L10.16 21.8399L8 20.6666L10.16 19.4932Z"
                    stroke="#10B2B4"
                    strokeWidth="2.0625"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {extraHeaders}
      <div className="relative flex flex-col gap-3">
        {extraHeader ? extraHeader : null}
        {tableTitle ? <h3>{tableTitle}</h3> : null}
        {showHeader && bottomHeader && Header}
        <AntdTable
          rowKey={rowKey}
          className={`yaraa-table ${className}`}
          scroll={{ x: "max-content" }}
          rowSelection={rowSelection}
          expandable={expandable}
          pagination={
            pagination
              ? customPagination
                ? {
                    hideOnSinglePage: false,
                    showSizeChanger: false,
                  }
                : {
                    hideOnSinglePage: false,
                    showSizeChanger: false,
                    current: +meta?.currentPage || meta?.page || 1,
                    total:
                      meta?.total || meta?.total_records || meta?.count || 0,
                    pageSize: pagination?.pageLimit || 10,
                    onChange: (page, size) =>
                      setPagination?.((prev) => ({
                        ...prev,
                        page,
                        pageLimit: size,
                      })),
                  }
              : false
          }
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          summary={summary}
          onRow={onRow}
        />
        {showFooter && pagination && (meta?.total || meta?.total_records) ? (
          <Typography.Text className="absolute bottom-5 font-primary text-black text-opacity-60">
            {getPaginationText(
              Number(pagination?.pageLimit ?? 10),
              Number(pagination?.page ?? 1),
              Number(meta?.total ?? meta?.total_records ?? meta?.count)
            )}
          </Typography.Text>
        ) : null}
      </div>
    </section>
  );
};

Table.defaultProps = {
  showSearch: true,
  showPageSizeChanger: true,
  showSort: true,
  className: "",
  listFilter: true,
  bottomHeader: false,
};

export default Table;
