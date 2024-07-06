import Image from "next/image";
import { ReactNode } from "react";
// import backgroundImage from "/images/auth-background.png";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div
      className="w-full min-h-screen flex flex-col justify-end !bg-[#0A3233]"
      style={{
        backgroundImage: `url(/images/auth-background.png)`,
        backgroundColor: "transparent",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full max-w-[1272px] min-h-[88vh] mt-[70px] mx-auto rounded-t-[50px] px-3 pt-3 bg-transparent border border-[#E0E1E18C]">
        <div className="w-full min-h-[88vh] rounded-t-[38px] px-6 py-[120px] pb-6 bg-white">
          <div className="max-w-[444px] min-h-full mx-auto">{children}</div>
        </div>
        <Image
          className="absolute top-6 left-1/2 translate-x-[-50%] w-[120px] h-[120px] rounded-full bg-white"
          src={"/images/ozi.png"}
          alt={"logo"}
          width={120}
          height={120}
        />
      </div>
    </div>
  );
}
