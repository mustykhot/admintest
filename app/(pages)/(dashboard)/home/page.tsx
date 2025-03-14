"use client";

/* react */
import React, { useEffect, useState } from "react";

/* redux */
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "store/store";

/* utility */
import moment from "moment";

/* assets */

/* components */
import IconButton from "@mui/material/IconButton";
import { Button, Dropdown, Spin } from "antd";

/*  styles */
import classes from "./styles.module.scss";
import { startCase } from "lodash";
import Image from "next/image";
import UsersStatsCard from "@components/common/UsersStatsCard";
import StatsCard from "@components/common/StatsCard";

declare global {
  interface Window {
    OneSignal: any;
  }
}

const AdminDashboard = () => {
  // const { dashboard, isLoading } = useSelector(
  //   (state: RootState) => state.installApp
  // );

  // const { user, profile } = useSelector((state: RootState) => state.user);

  // useEffect(() => {
  //   dispatch(getDashboard());
  //   dispatch(updateProfileParent());
  // }, [dispatch]);

  // window.OneSignal = window.OneSignal || [];
  // const OneSignal = window.OneSignal;

  const [loaded, setLoaded] = React.useState(false);

  // const oneSignalMemoized = React.useMemo(() => OneSignal, [OneSignal]);

  // React.useEffect(() => {
  //   setLoaded(true);
  //   oneSignalMemoized.push([
  //     "init",
  //     {
  //       appId: import.meta.env.VITE_APP_BASE_ONESIGNAL,
  //     },
  //   ]);
  // }, [oneSignalMemoized]);

  // useEffect(() => {
  //   /**
  //    * YOUR ONE SIGNAL CONFIGURATION GOES HERE
  //    */
  //   if (loaded) {
  //     OneSignal.push(function () {
  //       OneSignal.isPushNotificationsEnabled(function (isEnabled) {
  //         if (isEnabled) {
  //           OneSignal.getUserId().then(function (userId) {
  //             axios.post(
  //               "https://api.yaraa.stakle.com/users/create_push_subscription",
  //               { fcm_id: userId },
  //               {
  //                 headers: {
  //                   Authorization: `Bearer ${user?.token}`,
  //                 },
  //               }
  //             );
  //             // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316
  //           });

  //           OneSignal.getExternalUserId().then(function (externalUserId) {
  //             if (externalUserId === null) {
  //               let externalUserId = user?.email; // You will supply the external user id to the OneSignal SDK

  //               OneSignal.push(function () {
  //                 OneSignal.setExternalUserId(externalUserId);
  //               });
  //             }
  //           });
  //         }
  //       });
  //       OneSignal.push(function () {
  //         OneSignal.on("notificationDisplay", function (event) {
  //           // Call a method on my functional component
  //           dispatch(getUserNotification(1, 10));
  //         });

  //         //This event can be listened to via the `on()` or `once()` listener
  //       });
  //     });
  //   }
  // }, [loaded, OneSignal, user, dispatch]);

  const [selected, setSelected] = useState("all");

  return (
    <div className={classes.main_wrapper}>
      <div className={classes.container}>
        <header>
          <h2>Dashboard</h2>
        </header>
        <article className={classes.welcome}>
          {true && (
            <>
              <div className={classes.image}>
                <Image
                  src={"/images/ozi.png"}
                  alt="logo"
                  width={98}
                  height={98}
                />
              </div>
              <h4>Welcome Raji</h4>
              <p>
                Below is the summary of your overall users on each application
              </p>
            </>
          )}
        </article>

        <section className={classes.summary}>
          <h3>Business Summary</h3>
          <div className={classes.cards}>
            <UsersStatsCard
              // className={classes.stat_cards}
              value={1000}
              title="Sales"
              icon={<TotalUsersIcon />}
              activeUsers={100}
              InActiveUsers={300}
            />

            <UsersStatsCard
              // className={classes.stat_cards}
              value={2000}
              title="Contract Management"
              activeUsers={100}
              InActiveUsers={300}
            />

            <UsersStatsCard
              // className={classes.stat_cards}
              value={300}
              title="E-Procurement"
              activeUsers={100}
              InActiveUsers={300}
            />

            <UsersStatsCard
              // className={classes.stat_cards}
              value={200}
              title="ERP Integration"
              activeUsers={100}
              InActiveUsers={300}
            />
            <UsersStatsCard
              // className={classes.stat_cards}
              value={200}
              title="Projecty Systems"
              activeUsers={100}
              InActiveUsers={300}
            />
          </div>
        </section>
        <section className={classes.summary}>
          <h3>Subscription Transactions</h3>
          <div className={classes.cards}>
            <StatsCard
              // className={classes.stat_cards}
              value={1000}
              title="Active"
              icon={<TotalUsersIcon />}
            />
            <StatsCard
              // className={classes.stat_cards}
              value={1000}
              title="Inactive"
              icon={<TotalUsersIcon />}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;

const TotalUsersIcon: () => JSX.Element = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.5 20.25H14.5C14.09 20.25 13.75 19.91 13.75 19.5C13.75 19.09 14.09 18.75 14.5 18.75H18.5C18.91 18.75 19.25 19.09 19.25 19.5C19.25 19.91 18.91 20.25 18.5 20.25Z"
      fill="#10b2b4"
    />
    <path
      d="M16.5 22.25C16.09 22.25 15.75 21.91 15.75 21.5V17.5C15.75 17.09 16.09 16.75 16.5 16.75C16.91 16.75 17.25 17.09 17.25 17.5V21.5C17.25 21.91 16.91 22.25 16.5 22.25Z"
      fill="#10b2b4"
    />
    <path
      d="M12.1607 11.62C12.1307 11.62 12.1107 11.62 12.0807 11.62C12.0307 11.61 11.9607 11.61 11.9007 11.62C9.00068 11.53 6.81068 9.25 6.81068 6.44C6.80068 5.06 7.34068 3.76 8.32068 2.78C9.30068 1.8 10.6007 1.25 11.9907 1.25C14.8507 1.25 17.1807 3.58 17.1807 6.44C17.1807 9.25 14.9907 11.52 12.1907 11.62C12.1807 11.62 12.1707 11.62 12.1607 11.62ZM11.9907 2.75C11.0007 2.75 10.0807 3.14 9.38068 3.83C8.69068 4.53 8.31068 5.45 8.31068 6.43C8.31068 8.43 9.87068 10.05 11.8607 10.11C11.9207 10.1 12.0507 10.1 12.1807 10.11C14.1507 10.02 15.6807 8.41 15.6807 6.43C15.6807 4.41 14.0207 2.75 11.9907 2.75Z"
      fill="#10b2b4"
    />
    <path
      d="M11.9902 22.5599C9.95016 22.5599 8.02016 22.0299 6.56016 21.0499C5.17016 20.1199 4.41016 18.8499 4.41016 17.4799C4.41016 16.1099 5.18016 14.8499 6.56016 13.9299C9.55016 11.9299 14.4102 11.9299 17.4002 13.9299C17.7402 14.1599 17.8402 14.6299 17.6102 14.9699C17.3802 15.3199 16.9102 15.4099 16.5702 15.1799C14.0802 13.5199 9.88016 13.5199 7.39016 15.1799C6.43016 15.8199 5.91016 16.6299 5.91016 17.4799C5.91016 18.3299 6.43016 19.1599 7.39016 19.7999C8.60016 20.6099 10.2302 21.0499 11.9802 21.0499C12.3902 21.0499 12.7302 21.3899 12.7302 21.7999C12.7302 22.2099 12.4002 22.5599 11.9902 22.5599Z"
      fill="#10b2b4"
    />
  </svg>
);
