import { ItemType } from "antd/es/menu/interface";

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
