import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cleanAllData } from "../../redux/AuthReducer/Auth_reducer";
import { AppDispatch } from "../../redux/store";
import { FormSighIn } from "../Forms/FormSighIn";

export const SighIn = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(cleanAllData());
    };
  }, []);

  return (
    <div>
      <FormSighIn />
    </div>
  );
};
