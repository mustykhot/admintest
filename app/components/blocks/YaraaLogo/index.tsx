import Image from "next/image";
import React from "react";

export default function YaraaLogo() {
  return (
    <button className="flex items-center gap-1" type="button">
      <Image width={41} height={39} src={"/images/ozi.png"} alt="logo" />
      <h1 className="text-[#10B2B4] font-primary font-medium text-sm lg:text-xl leading-[31px]">
        yaraa.io
      </h1>
    </button>
  );
}
