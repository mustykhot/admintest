import { startCase } from "lodash";
import { AppItem } from "@constants/types";

const ApplicationItem = (props: AppItem) => {
  const { name, installed, onboardClass } = props;

  return (
    <button
      disabled={true}
      type="button"
      className={`disabled:cursor-not-allowed flex items-center relative justify-between cursor-pointer rounded-2xl shadow-md mb-3 last:mb-0  w-full ${
        installed &&
        "outline outline-2 outline-[#10B2B444] border border-[#10B2B4]"
      } ${onboardClass}`}
    >
      <div className="flex items-center w-full space-x-4 bg-white rounded-2xl p-2 lg:p-4">
        <div>
          <div className="text-[#404040] font-semibold text-base lg:text-xl m-0 p-0">
            {startCase(name)}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ApplicationItem;
