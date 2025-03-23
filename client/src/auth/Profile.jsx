import { useState, useRef } from "react";
import DropDown from "../components/Dropdown";
import Label from "../components/Label";
import ProfileImg from "@/assets/default-avatar.jpg";
import { useSelector } from "react-redux";
import useValidation from "@/formik/useValidation";
import Input from "@/components/Input";
import { ProfileValidationSchema } from "@/formik/validationSchema";
import { useChangeProfileMutation } from "@/services/nodeApi";
import getImagePath from "@/utils/getImagePath";

export default function Profile() {
  const { user } = useSelector(state => state.auth);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      formik.setFieldValue("profileImage", file);

      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const [changeProfile, { isLoading }] = useChangeProfileMutation();

  const handleSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("gender", values.gender);
      formData.append("location", values.location);

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }
      await changeProfile(formData);
    } catch (error) {}
  };

  const initialValues = {
    name: user?.name ?? "",
    gender: user?.gender ?? "",
    location: user?.location ?? "",
    phone: user?.phone ?? "",
    profileImage: user?.profileImage ?? "",
  };

  const formik = useValidation({
    initialValues,
    handleSubmit,
    validationSchema: ProfileValidationSchema,
    enableReinitialize: true,
  });

  return (
    <div className="container max-w-screen-xl mx-auto py-10">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col rounded-lg bg-white border-2 border-gray-200 w-full">
          <div className="flex flex-col lg:flex-row w-full justify-between lg:items-center gap-4 border-b-2 border-b-gray-200 p-8">
            <Label name="Edit Profile" className="!text-4xl" />
            <Label name={user?.email} className="text-xl lg:text-right" />
          </div>

          <div className="flex flex-col lg:flex-row w-full justify-between gap-4 border-b-2 border-b-gray-200 p-8">
            <Label name="Profile Photo*" />
            <div className="flex flex-row flex-wrap items-center flex-1 gap-4">
              <div className="relative cursor-pointer size-28 hover:bg-gray-200 rounded-full overflow-hidden ml-1" onClick={triggerFileInput}>
                <img
                  src={imagePreview ? imagePreview : formik.values.profileImage ? getImagePath(formik.values.profileImage) : ProfileImg}
                  className="size-full object-cover"
                  alt="Profile"
                />
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              <button className="cursor-pointer text-lg font-bold bg-blue-900 text-white p-3 rounded-md" onClick={triggerFileInput}>
                Upload Photo
              </button>
            </div>
          </div>

          <div className="flex flex-col w-full justify-between gap-8 p-8">
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Name" />
              <Input
                variant="full"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Enter name"
                error={formik.touched.name && !!formik.errors.name}
                errorMsg={formik.touched.name && formik.errors.name}
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Gender" />
              <DropDown
                name="gender"
                placeholder="Select Gender"
                value={formik.values.gender}
                validation
                error={formik.touched.gender && !!formik.errors.gender}
                errorMsg={formik.touched.gender && formik.errors.gender}
                formikSet={value => formik.setFieldValue("gender", value)}
                dropDownValues={["Male", "Female", "Prefer not to say"]}
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Location" />
              <DropDown
                name="location"
                placeholder="Select Location"
                value={formik.values.location}
                validation
                error={formik.touched.location && !!formik.errors.location}
                errorMsg={formik.touched.location && formik.errors.location}
                formikSet={value => formik.setFieldValue("location", value)}
                dropDownValues={["DHA", "Gulberg", "Model Town", "Johar Town", "Bahria Town", "Garden Town", "PCSIR", "Cantonment Cantt", "Askari"]}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-lg bg-white border-2 border-gray-200 w-full">
          <div className="flex flex-col lg:flex-row w-full justify-between gap-4 border-b-2 border-b-gray-200 p-8">
            <Label name="Contact Information" className="!text-3xl w-full" />
          </div>

          <div className="flex flex-col w-full justify-between gap-8 p-8 border-b-2 border-b-gray-200">
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Phone Number" />
              <Input
                variant="full"
                type="text"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                placeholder="Enter Phone No."
                error={formik.touched.phone && !!formik.errors.phone}
                errorMsg={formik.touched.phone && formik.errors.phone}
              />
            </div>
          </div>

          <div className="flex w-full justify-end gap-8 p-8">
            <button
              type="button"
              disabled={isLoading || !formik.dirty}
              onClick={formik.handleSubmit}
              className="w-fit flex items-center gap-2 px-4 cursor-pointer md:px-6 py-2 md:py-3 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110  disabled:!from-gray-500 disabled:!cursor-default"
            >
              <span>{isLoading ? "Saving ..." : "Save Changes"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
