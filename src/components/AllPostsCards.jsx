import PostCard from './PostCard';
import useFetch from '../hooks/fetchPosts';

export default function AllPostsCards({ url }) {
  const { data, loading, error } = useFetch(url);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  console.log(data);
  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-8 pt-8 pr-4 pl-4">
      {data.posts.map((post) => (
        <PostCard
          key={post.id}
          author={post.author.pseudo}
          createdAt={post.createdAt}
          title={post.title}
          content={post.Content}
          published={post.published}
        />
      ))}
    </div>
  );
}
