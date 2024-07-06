import { InputProps, ModalProps, UploadProps } from "antd";
import { Control, FieldValues, FormState } from "react-hook-form";

export interface CustomInputProps extends InputProps {
  label: string;
  control: Control<FieldValues>;
  name: string;
  formState: FormState<FieldValues>;
  description?: string;
  defaultValue?: any;
  rows?: number;
  uploadProps?: UploadProps;
  renderUpload?: React.ReactNode;
  loadOptions?: () => Promise<any>;
  onInputChange?: (value: string) => void;
  mode?: "multiple" | "tags";
  maxTagCount?: "responsive";
  groupClassName?: string;
  fullWidth?: boolean;
  treeData?: any[];
  treeSearchValue?: string;
  setTreeSearch?: (v: string) => void;
  onTreeLoadData?: any;
  dateProps?: {
    defaultPickerValue?: any;
    disabledDate?: any;
    showTime?: boolean;
    value?: any;
    name?: string;
    onChange?: (date: any, dateString: any) => void;
  };
  loading?: boolean;
  radioOptions?: {
    name: React.ReactNode;
    label: string;
  }[];
  options?: {
    value: string;
    label: string;
  }[];
  onSelect?: (a?: any, b?: any) => any;
  addNew?: boolean;
  onAddressSelect?: (
    address: string,
    // geolocation: google.maps.LatLngLiteral
    geolocation: any
  ) => void;
  addressSearchOptions?: {
    // bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
    // componentRestrictions?: google.maps.places.ComponentRestrictions;
    // location?: google.maps.LatLngLiteral | google.maps.LatLng;
    // locationRestriction?:
    //   | google.maps.LatLngBounds
    //   | google.maps.LatLngBoundsLiteral;
    bounds?: any;
    componentRestrictions?: any;
    location?: any;
    locationRestriction?: any;
    offset?: string | number;
    radius?: string | number;
    sessionToken?: any;
    types?: string[];
  };
  imageAspect?: "square" | "rectangle";
  imageSize?: "small" | "large";
  imageUploadHandler?: (data?: any) => any;
}

export interface ConfirmModalProps extends ModalProps {
  message?: string;
  renderMessage?: React.ReactNode;
}

export interface ApplicationItemDisplayProps {
  title: string;
  description: string;
  icon: string;
  install: (args: string) => void;
  selectedModule?: number | string;
  itsInstalled?: boolean;
  link?: string;
  installed: boolean;
}

export interface AppItem {
  name: string;
  onboardClass?: string;
  itemKey: number;
  installed?: boolean;
  isLoading?: boolean;
  isGray?: boolean;
  link?: string;
}
export interface StepType {
  key: number;
  value: number;
}
export interface ProcessCardProps {
  name: string;
  integrated: boolean;
  onClick: () => void;
  checked?: boolean;
  integration?: string;
  loading?: boolean;
}

export const APPLICATION_MODULES = [
  {
    name: "Sales",
    key: 1,
    link: "",
    isGray: false,
  },
  {
    name: "Contract_Management",
    key: 2,
    link: "",
    isGray: false,
  },
  {
    name: "E-Procurement",
    key: 3,
    link: "/application/module1",
    isGary: false,
    onboardClass: "e-procurement",
  },
  {
    name: "ERP Integration",
    key: 4,
    link: "/integrations/integrated",
    isGray: false,
  },
  // {
  //   name: "Manufacturing",
  //   key: 5,
  //   link: "",
  //   isGray: true,
  // },
  {
    name: "Project_Management",
    key: 5,
    value: "Project Systems",
    link: "",
    isGray: true,
  },
];
