import "./Input.scss";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import {
  Input as AntdInput,
  Form,
  DatePicker,
  Select,
  Upload,
  InputNumber,
  Checkbox,
  Radio,
  TreeSelect,
  Switch,
} from "antd";
import AsyncSelect from "react-select/async";
import { useController, Controller } from "react-hook-form";
import InputLabel from "./InputLabel";
import { omit } from "lodash";
import dayjs from "dayjs";
import PhoneInput from "react-phone-number-input";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { CustomInputProps } from "@constants/types";

const Input: React.FC<CustomInputProps> = (props) => {
  const {
    readOnly,
    addonBefore,
    className,
    groupClassName,
    placeholder,
    control,
    name,
    formState,
    type,
    onTreeLoadData,
    options,
    disabled,
    mode,
    label,
    maxTagCount,
    description,
    defaultValue,
    rows,
    min,
    max,
    prefix,
    suffix,
    required,
    loading,
    dateProps,
    uploadProps,
    renderUpload,
    value,
    onChange,
    onInputChange,
    onSelect,
    addonAfter,
    fullWidth,
    treeSearchValue,
    setTreeSearch,
    treeData,
    addNew,
    onAddressSelect,
    addressSearchOptions,
    imageAspect,
    imageSize,
    ...rest
  } = props;
  const { field } = useController({
    control,
    name,
    defaultValue:
      type === "date"
        ? defaultValue
          ? dayjs(defaultValue as string | number, "YYYY-MM-DD")
          : undefined
        : defaultValue ?? "",
  });
  const [multiselectOptions, setMultiselectOptions] = useState(props.options);
  const [multiselectItem, setMultiselectItem] = useState("");
  const [isTypePassword, setisTypePassword] = useState(true);

  const error = formState.errors[name];

  const addMultiselectItem = () => {
    if (multiselectItem && multiselectOptions) {
      setMultiselectOptions([
        ...multiselectOptions,
        { value: multiselectItem, label: multiselectItem },
      ]);
    }
  };

  const addressToGeolocation = async (address: string) => {
    const results = await geocodeByAddress(address);
    const geolocation = await getLatLng(results[0]);
    onAddressSelect?.(address, geolocation);
  };

  useEffect(() => {
    if (
      field.value &&
      ["multiselect", "select"].includes(String(type)) &&
      onChange
    )
      onChange(field.value);
  }, [field.value]);

  const renderInput = () => {
    switch (type) {
      case "file": {
        return (
          <Upload
            {...omit(field, ["value", "ref"])}
            {...uploadProps}
            disabled={disabled}
            className={`yaraa-upload ${className}`}
            accept={props.accept}
          >
            {renderUpload}
          </Upload>
        );
      }
      case "file-drag": {
        return (
          <Upload.Dragger
            {...omit(field, ["value", "ref"])}
            {...uploadProps}
            disabled={disabled}
            className={`yaraa-upload ${className}`}
          >
            {renderUpload}
          </Upload.Dragger>
        );
      }
      case "date": {
        return (
          <DatePicker
            {...dateProps}
            {...{
              ...field,
              value: field?.value ? dayjs(field.value) : undefined,
              onChange: (v, dateString) => {
                field.onChange(v?.format?.());
                dateProps?.onChange?.(v?.format?.(), dateString);
              },
            }}
            defaultValue={defaultValue as any}
            allowClear
            disabled={disabled}
            placeholder={placeholder}
            className={`yaraa-input w-full ${className}`}
            suffixIcon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2V5"
                  stroke="#7B7B7B"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 2V5"
                  stroke="#7B7B7B"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.5 9.08984H20.5"
                  stroke="#7B7B7B"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                  stroke="#7B7B7B"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.6947 13.7002H15.7037"
                  stroke="#7B7B7B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.6947 16.7002H15.7037"
                  stroke="#7B7B7B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.9955 13.7002H12.0045"
                  stroke="#7B7B7B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.9955 16.7002H12.0045"
                  stroke="#7B7B7B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.29431 13.7002H8.30329"
                  stroke="#7B7B7B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.29431 16.7002H8.30329"
                  stroke="#7B7B7B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        );
      }
      case "select":
        return (
          <Select
            {...{ ...field, value: field?.value || undefined }}
            loading={loading}
            className={`yaraa-select ${className}`}
            placeholder={placeholder}
            showSearch
            mode={mode}
            allowClear={rest.allowClear}
            maxTagCount={maxTagCount}
            filterOption={(input, option) => {
              if (!option) return false;
              return (
                String(option?.value)
                  ?.toLowerCase()
                  .indexOf(input?.toLowerCase()) >= 0 ||
                option?.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
              );
            }}
            disabled={disabled}
            defaultValue={defaultValue ?? undefined}
            menuItemSelectedIcon={null}
            options={
              loading
                ? ([{ value: undefined, label: "Loading..." }] as any)
                : options
            }
            onSelect={onSelect}
          />
        );
      case "multiselect":
        return (
          <Select
            {...{ ...field, value: field?.value || undefined }}
            loading={loading}
            className={`yaraa-select ${className}`}
            placeholder={placeholder}
            showSearch
            mode="multiple"
            allowClear={rest.allowClear}
            maxTagCount={maxTagCount}
            filterOption={(input, option: any) => {
              if (!option) return false;
              return (
                String(option?.value)
                  ?.toLowerCase()
                  .indexOf(input?.toLowerCase()) >= 0 ||
                option?.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
              );
            }}
            disabled={disabled}
            defaultValue={defaultValue ?? undefined}
            menuItemSelectedIcon={null}
            options={
              loading
                ? [{ value: "", label: "Loading..." }]
                : multiselectOptions?.filter(
                    (i) => !field?.value?.includes(i.value)
                  )
            }
            onSelect={onSelect}
            dropdownRender={(menu) =>
              addNew ? (
                <div className="flex flex-col gap-1 p-1">
                  <p className="font-medium text-xs text-black/50">
                    Press "Enter" to add a new item
                  </p>
                  <AntdInput
                    placeholder="Add another"
                    value={multiselectItem}
                    onChange={(e) => setMultiselectItem(e.target.value)}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if (e.key === "Enter" && multiselectItem) {
                        addMultiselectItem();
                        field.onChange([...field.value, multiselectItem]);
                        setMultiselectItem("");
                      }
                    }}
                  />
                  {menu}
                </div>
              ) : (
                menu
              )
            }
          />
        );
      case "async_select":
        return (
          <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            //@ts-ignore
            render={({ ref, ...field }) => (
              <AsyncSelect
                {...field}
                defaultValue={defaultValue}
                cacheOptions
                className={`yaraa-select ${className}`}
                placeholder={placeholder}
                showSearch
                mode={"on"}
                defaultOptions
                maxTagCount={maxTagCount}
                {...(value ? { value: value as any } : {})}
                {...(onChange ? { onChange } : {})}
                onInputChange={onInputChange}
                //@ts-ignore
                disabled={disabled}
                suffixIcon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="#7B7B7B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                loadOptions={rest?.loadOptions}
              />
            )}
          />
        );
      case "treeselect":
        return (
          <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            //@ts-ignore
            render={({ ref, ...field }) => (
              <TreeSelect
                loading={loading}
                {...field}
                treeDataSimpleMode={false}
                className={`yaraa-select border border-gray-300 ${className}`}
                placeholder={placeholder}
                showSearch
                treeData={treeData}
                searchValue={treeSearchValue}
                filterTreeNode={false}
                onSearch={(v) => setTreeSearch?.(v)}
                onClear={() => setTreeSearch?.("")}
                loadData={onTreeLoadData}
                {...(value ? { value: value as any } : {})}
                {...(onChange ? { onChange } : {})}
                disabled={disabled}
                allowClear
                style={{ width: "100%" }}
                suffixIcon={
                  <svg
                    fill="rgb(115, 122, 145)"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 10l5 5 5-5z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                }
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              />
            )}
          />
        );
      case "textarea":
        return (
          <AntdInput.TextArea
            {...field}
            disabled={disabled}
            autoComplete={name}
            placeholder={placeholder}
            className={`yaraa-input ${className}`}
            defaultValue={defaultValue}
            readOnly={readOnly}
            {...(Boolean(onChange) ? ({ onChange } as any) : {})}
          />
        );
      case "checkbox":
        return (
          <Checkbox.Group
            {...field}
            {...(value ? { value: value as any } : {})}
            {...(onChange ? { onChange: onChange as any } : {})}
            options={options}
            className="flex flex-col gap-2"
            disabled={disabled}
          >
            {options?.map((option, i) => (
              <Checkbox key={i} value={option?.value} disabled={disabled}>
                {option?.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );
      case "radio":
        return (
          <Radio.Group
            {...field}
            {...(value ? { value: value as any } : {})}
            {...(onChange
              ? { onChange: onChange as any }
              : { onChange: (e) => field?.onChange(e.target.value) })}
            options={options}
            size="large"
            className="flex flex-col gap-2"
          >
            {options?.map((option, i) => (
              <Radio key={i} value={option?.value}>
                {option?.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      case "phone":
        return (
          //@ts-ignore
          <PhoneInput
            className={`yaraa-input ${className} ${error ? "input-error" : ""}`}
            countryCallingCodeEditable={false}
            {...{
              ...field,
              onChange: (val: string) => {
                field.onChange(val);
                onInputChange?.(val);
              },
            }}
            defaultCountry="NG"
            international
            name={name}
          />
        );
      case "password":
        return (
          <div className="relative">
            <AntdInput
              {...{
                ...field,
                onChange: (e) => {
                  field.onChange(e);
                  onInputChange?.(e.target.value);
                },
              }}
              type={isTypePassword ? type : "text"}
              min={min}
              prefix={prefix}
              suffix={suffix}
              addonBefore={addonBefore}
              disabled={disabled}
              defaultValue={defaultValue}
              autoComplete={name}
              placeholder={placeholder}
              className={`yaraa-input ${className}`}
              readOnly={readOnly}
              {...(Boolean(onChange) ? { onChange } : {})}
            />
            <button
              type="button"
              disabled={disabled}
              onClick={() => setisTypePassword((prev) => !prev)}
              className="absolute top-[50%] right-[10px] translate-y-[-50%]"
            >
              {isTypePassword === true ? (
                <EyeInvisibleOutlined size={24} />
              ) : (
                <EyeOutlined size={24} />
              )}
            </button>
          </div>
        );
      case "price": {
        const { onChange, ...rest } = field;
        return (
          <InputNumber
            {...rest}
            {...{
              onChange: (e) => {
                onChange?.(e);
              },
            }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\D/g, "")}
            min={min ?? -Infinity}
            max={max ?? Infinity}
            prefix={prefix}
            suffix={suffix}
            addonBefore={addonBefore}
            disabled={disabled}
            autoComplete={name}
            placeholder={placeholder}
            className={`yaraa-input w-full h-[40px] flex items-center ${className}`}
            readOnly={readOnly}
          />
        );
      }
      case "address":
        return (
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            //@ts-ignore
            render={({ ref, value, onChange }) => (
              <PlacesAutocomplete
                value={value}
                onChange={onChange}
                onSelect={(address) => {
                  onChange(address);
                  addressToGeolocation(address);
                }}
                searchOptions={addressSearchOptions}
              >
                {({
                  loading,
                  suggestions,
                  getInputProps,
                  getSuggestionItemProps,
                }) => (
                  <div className="relative">
                    <AntdInput
                      {...getInputProps({
                        placeholder,
                        size: "large",
                        ref: ref as any,
                        className: "peer",
                        status: error ? "error" : undefined,
                      })}
                    />
                    <div className="absolute top-[105%] z-50 w-full p-1 bg-white shadow-lg rounded-lg hidden peer-focus:block">
                      {loading ? (
                        <div className="px-3 py-2 rounded bg-white hover:bg-[#F5F5F5] cursor-pointer">
                          Loading...
                        </div>
                      ) : suggestions.length ? (
                        suggestions.map((s) => (
                          <div
                            {...getSuggestionItemProps(s, {
                              className:
                                "px-3 py-2 rounded bg-white hover:bg-[#F5F5F5] cursor-pointer",
                            })}
                          >
                            {s.description}
                          </div>
                        ))
                      ) : null}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            )}
          />
        );
      case "switch":
        return (
          <Controller
            name={name}
            defaultValue={Boolean(defaultValue)}
            control={control}
            //@ts-ignore
            render={({ value, onChange }) => (
              <Switch
                value={value}
                onChange={onChange}
                className="bg-[#3335]"
              />
            )}
          />
        );
      default: {
        return (
          <AntdInput
            {...{
              ...field,
              onChange: (e) => {
                field.onChange(e);
                onInputChange?.(e.target.value);
              },
            }}
            type={type}
            min={min}
            prefix={prefix}
            suffix={suffix}
            addonBefore={addonBefore}
            addonAfter={addonAfter}
            disabled={disabled}
            defaultValue={defaultValue}
            autoComplete={name}
            placeholder={placeholder}
            status={rest.status}
            className={`yaraa-input ${className}`}
            readOnly={readOnly}
            {...(Boolean(onChange) ? { onChange } : {})}
          />
        );
      }
    }
  };

  return (
    <Form.Item
      label={
        label ? (
          <InputLabel
            required={required}
            label={label}
            description={description}
          />
        ) : undefined
      }
      validateStatus={error ? "error" : ""}
      //@ts-ignore
      help={error?.message || ""}
      className={
        groupClassName +
        (fullWidth
          ? " w-full [&_div.ant-row]:flex-col  [&_div.ant-row]:items-start [&_div.ant-col]:w-full  [&_div.ant-col]:text-left"
          : "")
      }
    >
      {renderInput()}
    </Form.Item>
  );
};

Input.defaultProps = {
  className: "",
  groupClassName: "",
  label: "",
};

export default Input;
