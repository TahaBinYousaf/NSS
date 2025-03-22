import { FaCamera, FaPlus } from "react-icons/fa";

export default function ImagePicker({ cameraIcon = false }) {
  return (
    <div className="cursor-pointer rounded-lg size-24 border-2 border-gray-500 shadow-inner flex items-center justify-center">
      {cameraIcon ? <FaCamera size="35" color="#6a7282" /> : <FaPlus size="35" color="#6a7282" />}
    </div>
  );
}
