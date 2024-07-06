"use client";

import Button from "@components/common/Button";
import Input from "@components/common/Input";
import { Form } from "antd";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const { control, formState, handleSubmit } = useForm<FormData>({});

  const login = async (data: FormData) => {
    console.log(data);
    // dispatch(
    //   loginRequest(data, () => {
    //     localStorage.setItem("menu-key", MENU_KEY[app] || "app");
    //     history.push(REDIRECT_URL[app] || "/e-procurement/dashboard");
    //   })
    // );
  };

  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div>
      <Form layout="vertical" onFinish={handleSubmit(login)}>
        <div className="flex flex-col gap-6">
          <article className="flex flex-col gap-1">
            <p className="text-2xl">Login to admin dashboard</p>
            <p className="text-sm text-[#00000080]">
              Welcome, enter your email address and password to access your
              dashboard
            </p>
          </article>
          <div>
            <Input
              name="username"
              label="Email Address"
              placeholder="Enter email address"
              control={control as any}
              formState={formState}
              type="email"
            />
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Enter password"
              control={control as any}
              formState={formState}
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            name="LOGIN"
            size="large"
            className="justify-center"
            // loading={isLoading}
          />

          <article className="flex flex-col items-center gap-6">
            <p className="text-xs">
              Forget Password?&nbsp;
              <Link
                className="text-[#0970AA] underline"
                href="/forgot-password"
              >
                Recover password
              </Link>
            </p>
          </article>
        </div>
      </Form>
    </div>
  );
};

export default Login;
