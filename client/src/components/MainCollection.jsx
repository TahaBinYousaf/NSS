import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PostCard from './PostCard';
import nodeApi from '../services/nodeApi';

const MainCollection = ({ category, limit, option, location }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("MainCollection - Fetching posts with params:", { category, limit, option, location });
        const response = await nodeApi.getPostsByCategory(category, limit, option, location);
        console.log("MainCollection - Received posts:", response.data.posts);
        setPosts(response.data.posts);
        setLoading(false);
      } catch (err) {
        console.error("MainCollection - Error fetching posts:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, limit, option, location]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

MainCollection.propTypes = {
  category: PropTypes.string,
  limit: PropTypes.string,
  option: PropTypes.string,
  location: PropTypes.string
};

export default MainCollection; 