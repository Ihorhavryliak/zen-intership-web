import React from "react";
import { GetAllMessageNewAPIType } from "../../api/post_message_api";
import { Transition } from "react-transition-group";
import {
  transitionsModalProfile,
  transitionsModalProfileShadow,
} from "../../utils/AnimationList";

export const GalleryMail = (props: GalleryMailType) => {
  const { setOnShowWindow, onShowWindow, data } = props;
  return (
    <>
      <Transition in={onShowWindow === data.id} timeout={150}>
        {(state: any) => (
          <div
            className="modal fade show"
            style={{
              transition: "all 0.3s",
              opacity: 0,
              top: "0",
              display: "none",
              //@ts-ignore
              ...transitionsModalProfile[state],
            }}
          >
            <div className="modal-dialog ">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Photo
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setOnShowWindow({ id: 0 })}
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <img
                    src={`${process.env.REACT_APP_SITE_SERVER_URL}/${data.file}`}
                    alt={data.name}
                  />{" "}
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
      <Transition in={onShowWindow === data.id} timeout={150}>
        {(state: any) => (
          <div
            className="modal fade show z__index__1200"
            style={{
              transition: "all 0.3s",
              opacity: 0,
              display: "none",
              //@ts-ignore
              ...transitionsModalProfileShadow[state],
            }}
          >
            <div className="modal-backdrop fade show "></div>
          </div>
        )}
      </Transition>
    </>
  );
};

type GalleryMailType = {
  onShowWindow: number;
  setOnShowWindow: (val: { id: number }) => void;
  data: GetAllMessageNewAPIType;
};
