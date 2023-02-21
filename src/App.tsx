import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { getUser } from "./redux/AuthReducer/Auth_reducer";
import { AppDispatch } from "./redux/store";
import { Routers } from "./Routers";
import "./styles/main.css";
import { getTokenId } from "./utils/getTokenId";

function App() {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(getTokenId()));
  }, [location.pathname]);

  return (
    <main>
      <Header />
      <div className="container">
        <div className="row">
          <Routers />
        </div>
      </div>
    </main>
  );
}

export default App;
