import JSONToExcel from "@components/blocks/JSONToExcel";
import { useState } from "react";

// import { toastr } from 'react-redux-toastr'

type Props = {
  name: string;
  downloadCb: () => Promise<any>;
};
export default function Download({ name, downloadCb }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchJson = async (cb: (json: any[]) => void) => {
    setLoading(true);
    try {
      const data = await downloadCb?.();
      if (Array.isArray(data) && cb) {
        cb(data);
        setLoading(false);
      } else {
        throw new Error("Found an invalid data");
      }
    } catch (err: any) {
      if (typeof err === "string") {
        // toastr.error((err || 'Failed to get table data for download') + ' Download disabled.')
      } else {
        // toastr.error((err?.message || 'Failed to get table data for download') + ' Download disabled.')
      }
      setLoading(false);
      setError(true);
    }
  };

  return !error ? (
    <JSONToExcel
      fileName={name.trim().toUpperCase()}
      text="Download"
      loadingData={loading}
      jsonData={fetchJson}
    />
  ) : null;
}
