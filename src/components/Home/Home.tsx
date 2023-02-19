import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMessage,
  getPostOrderByName,
  setWebsocket,
} from "../../redux/PostMessageRedux/post_message_redux";
import {
  getAllMessageDataSelector,
  getCountPageSelector,
} from "../../redux/PostMessageRedux/post_message_selector";
import { AppDispatch } from "../../redux/store";
import { Form } from "../Forms/FormMain";
import { io } from "socket.io-client";
import "./Home.css";
import { Paginator } from "./Paginator";
import { MainPost } from "./MainPost";
import { SelectPost } from "./SelectPost";

export type ValidationType = {
  size: string;
};

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const messageAllData = useSelector(getAllMessageDataSelector);
  const countItems = useSelector(getCountPageSelector);
  useEffect(() => {
    dispatch(getAllMessage());
    return () => {};
  }, []);
  //Socket
  const socket = io(`${process.env.REACT_APP_SITE_LISTEN_SOCKET}`);
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
      {/*    select sort */}
      <hr />
      <SelectPost onSendSort={onSendSort} />
      {/* all message */}
      <MainPost
        messageAllData={messageAllData}
        onIsOpenForm={onIsOpenForm}
        isOpenForm={isOpenForm.id}
      />
      {/* Paginator */}
      <div className="mb-5 mt-3">
        {countItems !== 0 && (
          <Paginator
            total_count={countItems}
            setCurrentPage={onPageSearch}
            currentPage={query.page}
            itemsPerPage={query.limit}
          />
        )}
      </div>
    </section>
  );
};
export default Home;
