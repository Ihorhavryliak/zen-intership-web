import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMessage,
  setWebsocket,
} from "../../redux/SendMessageRedux/send_message_redux";
import { getAllMessageDataSelector } from "../../redux/SendMessageRedux/send_message_selector";
import { AppDispatch } from "../../redux/store";
import { Form } from "../Form/FormMain";
import { io } from "socket.io-client";
import "./Home.css";
import noPhoto from "../../assets/img/noPhoto.png";
import { FaFileAlt, FaArrowUp,FaArrowDown  } from "react-icons/fa"; 
import { parseDate } from "../../utils/parseDate";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const messageAllData = useSelector(getAllMessageDataSelector);
  useEffect(() => {
    dispatch(getAllMessage());
    return () => {};
  }, []);
  //Socket
  const socket = io(`http://localhost:4000/events`);
  const [dataWebsocket, setDataWebsocket] = useState();
  console.log(dataWebsocket, "dataWebsocket");
  useEffect(() => {
    // socket
    socket.emit("subscribe", "message");
    socket.on("newMessage", (data) => {
      setDataWebsocket(data);
    });
    return () => {
      socket.off('newMessage"');
    };
  }, []);
  useEffect(() => {
    if (dataWebsocket) {
      dispatch(setWebsocket(dataWebsocket));
    }
    return () => {};
  }, [dataWebsocket]);

  //-----------------------
  return (
    <div>
      {/*  form */}
      <Form />
      {/* all message */}
      {messageAllData &&
        messageAllData.length > 0 &&
        messageAllData.map((data) => {
          return (
            <div key={data.id} className="block__message">
              {/*  header message */}
              <div className="d-flex justify-between  items__center">
                {/*  header */}
                <div className="d-flex items__center">
                  <img
                    src={noPhoto}
                    className={`img__user me-2`}
                    alt={data.name}
                  />
                  <span>{data.name}</span>{" "}
                </div>
                <div>
                  {/* data */}
                  <span className="me-2"> {parseDate(data.createdAt)}</span>
                  <span><FaArrowUp className="me-2"/>0  <FaArrowDown className="ms-2" /></span>
                </div>
              </div>
              {/*  body message */}
              <div className="description__block">{data.message} </div>
              {/*   file img */}
              <div className="file__block">
                {" "}
                {data.file.length > 0 &&
                data.file.slice(data.file.indexOf(".")) === ".txt" ? (
                  <span className="fs-2">
                    <FaFileAlt /> {data.file}
                  </span>
                ) : (
                  <img
                    src={`${"http://localhost:4000"}/${data.file}`}
                    className={`img__added`}
                    alt={data.name}
                  />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default Home;
