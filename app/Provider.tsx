"use client";

import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
// import { store } from "./redux/store";

interface IProvider {
  children: ReactNode;
}

export const Provider = ({ children }: IProvider) => (
  // <ReduxProvider store={store}>{children}</ReduxProvider>
  <>{children}</>
);
