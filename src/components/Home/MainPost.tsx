import { useState } from "react";
import noPhoto from "../../assets/img/noPhoto.png";
import { FaFileAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { parseDate } from "../../utils/parseDate";
import { FormAnswer } from "../Forms/FormAnswer";
import { GetAllMessageNewAPIType } from "../../api/post_message_api";
import { AnswerPost } from "./AnswerPost";
import { MainGallery } from "./MainGallery";

export const MainPost = (props: MainPostType) => {
  const { messageAllData, isOpenForm, onIsOpenForm, isConnected } = props;
  // modal
  const [onShowWindow, setOnShowWindow] = useState({ id: 0 });

  return (
    <>
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
                {/* url */}
                {data.homePage.length > 0 && (
                  <div className="my-2">{data.homePage}</div>
                )}
                {/*  body message */}
                <div className="description__block">
                  <div dangerouslySetInnerHTML={{ __html: data.message }}></div>
                </div>
                {/*   file img */}
                <div className="mt-3">
                  {data.file.length > 0 &&
                  data.file.slice(data.file.indexOf(".")) === ".txt" ? (
                    <span className="fs-6">
                      <FaFileAlt /> {data.file}
                    </span>
                  ) : data.file.length > 0 ? (
                    <>
                      {" "}
                      <img
                        onClick={() => setOnShowWindow({ id: data.id })}
                        src={`${process.env.REACT_APP_SITE_SERVER_URL}/${data.file}`}
                        alt={data.name}
                        className={`img__added`}
                      />
                      <MainGallery
                        onShowWindow={onShowWindow.id}
                        setOnShowWindow={setOnShowWindow}
                        data={data}
                      />
                    </>
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
                    {isOpenForm === data.id ? "Close" : "Answer"}
                  </button>
                </div>
                <div className="d-flex justify-content-end">
                  <div className="col-10">
                    {isOpenForm === data.id ? (
                      <FormAnswer childId={data.id} />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              {/* answer message */}
              <div className="block__answer">
                <AnswerPost data={data} />
              </div>
            </div>
          );
        })}
    </>
  );
};

type MainPostType = {
  messageAllData: GetAllMessageNewAPIType[];
  onIsOpenForm: (val: number) => void;
  isOpenForm: number;
  isConnected: boolean;
};
