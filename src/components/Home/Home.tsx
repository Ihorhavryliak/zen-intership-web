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
import "./Home.css";
import { Paginator } from "./Paginator";
import { MainPost } from "./MainPost";
import { SelectPost } from "./SelectPost";
import { SocketHook } from "../../hook/SocketHook";
import {
  GetAllMessageNewAPIType,
  SendAnswerType,
} from "../../api/post_message_api";
import { FormMain } from "../Forms/FormMain";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const messageAllData = useSelector(getAllMessageDataSelector);
  const countItems = useSelector(getCountPageSelector);
  useEffect(() => {
    dispatch(getAllMessage());
    return () => {};
  }, []);
  //Socket
  const [dataWebsocket, isConnected] = SocketHook("newMessage");

  useEffect(() => {
    dispatch(
      setWebsocket(
        dataWebsocket as GetAllMessageNewAPIType[] | SendAnswerType[] | []
      )
    );
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
    window.scrollTo(0, 0);
  };
  //-----------------------
  return (
    <section>
      {/*  form Main*/}
      <FormMain />
      {/*    select sort */}
      <hr />
      <SelectPost onSendSort={onSendSort} />
      {/* all message */}
      <MainPost
        isConnected={isConnected as boolean}
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

export type ValidationType = {
  size: string;
};

type DataWebsocketType = {
  dataWebsocket: GetAllMessageNewAPIType[] | SendAnswerType[] | [];
  isConnected: boolean;
};
