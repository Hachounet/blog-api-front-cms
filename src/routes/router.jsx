import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AllPostsCards from '../components/AllPostsCards';
import ErrorPage from '../components/ErrorPage';
import Login from '../components/Login';
import Logout from '../components/Logout';
import AllComments from '../components/AllComments';
import AllDrafts from '../components/AllDrafts';
import NewPost from '../components/NewPost';
import UpdatePost from '../components/UpdatePost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <AllPostsCards url="https://hachounet-blog-api-backend.adaptable.app/dashboard/" />
        ),
      },
      {
        path: '/login',
        element: (
          <Login postURL="https://hachounet-blog-api-backend.adaptable.app/login" />
        ),
      },
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '/posts',
        element: (
          <AllPostsCards url="https://hachounet-blog-api-backend.adaptable.app/dashboard/all" />
        ),
      },
      {
        path: '/newpost',
        element: (
          <NewPost url="https://hachounet-blog-api-backend.adaptable.app/dashboard/create" />
        ),
      },
      {
        path: '/update/:postId',
        element: (
          <UpdatePost url="https://hachounet-blog-api-backend.adaptable.app/dashboard" />
        ),
      },
      {
        path: '/comments',
        element: (
          <AllComments url="https://hachounet-blog-api-backend.adaptable.app/dashboard/comments" />
        ),
      },
      {
        path: '/drafts',
        element: (
          <AllDrafts url="https://hachounet-blog-api-backend.adaptable.app/dashboard/drafts" />
        ),
      },
    ],
  },
]);

export default router;
