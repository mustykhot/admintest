import ConfirmModalContent from "@components/blocks/ConfirmModal";
import { ConfirmModalProps } from "@constants/types";
import { Modal } from "antd";
import { ItemType } from "antd/es/menu/interface";
import { RcFile } from "antd/es/upload";
import { omit } from "lodash";

export const formatNumber = ({
  number,
  isCurrency = false,
  currency = "",
  notation = "standard",
}: {
  number: number;
  isCurrency?: boolean;
  currency?: "NGN" | "USD" | "GBP" | "";
  notation?: "compact" | "standard";
}): string => {
  const locale = "en-Gb";
  const numberToFormat = number || 0;
  return isCurrency && currency
    ? new Intl.NumberFormat(locale, {
        currency,
        currencyDisplay: "narrowSymbol",
        currencySign: "accounting",
        notation,
        style: "currency",
      }).format(numberToFormat)
    : new Intl.NumberFormat(locale, { notation }).format(numberToFormat);
};

export const confirmationModal = (props: ConfirmModalProps) => {
  const { title, message, renderMessage } = props;
  return Modal.confirm({
    cancelText: "Cancel",
    centered: true,
    className: "yaraa-confirmation-modal",
    closable: false,
    content: ConfirmModalContent({ message, renderMessage, title }),
    icon: null,
    okText: "Confirm",
    width: 350,
    ...omit(props, ["title", "message", "renderMessage"]),
  });
};

export const setOnboardingState = (
  email: string,
  data: Record<string, boolean>
) => {
  window.localStorage.setItem(
    `yaraa-onboard-${email}`,
    JSON.stringify({
      installation: false,
      settings: false,
      userManagement: false,
      userManagementProcuement: false,
      supplier: false,
      budget: false,
      requisition: false,
    })
  );
};

export const clearLocalStorage = (exclude: string[]) => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key && exclude.indexOf(key) === -1) {
      localStorage.removeItem(key);
    }
  }
};

export const REGEX = {
  number: /^\d*$/i,
  uuid: /\b[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\b/g,
};

export function getInvoiceStatusEnum(word: string) {
  if (word.toLowerCase() === "draft") return "-2";
  if (word.toLowerCase() === "pending") return "-1";
  if (word.toLowerCase() === "approved") return "1";
  if (word.toLowerCase() === "paid") return "2";
  if (word.toLowerCase() === "parked") return "3";
  if (word.toLowerCase() === "posted") return "4";
  return "5";
}

export function getInvoiceStatusWord(enumValue: string) {
  if (enumValue === "-2") return "Draft";
  if (enumValue === "-1") return "Pending";
  if (enumValue === "1") return "Approved";
  if (enumValue === "2") return "Paid";
  if (enumValue === "3") return "Parked";
  if (enumValue === "4") return "Posted";
  return "Posted";
}

export function getPOStatusWord(enumValue: string) {
  if (enumValue === "-2") return "Draft";
  if (enumValue === "-1") return "Pending";
  if (enumValue === "1") return "Approved";
  if (enumValue === "2") return "Accepted";
  if (enumValue === "3") return "Out for Delivery";
  if (enumValue === "4") return "Partially Delivered";
  if (enumValue === "5") return "Delivered";
}

export function getRequisitionStatusWord(status: string) {
  if (status === "-2") return "Draft";
  if (status === "-1") return "Pending";
  if (status === "1") return "Approved";
  if (status === "2") return "RFx Generated";
  if (status === "3") return "Completed";
  return "Draft";
}

export function getUserStatusWord(status: string) {
  if (status === "0") return "Inactive";
  return "Active";
}

export function getDocumentStatusWord(status: string) {
  if (status === "1") return "Verified";
  if (status === "2") return "Expired";
  if (status === "-1") return "Pending";
  return "Draft"; // status === -2
}

export function getBidStatusWord(enumValue: string) {
  if (enumValue === "-2") return "Declined";
  if (enumValue === "-1") return "Pending";
  if (enumValue === "1") return "Accepted";
  if (enumValue === "2") return "Submitted";
  if (enumValue === "3") return "Disqualified";
  if (enumValue === "4") return "Negotiation";
  if (enumValue === "5") return "Awarded";
  if (enumValue === "open") return "Open";
  if (enumValue === "closed") return "Closed";
}

export function getPaymentProposalStatusWord(status: any) {
  if (status === "-3") return "Rejected";
  if (status === "-2") return "Payment Proposal Created";
  if (status === "-1") return "Pending Approval";
  if (status === "1") return "Approved";
  if (status === "2") return "Paid";
  if (status === "3") return "Parked";
  if (status === "4") return "Posted";
  if (status === "5") return "Paid";
}

export function getBankProposalStatusWord(status: any) {
  if (status === "-2") return "In Bank Selection";
  if (status === "-1") return "Authoriser Approval";
  if (status === "1") return "Approved";
}

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export function formatDate(date: any) {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function getCleanObject(object: Record<string, any>) {
  const cleanObject: Record<string, any> = {};

  for (const key in object) {
    if (object[key]) cleanObject[key] = object[key];
  }

  return cleanObject;
}

export function getMenuSelectedKeys(
  pathname: string,
  items: ItemType[],
  manualSelectedKey?: string
) {
  if (manualSelectedKey) {
    return [manualSelectedKey];
  }
  return (items.find((item) => pathname.startsWith(item?.key as string))
    ?.key || [pathname]) as string[];
}

export function getPaginationText(limit: number, page: number, total: number) {
  let start = page;
  if (page > 1) start = limit * (page - 1) + 1;
  let end = start + limit - 1;
  if (start > total) start = total;
  if (end > total) end = total;

  if (!total) return "";

  return `Showing results ${start} - ${end} of ${total}`;
}

export function getFieldInputType(type: string) {
  if (["File", "Image"].includes(type)) return "file";
  return type.toLowerCase();
}

export function getActiveApp(pathname: string, active?: string) {
  let activeApp = "app";
  if (pathname?.startsWith("/project-systems")) activeApp = "projects";
  else if (pathname?.startsWith("/admin")) activeApp = "app";
  else if (pathname?.startsWith("/e-procurement")) activeApp = "procurement";
  else if (pathname?.startsWith("/contract-management")) activeApp = "contract";
  else if (pathname?.startsWith("/sales")) activeApp = "sales";
  else if (pathname?.startsWith("/manufacturing")) activeApp = "manufacturing";
  else if (pathname?.startsWith("/integration")) activeApp = "integration";
  else activeApp = active || localStorage.getItem("menu-key") || activeApp;
  return activeApp;
}
