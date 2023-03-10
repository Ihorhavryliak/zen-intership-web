import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cleanAllData } from "../../redux/AuthReducer/Auth_reducer";
import { AppDispatch } from "../../redux/store";
import { FormRegister } from "../Forms/FormRegister";

export const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(cleanAllData());
    };
  }, []);

  return (
    <div>
      <FormRegister />
    </div>
  );
};
