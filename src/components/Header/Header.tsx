import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <div className="container my-4">
        <div className="d-flex justify-content-between">
          <div>
            <NavLink to="/">Home</NavLink>
          </div>
          <div>
            <NavLink to="/sign-up">Sign un</NavLink>
          </div>
        </div>
      </div>
      <hr className="mb-4" />
    </header>
  );
};
