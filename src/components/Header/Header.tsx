import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/AuthReducer/Auth_reducer";
import { getUserDataSelector } from "../../redux/AuthReducer/Auth_selector";
import { AppDispatch } from "../../redux/store";

export const Header = () => {
  const userData = useSelector(getUserDataSelector);
  const dispatch: AppDispatch = useDispatch();

  const onLogOut = () => {
    dispatch(logOut());
  };

  return (
    <header className="header">
      <div className="container my-4">
        <div className="d-flex justify-content-between">
          <div>
            <NavLink to="/">Home</NavLink>
          </div>
          <div>
            {userData.length > 0 ? (
              <div>
                {" "}
                <span className="me-3">{userData[0].email}</span>/{" "}
                <button className="btn btn-dark" onClick={() => onLogOut()}>
                  Log out
                </button>
              </div>
            ) : (
              <span>
                <NavLink to="/sign-up">Sign up</NavLink>/{" "}
                <NavLink to="/sign-in">Sign in</NavLink>
              </span>
            )}
          </div>
        </div>
      </div>
      <hr className="mb-4" />
    </header>
  );
};
