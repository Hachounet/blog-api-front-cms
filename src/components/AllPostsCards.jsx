import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import useAuth from '../hooks/authFetch';
import PropTypes from 'prop-types';

export default function AllPostsCards({ url }) {
  const { data, loading, error } = useAuth(url);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data && data.posts) {
      setPosts(data.posts);
    }
  }, [data]);

  const handlePostDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-8 pt-8 pr-4 pl-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          postId={post.id}
          author={post.author.pseudo}
          createdAt={post.createdAt}
          title={post.title}
          content={post.Content}
          published={post.published}
          onDelete={handlePostDelete} // Pass the delete handler
        />
      ))}
    </div>
  );
}

AllPostsCards.propTypes = {
  url: PropTypes.string.isRequired,
};
