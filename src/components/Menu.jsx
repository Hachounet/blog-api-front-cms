import { useLocation, Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

export default function Menu() {
  const location = useLocation();
  const { logged } = useAuthContext();

  return (
    <>
      {/*  <!-- Component: Basic side navigation menu --> */}

      {/*  <!-- Side Navigation --> */}
      <aside
        id="nav-menu-1"
        aria-label="Side navigation"
        className="fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col border-r border-r-slate-200 bg-white lg:translate-x-0"
      >
        <a
          aria-label="WindUI logo"
          className="flex items-center gap-2 whitespace-nowrap p-6 text-xl font-medium focus:outline-none"
          href="javascript:void(0)"
        >
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 1024 1024"
            className="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M683.49 271.58C799.57 294 887.23 396 887.23 518.44c0 108.17-68.4 200.38-164.36 235.86A251.85 251.85 0 0 1 486.7 918.44h-22.89C324.76 918.44 212 805.87 212 667a252.25 252.25 0 0 1 5-50.26A210.63 210.63 0 0 1 154.82 467c0-103.93 75.08-190.34 174-208.09a189 189 0 0 1 354.64 12.66z"
              fill="#FFFFFF"
            />
            <path
              d="M472 918.43c-86.81-39.79-147.09-127.27-147.09-228.78a252.11 252.11 0 0 1 5-50.3 210.66 210.66 0 0 1-62.41-149.89c0-104 75.27-190.52 174.47-208.29a189.37 189.37 0 0 1 163.3-117.35 189.43 189.43 0 0 1 89 107.15C810.62 293.38 898.5 395.49 898.5 518.06c0 108.27-68.57 200.57-164.77 236.08A252.47 252.47 0 0 1 497 918.44h-25z"
              fill="#FFF9F9"
            />
            <path
              d="M424 913.49c63.36-47.67 126.25-119.07 126.25-223.84a252.15 252.15 0 0 1 5-50.3 210.66 210.66 0 0 1-62.41-149.88c0-104 75.27-190.52 174.47-208.29a188.05 188.05 0 0 1 17.69-33.3 187.17 187.17 0 0 1 9.25 23.12C810.62 293.38 898.5 395.49 898.5 518.06c0 108.27-68.57 200.57-164.77 236.08A252.47 252.47 0 0 1 497 918.44h-23a254.3 254.3 0 0 1-50-4.95z"
              fill="#FFD0BB"
            />
            <path
              d="M357.64 524.24a157.75 157.68 0 1 0 315.5 0 157.75 157.68 0 1 0-315.5 0Z"
              fill="#FFFFFF"
            />
            <path
              d="M597.93 389.83a157.7 157.7 0 0 1-48.09 288.32A146.43 146.43 0 0 1 583 389.08a148.27 148.27 0 0 1 14.93 0.75z"
              fill="#FFCF00"
            />
            <path
              d="M487 938.92h-23.53A271.91 271.91 0 0 1 191.56 667a274.56 274.56 0 0 1 3.44-43.56 232 232 0 0 1 119.47-382.53 209.4 209.4 0 0 1 384.38 13c121.72 28.86 208.86 138.27 208.86 264.56a272 272 0 0 1-169 251.77A272 272 0 0 1 487 938.92z m16.83-777.14a168.4 168.4 0 0 0-156 104.82l-4.18 10.4-11.11 2a191 191 0 0 0-101 323.28l7.81 7.78-2.19 10.8a232.83 232.83 0 0 0-4.6 46.13A230.95 230.95 0 0 0 463.47 898H487a231 231 0 0 0 216.66-150.73l3.27-8.83 8.84-3.26a231 231 0 0 0 151-216.73c0-110.64-78.73-206-187.19-226.81l-11.87-2.27-3.75-11.49a168.42 168.42 0 0 0-160.1-116.1z"
              fill=""
            />
            <path
              d="M515.39 702.4c-98.28 0-178.23-79.92-178.23-178.16s80-178.16 178.23-178.16S693.62 426 693.62 524.24 613.67 702.4 515.39 702.4z m0-315.36c-75.69 0-137.27 61.55-137.27 137.2s61.58 137.2 137.27 137.2 137.27-61.55 137.27-137.2S591.08 387 515.39 387z"
              fill=""
            />
          </svg>
          Eggcelent CMS
        </a>
        <nav
          aria-label="side navigation"
          className="flex-1 divide-y divide-slate-100 overflow-auto"
        >
          <div>
            <ul className="flex flex-1 flex-col gap-1 py-3">
              <li className="px-3">
                <Link
                  to="/"
                  className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 ${
                    location.pathname === '/'
                      ? 'bg-emerald-50 text-emerald-500'
                      : ''
                  }`}
                >
                  {/* Icon and Label */}
                  Dashboard
                </Link>
              </li>
              <li className="px-3">
                <Link
                  to="/posts"
                  className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 ${
                    location.pathname === '/posts'
                      ? 'bg-emerald-50 text-emerald-500'
                      : ''
                  }`}
                >
                  {/* Icon and Label */}
                  All posts
                </Link>
              </li>
              <li className="px-3">
                <Link
                  to="/comments"
                  className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 ${
                    location.pathname === '/comments'
                      ? 'bg-emerald-50 text-emerald-500'
                      : ''
                  }`}
                >
                  {/* Icon and Label */}
                  Comments
                </Link>
              </li>
              <li className="px-3">
                <Link
                  to="/drafts"
                  className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50"
                >
                  {/* Icon and Label */}
                  Drafts
                </Link>
              </li>
              <li className="px-3">
                {logged ? (
                  <Link
                    to="/logout"
                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50"
                  >
                    {/* Icon and Label */}
                    Log out
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50"
                  >
                    {/* Icon and Label */}
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/*  <!-- End Basic side navigation menu --> */}
    </>
  );
}
