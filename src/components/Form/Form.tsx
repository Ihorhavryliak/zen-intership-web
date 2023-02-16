import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { sendMessage } from "../../redux/SendMessageRedux/send_message_redux";
import { getIsSuccessMessage } from "../../redux/SendMessageRedux/send_message_selector";
import { AppDispatch } from "../../redux/store";

export const Form = () => {
  const dispatch: AppDispatch = useDispatch();
  const isSuccessSend = useSelector(getIsSuccessMessage);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [validation, setValidation] = useState("");
  const onSendMessage = () => {
    if (name.length === 0 || email.length === 0 || message.length === 0) {
      return setValidation("All field require");
    }
    dispatch(sendMessage(name, email, message));
  };

  return (
    <>
      {isSuccessSend === true ? (
        <div className="success__message">
          <h1> Thank you for your request!</h1>
        </div>
      ) : (
        <span className="z__index__6 position__relative">
          <h1 className="h1__bold">Reach out to us!</h1>
          {/*     name */}
          <div>
            <input
              type="text"
              className="input"
              placeholder="Your name*"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* email */}
          <div>
            <input
              type="email"
              className="input"
              placeholder="Your e-mail*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* massage */}
          <div>
            <textarea
              className="input textarea__height"
              placeholder="Your message*"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          {validation.length > 0 && (
            <div className="not__valid">{validation}</div>
          )}
          {isSuccessSend === false && (
            <div className="not__valid">
              An error occurred, try again please
            </div>
          )}
          {/* button */}
          <div>
            <button className="btn" onClick={onSendMessage}>
              Send message
            </button>
          </div>
        </span>
      )}
    </>
  );
};
