import { Link } from "react-router-dom";
import getImagePath from "@/utils/getImagePath";
import RenderWhen from "@/components/RenderWhen";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector } from "react-redux";
import { FaHandHoldingHeart } from "react-icons/fa";
import PropTypes from 'prop-types';
dayjs.extend(relativeTime);

export const PostCard = ({ item }) => {
  const { currency } = useSelector(state => state.config);
  const isRequest = item?.type === 'request';
  
  return (
    <div className="border rounded-lg border-gray-300 flex-1 overflow-hidden">
      <Link className="text-gray-700 cursor-pointer" to={`/product/${item?._id}`}>
        <div className="overflow-hidden border-b border-b-gray-200">
          {isRequest ? (
            <div className="w-full h-[350px] sm:h-[350px] md:h-[350px] flex items-center justify-center bg-gray-100">
              <FaHandHoldingHeart className="text-6xl text-blue-500" />
            </div>
          ) : (
            <img
              src={getImagePath(item?.images?.[0])}
              className="w-full h-[350px] sm:h-[350px] md:h-[350px] hover:scale-110 transition ease-in-out object-cover"
              alt=""
            />
          )}
        </div>
        <div className="px-6 py-3 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold gradient-text">{item?.title}</p>
            {isRequest && (
              <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                REQUEST
              </span>
            )}
          </div>
          <RenderWhen is={item?.price}>
            <p className="text-xl font-bold">
              {currency}
              {item?.price}
            </p>
          </RenderWhen>
          <p className="font-semibold">
            <span className="">{item?.location}</span>
          </p>
          <RenderWhen is={item?.condition}>
            <div className="flex justify-between items-center">
              <p className=" text-gray-600">Condition: {item?.condition}</p>
            </div>
          </RenderWhen>
          <RenderWhen is={item?.on}>
            <div className="flex flex-col">
              <p className="font-bold text-gray-700">{dayjs(item?.on).format("DD MMM YYYY")}</p>
              <p className=" text-gray-500">{dayjs(item?.on).format("h:mm A")}</p>
            </div>
          </RenderWhen>
          <p className="text-gray-500 text-sm">Posted: {dayjs(item?.createdAt).fromNow()}</p>
        </div>
      </Link>
    </div>
  );
};

PostCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    type: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    price: PropTypes.string,
    location: PropTypes.string,
    condition: PropTypes.string,
    on: PropTypes.string,
    createdAt: PropTypes.string
  }).isRequired
};
