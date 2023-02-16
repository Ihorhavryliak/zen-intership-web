import React from "react";
import "./Home.css";
import { Images } from "./Images/Images";

const Home = () => {
  return (
    <main>
      <div className="container position__relative overflow__hidden">
        <div className="row">
          {/* images */}
          <Images />
          {/*  form */}
          <span className="z__index__6 position__relative">
            <h1 className="h1__bold">Reach out to us!</h1>
            {/*     name */}
            <div>
              <input type="text" className="input" placeholder="Your name*" />
            </div>
            {/* email */}
            <div>
              <input
                type="email"
                className="input"
                placeholder="Your e-mail*"
              />
            </div>
            {/* massage */}
            <div>
              <textarea
                className="input textarea__height"
                placeholder="Your e-mail*"
              />
            </div>
            {/* button */}
            <div>
              <button className="btn">Send message</button>
            </div>
          </span>
        </div>
      </div>
    </main>
  );
};
export default Home;
