import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import {
  GetAllMessageNewAPIType,
  SendAnswerType,
} from "../api/post_message_api";

const socket = io(`${process.env.REACT_APP_SITE_LISTEN_SOCKET}`);

export function SocketHook(connectName: string) {
  const location = useLocation()
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [dataWebsocket, setDataWebsocket] = useState<
    GetAllMessageNewAPIType[] | SendAnswerType[] | []
  >([]);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(false);
    });

    socket.on("disconnect", () => {
      setIsConnected(true);
    });

    socket.on(connectName, (data: GetAllMessageNewAPIType | SendAnswerType) => {
      if (data !== undefined) {
        setDataWebsocket([data]);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, [location.pathname]);

  return [dataWebsocket, isConnected];
}
