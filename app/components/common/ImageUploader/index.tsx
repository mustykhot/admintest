import { Modal } from "antd";
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
// import { useUploadFile } from "v2/lib/api/e-procurement/file";
import Button from "../Button";
import { ImageIcon } from "@components/icons/ImageIcon";

interface Props {
  aspect?: "square" | "rectangle";
  size?: "small" | "large";
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  uploadHandler?: (data?: any) => any;
}

export default function ImageUploader(props: Props) {
  const {
    aspect = "square",
    value = "",
    size = "small",
    placeholder = "Add an image",
    onChange,
    uploadHandler,
  } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState(value);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>();
  // const { uploadFile, isUploadingFile } = useUploadFile();
  const [loading, setLoading] = useState(false);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setSrc(URL.createObjectURL(e.target.files[0]));
      setOpen(true);
    }
  };

  const cancelCropping = () => {
    if (inputRef.current) inputRef.current.value = "";
    setOpen(false);
  };

  const upload = async () => {
    if (!image || !crop) return;
    const base64_data = createImage(image, crop);
    const data = {
      base64_data,
      file_extension: "png",
    };
    if (uploadHandler) setLoading(true);
    // const res = uploadHandler
    //   ? await uploadHandler(data)
    //   : await uploadFile(data);
    // setLoading(false);
    // onChange?.(res.s3url);
    // setOpen(false);
  };

  useEffect(() => {
    if (image) {
      const factor = aspect === "square" ? 1 : 16 / 9;
      const width = image.width;
      const height = image.height;
      const crop = makeAspectCrop(
        { unit: "px", width: 250 },
        factor,
        width,
        height
      );
      setCrop(centerCrop(crop, width, height));
    } else setCrop(undefined);
  }, [open, aspect, image, src]);

  return (
    <div>
      <div
        className={`relative flex gap-2 items-center justify-between border border-dashed border-gray-400 flex-wrap overflow-hidden rounded-2xl bg-[#F5F8FE] ${
          aspect === "square" ? "aspect-square" : "aspect-video"
        } ${
          size === "small" && aspect === "square"
            ? "max-w-[150px]"
            : size === "small" && aspect === "rectangle"
            ? "max-w-[300px]"
            : "max-w-full"
        }`}
      >
        <div className="w-full h-full relative flex items-center justify-center mx-auto">
          {value ? (
            <img
              src={value}
              className={`absolute w-full h-full object-cover rounded border-none ${
                size === "small" ? " min-h-[96px]" : "w-full min-h-[200px]"
              }`}
            />
          ) : null}
          <div className="flex flex-col items-center justify-center gap-2">
            <ImageIcon />
            <p className="text-center font-bold">
              {value ? "Change image" : placeholder}
            </p>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onClick={(e: any) => {
            e.target.value = null;
          }}
          onChange={onFileChange}
          className="absolute top-0 left-0 w-full h-full opacity-0"
        />
      </div>
      {open ? (
        <Modal
          open={open}
          footer={null}
          closeIcon={false}
          maskClosable={false}
          onCancel={cancelCropping}
        >
          <div className="relative flex flex-col gap-2">
            <ReactCrop
              crop={crop}
              aspect={aspect === "square" ? 1 : 16 / 9}
              onChange={(c) => setCrop(c)}
              className="w-full relative"
            >
              <img
                src={src}
                onLoad={(e) => setImage(e.currentTarget)}
                className="w-full"
              />
            </ReactCrop>
            <div className="flex flex-wrap items-center justify-center gap-3 p-3 rounded-lg border border-black/5 shadow-sm">
              <Button danger name="Cancel" onClick={cancelCropping} />
              {image ? (
                <Button
                  name="Select another image"
                  onClick={() => {
                    if (inputRef.current) inputRef.current.click();
                  }}
                />
              ) : null}
              {image ? (
                <Button
                  type="primary"
                  name="Upload"
                  onClick={upload}
                  // loading={isUploadingFile || loading}
                />
              ) : null}
            </div>
          </div>
          <button
            className="absolute top-0 -right-10 z-10 flex items-center justify-center p-2 rounded-full bg-white shadow-lg border border-solid border-red-500 [&_svg_path]:fill-red-500"
            onClick={cancelCropping}
          >
            <CloseCircleOutlined />
          </button>
        </Modal>
      ) : null}
    </div>
  );
}

function createImage(image: HTMLImageElement, crop: Crop) {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const pixelRatio = window.devicePixelRatio;
  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );
  return canvas.toDataURL("image/png").split(";base64,")[1];
}
