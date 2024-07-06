import * as XLSX from "xlsx-js-style";
import Button from "@components/common/Button";
import { LoadingOutlined } from "@ant-design/icons";

// import { toastr } from "react-redux-toastr";

type Props = {
  fileName: string;
  text: string;
  jsonData:
    | { [key: string]: string | number }[]
    | ((cb: (json: any[]) => void) => void);
  loadingData?: boolean;
  buttonType?: "dashed" | "default" | "link" | "primary" | "text";
  className?: string;
};

/**
 * fileName: the name of the file when downloaded
 * text: text to be displayed in the download button
 * jsonData: either a json data or a callback which calls exportToExcel on a json data
 * loadingData: if the json data is being fetched
 * buttonType: the type of button
 * className: class passed to the button element
 */

export default function JSONToExcel({
  jsonData,
  fileName,
  className,
  text,
  buttonType,
  loadingData,
}: Props) {
  const fileExtension = ".xlsx";

  const exportToExcel = async (js: any[]) => {
    const ws = XLSX.utils.json_to_sheet(js);
    function fitToColumn(data: any[]) {
      const widths: any[] = [];
      for (const field in data[0]) {
        const wid = Math.max(
          field.length,
          ...data.map((item) => item[field]?.toString()?.length ?? 0)
        );
        widths.push({
          wch: wid > 35 ? 35 : wid < 20 ? 20 : wid,
          isTextWrapped: true,
        });
      }
      return widths;
    }
    ws["!cols"] = fitToColumn(js);

    for (let i in ws) {
      if (typeof ws[i] === "object") {
        let cell = XLSX.utils.decode_cell(i);

        ws[i].s = {
          // styling for all cells
          font: {
            name: "arial",
          },
          alignment: {
            vertical: "center",
            horizontal: "center",
            wrapText: "1", // any truthy value here
          },
          border: {
            right: {
              style: "thin",
              color: "000000",
            },
            left: {
              style: "thin",
              color: "000000",
            },
          },
          innerWidth: 200,
          outerWidth: 210,
        };

        if (cell.r === 0) {
          // first row
          ws[i].s = {
            font: {
              name: "Calibri",
              bold: true,
              color: { rgb: "000000" },
            },
            fill: {
              patternType: "solid",
              bgColor: { rgb: "00000044" },
            },

            alignment: {
              horizontal: "center",
              vertical: "center",
              wrapText: "1",
            },
            outerWidth: 10,
          };
        }

        /* if (cell.c % 2) {
          // every other row
          ws[i].s.fill = {
            // background color
            patternType: "solid",
            fgColor: { rgb: "b2b2b2" },
            bgColor: { rgb: "b2b2b2" },
          };
        } */
      }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, fileName);
    XLSX.writeFile(wb, fileName + fileExtension);

    // toastr.success("Saving file");
  };

  const onClick = Array.isArray(jsonData)
    ? () => exportToExcel(jsonData || [])
    : () => jsonData?.(exportToExcel);

  return (
    <Button
      type={buttonType || "primary"}
      onClick={onClick}
      className={className}
    >
      <>
        <span style={{ marginRight: "2px" }}>{text}</span>
        {loadingData && <LoadingOutlined />}
      </>
    </Button>
  );
}
