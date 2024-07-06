import { useEffect, useMemo } from "react";
import { Form } from "antd";
import { useForm } from "react-hook-form";

// import { useCreateUser, useEditUser } from "v2/lib/api/admin/user";
import { omit } from "lodash";
import Button from "@components/common/Button";
import Input from "@components/common/Input";
import Drawer from "@components/common/Drawer";

interface Props {
  open: boolean;
  user: Record<string, any> | null;
  action: "create" | "edit" | "view";
  onClose: () => void;
  afterMutation?: () => void;
}

export default function UserDrawer(props: Props) {
  const { open, action, user, onClose, afterMutation } = props;
  // const { createUser, isCreatingUser } = useCreateUser();
  // const { editUser, isEditingUser } = useEditUser();

  const { control, formState, handleSubmit, watch, setValue } = useForm();
  const company_id = watch("company_id");
  const department_id = watch("department_id");
  const location_id = watch("location_id");

  const onFormSubmit = async (data: any) => {
    // if (user) {
    //   await editUser(
    //     omit(
    //       {
    //         ...data,
    //         id: user.id,
    //         company_id: Number(data.company_id),
    //         location_id: Number(data.location_id),
    //         department_id: Number(data.department_id),
    //       },
    //       "email"
    //     )
    //   );
    //   afterMutation();
    //   onClose();
    // } else {
    //   await createUser({
    //     firstName: data.firstname,
    //     lastName: data.lastname,
    //     email: data.email,
    //     phone_number: data.phone_number,
    //     company_id: data.company_id,
    //     location_id: data.location_id,
    //     department_id: data.department_id,
    //   });
    //   afterMutation();
    //   onClose();
    // }
  };

  return (
    <Drawer
      title={
        action === "view"
          ? "View User"
          : action === "edit"
          ? "Edit User"
          : "Create User"
      }
      description={
        action !== "view" && action !== "edit"
          ? "Complete this form with accurate data to create a new user on yaraa Platform."
          : ""
      }
      open={open}
      onClose={onClose}
      width={480}
      closable={false}
    >
      <Form layout="vertical" onFinish={handleSubmit(onFormSubmit)}>
        <Input
          type="text"
          name="firstname"
          label="First Name"
          placeholder="Enter first name"
          control={control}
          formState={formState}
          defaultValue={user?.firstname}
          readOnly={action === "view"}
        />
        <Input
          type="text"
          name="lastname"
          label="Last Name"
          placeholder="Enter last name"
          control={control}
          formState={formState}
          defaultValue={user?.lastname}
          readOnly={action === "view"}
        />
        <Input
          type="text"
          name="email"
          label="Email"
          placeholder="Enter email address"
          control={control}
          formState={formState}
          defaultValue={user?.email}
          readOnly={action !== "create"}
        />
        <Input
          type="text"
          name="phone_number"
          label="Phone Number"
          placeholder="Enter phone number"
          control={control}
          formState={formState}
          defaultValue={user?.phone_number}
          readOnly={action === "view"}
        />

        <div className="flex items-center gap-2 pt-2">
          <Button name="Cancel" onClick={onClose} />
          {action !== "view" ? (
            <Button
              type="primary"
              htmlType="submit"
              name="Submit"
              // loading={isCreatingUser || isEditingUser}
            />
          ) : null}
        </div>
      </Form>
    </Drawer>
  );
}
