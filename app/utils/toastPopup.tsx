import { Modal, ModalFuncProps } from "antd";

export default function toastPopUp(
  options: ModalFuncProps,
  onOk: (...args: any[]) => any
) {
  Modal.confirm({
    ...defaultOptions,
    ...options,
    onOk,
  });
}

const defaultOptions: ModalFuncProps = {
  title: "Are you sure?",
  okText: "Yes",
  okType: "danger",
  okButtonProps: { danger: true, type: "primary" },
  cancelText: "No",
};
