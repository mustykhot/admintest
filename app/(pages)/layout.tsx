import type { Metadata, Viewport } from "next";
import { PropsWithChildren } from "react";
import { PageLayout } from "../PageLayout";
import { Provider } from "../Provider";
import "./Global.scss";
export const viewport: Viewport = {
  themeColor: "#D12431",
};

// export const metadata: Metadata = {
//   metadataBase: new URL("http://localhost:3000"),
//   icons: {
//     shortcut: "/images/icon.png",
//   },
//   title: {
//     template: "%s | Data Resell",
//     default: "Data Resell",
//   },
//   description:
//     "Our innovative platform empowers data sellers to effortlessly monetize their valuable insights, simplifying the process and maximizing profits. Join us in unlocking the full potential of your data-driven business today.",
//   openGraph: {
//     description:
//       "Our innovative platform empowers data sellers to effortlessly monetize their valuable insights, simplifying the process and maximizing profits. Join us in unlocking the full potential of your data-driven business today.",
//     siteName: "Data Resell",
//     url: "https://dataresell.com",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Data Resell",
//     description:
//       "Our innovative platform empowes data sellers to effortlessly monetize their valuable insights, simplifying the process and maximizing profits. Join us in unlocking the full potential of your data-driven business today.",
//   },
// };

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <PageLayout>{children}</PageLayout>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
