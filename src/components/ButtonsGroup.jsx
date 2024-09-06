import { Link } from 'react-router-dom';

export default function ButtonGroup({ postId, handleDelete, updateURL }) {
  return (
    <>
      {/*<!-- Component: Base sized primary basic button group --> */}
      <div className="inline-flex overflow-hidden rounded">
        <Link
          to={`/update/${postId}`}
          className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
        >
          <span>Edit post</span>
        </Link>
        <button
          onClick={handleDelete}
          className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-red-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
        >
          <span>Delete post</span>
        </button>
      </div>
      {/*<!-- End Base sized primary basic button group --> */}
    </>
  );
}
