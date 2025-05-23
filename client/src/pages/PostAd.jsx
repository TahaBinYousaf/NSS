import Categories from "../components/Categories";
import Image1 from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import RenderWhen from "../components/RenderWhen";
import { LuArrowLeft } from "react-icons/lu";
import DropDown from "../components/Dropdown";
import ImagePicker from "../components/ImagePicker";
import Label from "../components/Label";
import { useSelector } from "react-redux";
import Input from "@/components/Input";
import useValidation from "@/formik/useValidation";
import * as Yup from "yup";
import { createValidationSchema } from "@/formik/validationSchema";
import toast from "react-hot-toast";
import { useCreatePostMutation } from "@/services/nodeApi";
import PropTypes from "prop-types";

const adProps = {
  "Item request": {
    heading: "Item's Name*",
    description: "Item's Description*",
    hideCondition: true,
    hidePrice: true,
    hideImages: true,
    request: true,
  },
  Resources: {
    heading: "Name*",
    description: "Description*",
    hideCondition: true,
    resourceType: true,
    hidePrice: true,
  },
  Events: {
    heading: "Name*",
    description: "Description*",
    hideCondition: true,
    hidePrice: true,
    showTime: true,
  },
  Services: {
    heading: "Service's Name*",
    description: "Service's Description*",
    priceHeading: "Service's Charges*",
    pricePlaceHolder: "Enter charges (PKR)",
    hideCondition: true,
  },
};

export default function PostAd() {
  const navigate = useNavigate();
  const [selectedCategory, selectedCategorySet] = useState(null);

  return (
    <>
      <Nav />
      <div className="flex flex-col gap-4 py-10 container mx-auto max-w-screen-2xl">
        <div className="flex items-center justify-between gap-4 px-8">
          <button onClick={() => (selectedCategory ? selectedCategorySet("") : navigate("/"))} className="relative z-10 cursor-pointer">
            <LuArrowLeft className="size-8" color="#1c398e" />
          </button>
          <div className="text-4xl text-left font-bold uppercase">Post Your ad</div>
          <div className="flex" />
        </div>
        {selectedCategory ? (
          <div className="p-4">
            <Form selectedCategory={selectedCategory} selectedCategorySet={selectedCategorySet} />
          </div>
        ) : (
          <Categories header="Choose Category" customLinkClick categorySet={selectedCategorySet} adProps={adProps} />
        )}
      </div>
    </>
  );
}

function Nav() {
  return (
    <nav className="shadow-md px-4 md:px-8 py-6 bg-white overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full">
          <NavLink to={"/"}>
            <img src={Image1} alt="Logo" className="w-13 md:w-17 cursor-pointer object-contain" />
          </NavLink>
          <h1 className="hidden md:block text-3xl">|</h1>
          <h1 className="text-lg italic font-serif">Connect with your community</h1>
        </div>
      </div>
    </nav>
  );
}

function Form({ selectedCategory, selectedCategorySet, request = false }) {
  const selectedCategoryKey = useMemo(() => selectedCategory?.name, [selectedCategory]);
  const changeCategory = () => selectedCategorySet("");
  const { user } = useSelector(state => state.auth);
  const [images, imagesSet] = useState([]);
  const [createPost, { isLoading }] = useCreatePostMutation();
  const navigate = useNavigate();

  let initialValues = {
    title: "",
    description: "",
    location: "",
  };

  adProps?.[selectedCategoryKey]?.request ? (initialValues.type = "request") : (initialValues.type = "post");
  if (!adProps[selectedCategoryKey]?.hideCondition) initialValues.condition = "";
  if (!adProps[selectedCategoryKey]?.hidePrice) initialValues.price = "";
  if (adProps[selectedCategoryKey]?.resourceType) initialValues.resourceType = "";
  if (adProps[selectedCategoryKey]?.showTime) initialValues.on = "";

  const formik = useValidation({
    initialValues,
    handleSubmit,
    stopReset: true,
    validationSchema: Yup.object({
      title: createValidationSchema("Title"),
      description: createValidationSchema("Description"),
      location: createValidationSchema("Location"),
      condition: adProps[selectedCategoryKey]?.hideCondition ? Yup.string().notRequired() : createValidationSchema("Category"),
      price: adProps[selectedCategoryKey]?.hidePrice ? Yup.string().notRequired() : createValidationSchema("Price"),
      resourceType: !adProps[selectedCategoryKey]?.resourceType ? Yup.string().notRequired() : createValidationSchema("ResourceType"),
      on: !adProps[selectedCategoryKey]?.showTime ? Yup.string().notRequired() : createValidationSchema("Date & Time"),
    }),
  });

  async function handleSubmit(values) {
    const formData = new FormData();

    if (!request && !adProps[selectedCategoryKey]?.hideImages && !images.length) {
      toast.error("Please Select Images");
      return;
    } else if (images.length > 5) {
      toast.error("Max. 5 images allowed");
      return;
    }

    console.log(values);
    formData.append("category", selectedCategoryKey);
    formData.append("type", values.type);

    Object.entries(values).forEach(([key, value]) => {
      if (value && key !== "type") {
        formData.append(key, value);
      }
    });

    if (!request && images.length > 0) {
      images.forEach(image => {
        formData.append("images", image);
      });
    }

    try {
      const res = await createPost(formData);
      if (res?.data) navigate("/");
    } catch (error) {
      console.error("Failed to create post:", error);
      toast.error("Failed to create post");
    }
  }

  const handleImageUpload = e => {
    const files = Array.from(e.target.files);

    if (files.length) {
      imagesSet(pre => [...pre, ...files]);
    }

    e.target.value = "";
  };

  const handleSingleImageUpload = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      imagesSet(prev => {
        const updatedPreviews = [...prev];
        updatedPreviews[index] = file;
        return updatedPreviews;
      });
    }

    e.target.value = "";
  };

  function handleRemove(index) {
    imagesSet(prevImages => prevImages.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col rounded-lg bg-white border-2 border-gray-200 w-full">
        {/** CATEGORY */}
        <div className="flex flex-col lg:flex-row w-full justify-between gap-4 border-b-2 border-b-gray-200 p-8">
          <Label name="Category" />
          <div className="flex flex-row justify-between items-center flex-1">
            <div className="flex items-center gap-4">
              <img src={selectedCategory?.imageSrc} className="size-20 rounded-full" />
              <div className="font-bold text-lg">{selectedCategory?.name}</div>
            </div>
            <button onClick={changeCategory} className="text-lg text-blue-500 cursor-pointer">
              Change
            </button>
          </div>
        </div>

        {/** UPLOAD IMAGES - Only show if not a request */}
        {!request && (
          <RenderWhen is={!selectedCategory?.hideImages}>
            <div className="flex flex-col lg:flex-row w-full justify-between gap-4 border-b-2 border-b-gray-200 p-8">
              <Label name="Upload Images*" />
              <div className="flex flex-row flex-wrap items-center flex-1 gap-4">
                <ImagePicker handleImageUpload={handleImageUpload} />
                {images?.length
                  ? images.map((image, index) => {
                      return (
                        <ImagePicker
                          handleSingleImageUpload={e => handleSingleImageUpload(e, index)}
                          handleRemove={() => handleRemove(index)}
                          preview
                          key={index}
                          image={image}
                        />
                      );
                    })
                  : null}
              </div>
            </div>
          </RenderWhen>
        )}

        {/** AD DETAILS */}
        <div className="flex flex-col w-full justify-between gap-8 p-8">
          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <Label name={selectedCategory?.heading ?? "Ad title*"} />
            <Input
              variant="full"
              placeholder="Enter title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && !!formik.errors.title}
              errorMsg={formik.touched.title && formik.errors.title}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <Label name={selectedCategory?.description ?? "Description*"} />
            <Input
              variant="textArea"
              placeholder="Enter description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && !!formik.errors.description}
              errorMsg={formik.touched.description && formik.errors.description}
            />
          </div>

          <RenderWhen is={selectedCategory?.resourceType}>
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Resource Type*" />
              <Input
                variant="full"
                placeholder="Enter resource type"
                name="resourceType"
                value={formik.values.resourceType}
                onChange={formik.handleChange}
                error={formik.touched.resourceType && !!formik.errors.resourceType}
                errorMsg={formik.touched.resourceType && formik.errors.resourceType}
              />
            </div>
          </RenderWhen>

          <RenderWhen is={!selectedCategory?.hideCondition}>
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Condition*" />
              <DropDown
                placeholder="Select Condition"
                dropDownValues={["New", "Used"]}
                validation
                formikSet={val => formik.setFieldValue("condition", val)}
                value={formik.values.condition}
                name="condition"
                error={formik.touched.condition && !!formik.errors.condition}
                errorMsg={formik.touched.condition && formik.errors.condition}
              />
            </div>
          </RenderWhen>

          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <Label name="Location*" />
            <DropDown
              placeholder="Select Location"
              dropDownValues={[
                "Defence Housing Society DHA",
                "Gulberg",
                "Model Town",
                "Johar Town",
                "Bahria Town",
                "Garden Town",
                "PCSIR",
                "Cantonment Cantt",
                "Askari Housing Society",
              ]}
              validation
              formikSet={val => formik.setFieldValue("location", val)}
              value={formik.values.location}
              name="location"
              error={formik.touched.location && !!formik.errors.location}
              errorMsg={formik.touched.location && formik.errors.location}
            />
          </div>

          <RenderWhen is={selectedCategory?.showTime}>
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Date & Time*" />
              <Input
                variant="full"
                placeholder="Enter Date & Time"
                type="datetime-local"
                name="on"
                value={formik.values.on}
                onChange={formik.handleChange}
                error={formik.touched.on && !!formik.errors.on}
                errorMsg={formik.touched.on && formik.errors.on}
              />
            </div>
          </RenderWhen>
        </div>
      </div>

      {/** PRICE */}
      <RenderWhen is={!selectedCategory?.hidePrice}>
        <div className="flex flex-col rounded-lg bg-white border-2 border-gray-200 w-full">
          {/** PRICE */}
          <div className="flex flex-col w-full justify-between gap-8 p-8">
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name={selectedCategory?.priceHeading ?? "Price*"} />

              <Input
                variant="full"
                placeholder={selectedCategory?.pricePlaceHolder ?? "Enter price (PKR)"}
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && !!formik.errors.price}
                errorMsg={formik.touched.price && formik.errors.price}
              />
            </div>
          </div>
        </div>
      </RenderWhen>

      <div className="flex flex-col rounded-lg bg-white border-2 border-gray-200 w-full">
        {/** NAME */}
        <div className="flex flex-col w-full justify-between gap-8 p-8 border-b-2 border-b-gray-200">
          <div className="flex flex-col lg:items-center lg:flex-row gap-4 flex-1">
            <Label name="Name" />
            <input disabled className="flex-1 w-full rounded-md p-4 text-lg" value={user?.name} />
          </div>

          <div className="flex flex-col lg:items-center lg:flex-row gap-4 flex-1">
            <Label name="Phone Number" />
            <input disabled className="flex-1 w-full  rounded-md p-4 text-lg" value={user?.phone} />
          </div>

          {/* <div className="flex flex-col lg:flex-row gap-4 flex-1 justify-between">
            <Label name="Show my phone number in ads?" />
            <div
              className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all duration-300 ${
                showPhoneNo ? "bg-green-900" : "bg-gray-400"
              }`}
              onClick={() => showPhoneNoSet(pre => !pre)}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  showPhoneNo ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </div>
          </div> */}
        </div>

        <div className="flex w-full justify-end gap-8 p-8">
          <button
            type="button"
            disabled={isLoading}
            onClick={formik.handleSubmit}
            className="w-fit flex items-center gap-2 cursor-pointer px-4 md:px-6 py-2 md:py-3 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110"
          >
            <span className="">{isLoading ? "Posting" : "Post now"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

Form.propTypes = {
  selectedCategory: PropTypes.shape({
    name: PropTypes.string,
    imageSrc: PropTypes.string,
    hideImages: PropTypes.bool,
    heading: PropTypes.string,
    description: PropTypes.string,
    resourceType: PropTypes.bool,
    hideCondition: PropTypes.bool,
    showTime: PropTypes.bool,
    hidePrice: PropTypes.bool,
    priceHeading: PropTypes.string,
    pricePlaceHolder: PropTypes.string,
  }),
  selectedCategorySet: PropTypes.func.isRequired,
  request: PropTypes.bool,
};

Form.defaultProps = {
  request: false,
};
