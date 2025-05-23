import { useDeletePostMutation, useGetAllPostsQuery } from "@/services/nodeApi";
import { useEffect, useMemo, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function MyAds() {
  const { data, isLoading, isFetching, refetch } = useGetAllPostsQuery();
  const [deletePost] = useDeletePostMutation();

  const posts = useMemo(() => data?.posts || [], [data]);

  async function onDelete(id) {
    try {
      const res = await deletePost(id);
      if (res?.data) refetch();
    } catch (error) {}
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Ads</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className=" bg-gradient-to-r from-blue-500 to-black !text-white">
            <tr>
              <th className="px-6 py-6  text-left text-sm font-semibold !text-white">Title</th>
              <th className="px-6 py-6  text-left text-sm font-semibold !text-white">Category</th>
              <th className="px-6 py-6  text-left text-sm font-semibold !text-white">Condition</th>
              <th className="px-6 py-6  text-left text-sm font-semibold !text-white">Location</th>
              <th className="px-6 py-6  text-left text-sm font-semibold !text-white">Price</th>
              <th className="px-6 py-6  text-center text-sm font-semibold !text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts?.map(post => (
              <tr key={post._id}>
                <td className="px-6 py-4 font-semibold text-gray-800">{post.title}</td>
                <td className="px-6 py-4 text-gray-700">{post.category}</td>
                <td className="px-6 py-4 text-gray-700">{post.condition}</td>
                <td className="px-6 py-4 text-gray-700">{post.location}</td>
                <td className="px-6 py-4 text-green-600 font-medium">Rs. {post.price}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button onClick={() => onEdit(post)} className="text-blue-500 hover:text-blue-700 transition cursor-pointer">
                    <FaEdit size={20} />
                  </button>
                  <button onClick={() => onDelete(post._id)} className="text-red-500 hover:text-red-700 transition cursor-pointer">
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {isLoading || isFetching ? (
              <tr>
                <td colSpan="8" className="text-center py-[200px] text-gray-500">
                  Loading
                </td>
              </tr>
            ) : (
              posts.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    No ads to display.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
