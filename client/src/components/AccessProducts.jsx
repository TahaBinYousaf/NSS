import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import Image5 from "../assets/default-avatar.jpg";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { useGetPostByIdQuery } from "@/services/nodeApi";
import Loader from "@/components/Loader";
import RenderWhen from "@/components/RenderWhen";
import getImagePath from "@/utils/getImagePath";
import { useDispatch, useSelector } from "react-redux";
import { authModalTypeSet } from "@/store/slice/config";
import dayjs from "dayjs";
import { LuArrowLeft } from "react-icons/lu";
import ImageSlider from "@/components/ImageSlider";
import { FaHandHoldingHeart } from "react-icons/fa";

const AccessProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productid } = useParams();

  const { isLoggedIn } = useSelector(state => state.auth);
  const { currency } = useSelector(state => state.config);
  const authModalSet = () => {
    dispatch(authModalTypeSet("Login"));
  };
  const [showPhoneNo, showPhoneNoSet] = useState(false);

  const { data, isLoading, isFetching, error } = useGetPostByIdQuery({
    productid,
  });

  // Handle navigation in useEffect
  useEffect(() => {
    if (!isLoading && (!data || !data?.post)) {
      console.error("Post not found or error:", error);
      navigate(-1);
    }
  }, [isLoading, data, error, navigate]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (error) {
    console.error("Error fetching post:", error);
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error loading post. Please try again later.</div>
      </div>
    );
  }

  if (!data?.post) {
    return null;
  }

  const isRequest = data.post.type === "request";
  const userData = data.post.user || {};
  const userName = userData.name || "Unknown User";
  const userPhone = userData.phone || "No phone number available";
  const userEmail = userData.email || "No email available";
  const userProfileImage = userData.profileImage;
  const userId = userData._id;

  // Log user data for debugging
  console.log("User data in component:", userData);
  console.log("User ID:", userId);

  return (
    <div className="min-h-[calc(100vh-112px)] relative">
      <div className="flex flex-col gap-8 py-10 transition-opacity ease-in duration-500 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="relative z-10 cursor-pointer">
            <LuArrowLeft className="size-8" color="#1c398e" />
          </button>
          <div className="uppercase text-4xl font-bold">
            {data.post.category}
            {isRequest && <span className="ml-2 px-2 py-1 text-sm font-semibold bg-blue-100 text-blue-800 rounded-full">REQUEST</span>}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3 border border-gray-300 rounded-xl p-4 sm:p-6 bg-gray-100">
              {isRequest ? (
                <div className="w-full h-[500px] flex items-center justify-center">
                  <FaHandHoldingHeart className="text-8xl text-blue-500" />
                </div>
              ) : (
                <ImageSlider images={data.post.images} />
              )}
            </div>

            <div className="w-full lg:w-1/3 border  border-gray-300 rounded-xl p-4 sm:p-6 flex flex-col gap-4 h-fit">
              <h1 className="text-2xl font-bold">Listed by {userName}</h1>
              <div className="flex gap-4 items-center">
                <img
                  src={userProfileImage ? getImagePath(userProfileImage) : Image5}
                  className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
                  alt="Seller"
                />
                <div className="flex flex-col justify-center">
                  <h2 className="text-xl font-bold">{userName}</h2>
                  <p>{userEmail}</p>
                </div>
              </div>
              {showPhoneNo ? (
                <div className="w-full flex items-center text-white justify-center gap-2 rounded-md py-3 bg-gradient-to-r from-blue-500 to-black transition-all duration-300 ease-in-out transform hover:brightness-110">
                  {userPhone}
                </div>
              ) : (
                <button
                  onClick={() => showPhoneNoSet(true)}
                  className="w-full flex items-center text-white justify-center gap-2 rounded-md py-3 cursor-pointer bg-gradient-to-r from-blue-500 to-black transition-all duration-300 ease-in-out transform hover:brightness-110"
                >
                  <FaPhone className="text-xl" />
                  Show phone number
                </button>
              )}
              {isLoggedIn ? (
                <button
                  onClick={() => (userId ? navigate(`/chat/${userId}`) : console.error("User ID is undefined"))}
                  className="w-full flex items-center text-white justify-center gap-2 rounded-md py-3 cursor-pointer bg-gradient-to-r from-blue-500 to-black transition-all duration-300 ease-in-out transform hover:brightness-110"
                >
                  <IoChatbubbleOutline className="text-xl" />
                  Chat with seller
                </button>
              ) : (
                <button
                  onClick={() => authModalSet()}
                  className="w-full flex items-center text-white justify-center gap-2 rounded-md py-3 cursor-pointer bg-gradient-to-r from-blue-500 to-black transition-all duration-300 ease-in-out transform hover:brightness-110"
                >
                  <IoChatbubbleOutline className="text-xl" />
                  Login to chat
                </button>
              )}
              <div className="flex items-center gap-2">
                <IoLocationOutline className="text-xl" />
                <p className="font-semibold">{data.post?.location}</p>
              </div>
              <RenderWhen is={data.post.price}>
                <div className="flex items-center justify-between gap-4">
                  <p>Price</p>
                  <p className="font-bold">
                    {currency}
                    {data.post.price}
                  </p>
                </div>
              </RenderWhen>
              <RenderWhen is={data.post.condition}>
                <div className="flex items-center justify-between gap-4">
                  <p>Condition</p>
                  <p className="font-bold">{data.post.condition}</p>
                </div>
              </RenderWhen>
              <RenderWhen is={data.post.resourceType}>
                <div className="flex items-center justify-between gap-4">
                  <p>Resource Type</p>
                  <p className="font-bold">{data.post.resourceType}</p>
                </div>
              </RenderWhen>
              <RenderWhen is={data.post.on}>
                <div className="flex items-center justify-between gap-4">
                  <p>Event Date & Time</p>
                  <p className="font-bold">{dayjs(data.post.on).format("DD MMM YYYY, h:mm A")}</p>
                </div>
              </RenderWhen>
            </div>
          </div>

          <div className="w-full sm:w-1/2 border border-gray-300 rounded-xl py-6 px-4 sm:px-8">
            <h1 className="text-3xl pb-6 font-bold">Description</h1>
            <p style={{ whiteSpace: "pre-line" }}>{data.post.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessProducts;
