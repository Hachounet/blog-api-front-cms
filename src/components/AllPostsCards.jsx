import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import useAuth from '../hooks/authFetch';
import PropTypes from 'prop-types';
import CreatePostBtn from './CreatePostBtn';

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

  const handlePublish = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, published: !post.published } : post
      )
    );
  };

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <div className="min-w-[100%] flex justify-center pt-2">
        <CreatePostBtn text="Create new post" />
      </div>
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
            onDelete={handlePostDelete}
            onPublish={handlePublish}
          />
        ))}
      </div>
    </>
  );
}

AllPostsCards.propTypes = {
  url: PropTypes.string.isRequired,
};
