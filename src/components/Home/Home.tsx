import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessage } from "../../redux/SendMessageRedux/send_message_redux";
import { getAllMessageDataSelector } from "../../redux/SendMessageRedux/send_message_selector";
import { AppDispatch } from "../../redux/store";
import { Form } from "../Form/Form";
import { Register } from "../Register/Register";
import "./Home.css";


const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const messageAllData = useSelector(getAllMessageDataSelector)
  useEffect(() => {
    dispatch(getAllMessage())  
    return () => {
    }
  }, [])
  return (
 <div>
          {/*  form */}
          <Form  />
          {/* all message */}
          {messageAllData && messageAllData.length > 0 && messageAllData.map(data=>{return(
             <div key={data.id} className="block__message">
             {/*  header message */}
              <div className="d-flex justify-between ">
              <div >
               <span>{data.name}</span> <span> {data.createdAt}</span> 
              </div>
              <div>
                like
              </div>
              </div>
             {/*  body message */}
             <div>{data.message} </div>
             </div>
          )})}
       </div>
  );
};
export default Home;
