import { useEffect, useRef } from "react";
import { FaCamera, FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

export default function ImagePicker({ image, preview = false, cameraIcon = false, handleImageUpload, handleSingleImageUpload, handleRemove }) {
  const ref = useRef(null);
  const triggerFileInput = () => {
    ref.current.click();
  };

  useEffect(() => {}, [image]);

  return (
    <div className={`relative cursor-pointer rounded-lg size-24  border-2 border-gray-500 shadow-inner`}>
      {!preview && (
        <div onClick={triggerFileInput} className="size-full flex items-center justify-center">
          {cameraIcon ? <FaCamera size="35" color="#6a7282" /> : <FaPlus size="35" color="#6a7282" />}
        </div>
      )}
      <input
        type="file"
        multiple={!preview}
        maxLength={1}
        ref={ref}
        onChange={e => (preview ? handleSingleImageUpload(e) : handleImageUpload(e))}
        accept="image/*"
        className="hidden"
      />
      {preview && <img onClick={triggerFileInput} src={URL.createObjectURL(image)} className="rounded-lg size-full object-cover" />}
      {preview && (
        <button onClick={handleRemove} className="absolute -right-3 -top-3 size-8 rounded-full bg-black shadow-2xl p-2 cursor-pointer z-[1]">
          <RxCross2 className="size-full text-white" />
        </button>
      )}
    </div>
  );
}
