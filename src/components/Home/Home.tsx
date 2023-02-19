import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMessage,
  getPostOrderByName,
  setWebsocket,
} from "../../redux/SendMessageRedux/send_message_redux";
import {
  getAllMessageDataSelector,
  getCountPageSelector,
} from "../../redux/SendMessageRedux/send_message_selector";
import { AppDispatch } from "../../redux/store";
import { Form } from "../Form/FormMain";
import { io } from "socket.io-client";
import "./Home.css";
import noPhoto from "../../assets/img/noPhoto.png";
import { FaFileAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { parseDate } from "../../utils/parseDate";
import { FormAnswer } from "../Form/FormAnswer";
import { Paginator } from "./Paginator";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";

export type ValidationType = {
  size: string;
};

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const messageAllData = useSelector(getAllMessageDataSelector);
  const countItems = useSelector(getCountPageSelector);
  const [validation, setValidation] = useState({ size: "" } as ValidationType);
  useEffect(() => {
    dispatch(getAllMessage());
    return () => {};
  }, []);
  //Socket
  const socket = io(`http://localhost:4000/events`);
  const [dataWebsocket, setDataWebsocket] = useState();

  useEffect(() => {
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
  // isOpenForm
  const [isOpenForm, setIsOpenForm] = useState({ id: 0 });
  const onIsOpenForm = (id: number) => {
    if (isOpenForm.id === id) {
      setIsOpenForm({ ...isOpenForm, id: 0 });
    } else {
      setIsOpenForm({ ...isOpenForm, id });
    }
  };
  // sort search
  const [query, setQuery] = useState({ page: 0, limit: 25, name: "" });

  const onSendSort = (name: string) => {
    dispatch(getPostOrderByName(name, query.page));
  };
  const onPageSearch = (e: number) => {
    setQuery({ ...query, page: e });
    dispatch(getPostOrderByName(query.name, query.page));
  };
  //-----------------------
  return (
    <section>
      {/*  form Main*/}
      <Form />
      {/*    sort */}
      <hr />
      <div>
        <select
          className="form-control mb-3"
          onChange={(e) => onSendSort(e.target.value)}
        >
          <option value="default">Sort Default</option>
          <option value="name">Sort from more Name to less</option>
          <option value="nameAsc">Sort from less Name to more</option>
          <option value="email">Sort from more Email to less</option>
          <option value="emailAsc">Sort from less Email to more</option>
          <option value="date">Sort from more Date to less</option>
          <option value="dateAsc">Sort from less Date to more</option>
        </select>
      </div>
      {/* all message */}
      {messageAllData &&
        messageAllData.length > 0 &&
        messageAllData.map((data, i) => {
          return (
            /*  main post */
            <div key={`${data.id}_${i}`}>
              <div className="block__message">
                {/*  header message */}
                <div className="d-flex justify-content-between ">
                  {/*  header */}
                  <div>
                    <img
                      src={noPhoto}
                      className={`img__user me-2`}
                      alt={data.name}
                    />
                    <span>{data.name}</span>
                  </div>
                  <div>
                    {/* data */}
                    <span className="me-2"> {parseDate(data.createdAt)}</span>
                    <span>
                      <FaArrowUp className="me-2" />0
                      <FaArrowDown className="ms-2" />
                    </span>
                  </div>
                </div>
                {/*  body message */}
                <div className="description__block">{data.message} </div>
                {/*   file img */}
                <div className="mt-3">
                  {data.file.length > 0 &&
                  data.file.slice(data.file.indexOf(".")) === ".txt" ? (
                    <span className="fs-6">
                      <FaFileAlt /> {data.file}
                    </span>
                  ) : data.file.length > 0 ? (
               
                      <Gallery>
            
                        <Item
                          original={`${"http://localhost:4000"}/${data.file}`}
                          thumbnail={`${"http://localhost:4000"}/${data.file}`}
                          width="1600"
                          height="1600"
                        >
                          {({ ref, open }) => (
                            <img
                            ref={ref as React.MutableRefObject<HTMLImageElement>}
                              onClick={open}
                              src={`${"http://localhost:4000"}/${data.file}`}
                              alt={data.name}
                              className={`img__added`}
                            />
                          )}
                        </Item>
                      </Gallery>
               
                  ) : (
                    ""
                  )}
                </div>
                {/*     button answer */}
                <div className="text-end">
                  <button
                    className="btn btn-primary btn-sm mt-3"
                    onClick={() => onIsOpenForm(data.id)}
                  >
                    {isOpenForm.id === data.id ? "Close" : "Answer"}
                  </button>
                </div>
                <div>
                  {isOpenForm.id === data.id ? (
                    <FormAnswer childId={data.id} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* answer message */}
              <div className="block__answer">
                {data.child &&
                  data.child.length > 0 &&
                  data.child.map((answer, i) => {
                    return (
                      <div key={answer.id + i} className="div__answer">
                        {/*  header message */}
                        <div className="d-flex justify-between  items__center">
                          {/*  header */}
                          <div className="d-flex items__center">
                            <img
                              src={noPhoto}
                              className={`img__user me-2`}
                              alt={answer.name}
                            />
                            <span>{answer.name}</span>
                          </div>
                          <div>
                            {/* data */}
                            <span className="me-2">
                              {parseDate(answer.createdAt)}
                            </span>
                            <span>
                              <FaArrowUp className="me-2" />0
                              <FaArrowDown className="ms-2" />
                            </span>
                          </div>
                        </div>
                        {/*  body message */}
                        <div className="description__block">
                          {answer.message}
                        </div>
                        {/*   file img */}
                        <div className="mt-3">
                          {answer.file.length > 0 &&
                          answer.file.slice(answer.file.indexOf(".")) ===
                            ".txt" ? (
                            <span className="fs-6">
                              <FaFileAlt /> {answer.file}
                            </span>
                          ) : answer.file.length > 0 ? (
                            <img
                              src={`${"http://localhost:4000"}/${answer.file}`}
                              className={`img__added`}
                              alt={answer.name}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      {countItems !== 0 && (
        <Paginator
          total_count={countItems}
          setCurrentPage={onPageSearch}
          currentPage={query.page}
          itemsPerPage={query.limit}
        />
      )}
    </section>
  );
};
export default Home;
