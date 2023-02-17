import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import { Register } from "./components/Register/Register";
export const Routers = () => {
  return (
    <>
      {/*   main  */}
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="sign-up">
            <Route index element={<Register />}></Route>
          </Route>
        </Route>
     
      </Routes>
    </>
  );
};
