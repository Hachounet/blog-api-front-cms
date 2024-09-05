export default function ButtonGroup({ handleDelete }) {
  return (
    <>
      {/*<!-- Component: Base sized primary basic button group --> */}
      <div className="inline-flex overflow-hidden rounded">
        <button className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
          <span>See post</span>
        </button>
        <button className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-blue-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
          <span>Edit post</span>
        </button>
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
