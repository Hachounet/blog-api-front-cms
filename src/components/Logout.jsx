import ButtonLogOut from './ButtonLogOut';
import { useAuthContext } from '../AuthContext';

const Logout = () => {
  const { setLogged } = useAuthContext();

  const handleClick = () => {
    localStorage.removeItem('accessToken');
    setLogged(false);
    window.location.href = '/';
  };

  return (
    <div className="text-xl flex flex-col justify-center items-center flex-grow mb-[193.25px]">
      <span className="pb-8">Click here to log out.</span>
      <ButtonLogOut
        text="Log out"
        onClickFn={handleClick}
      ></ButtonLogOut>
    </div>
  );
};

export default Logout;
