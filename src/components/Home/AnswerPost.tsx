import React from "react";
import noPhoto from "../../assets/img/noPhoto.png";
import { FaFileAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { parseDate } from "../../utils/parseDate";
import { GetAllMessageNewAPIType } from "../../api/post_message_api";


export const AnswerPost = (props: AnswerPostType) => {
  const { data } = props;
  return (
    <>
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
                  <span className="me-2">{parseDate(answer.createdAt)}</span>
                  <span>
                    <FaArrowUp className="me-2" />0
                    <FaArrowDown className="ms-2" />
                  </span>
                </div>
              </div>
              {/*  body message */}
              <div className="description__block">
                <div dangerouslySetInnerHTML={{ __html: answer.message }}></div>
              </div>
              {/*   file img */}
              <div className="mt-3">
                {answer.file.length > 0 &&
                answer.file.slice(answer.file.indexOf(".")) === ".txt" ? (
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
    </>
  );
};

type AnswerPostType = {
  data: GetAllMessageNewAPIType;
};