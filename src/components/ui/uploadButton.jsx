import { Upload } from "lucide-react";

function UploadButton() {
  return (
    <div
      className="flex gap-1 p-2 w-fit border border-ring rounded-md cursor-pointer"
      type="button"
    >
      <Upload />
      Upload
    </div>
  )
}

export default UploadButton;