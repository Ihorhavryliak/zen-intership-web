import React from "react";
import { Form } from "../Form/Form";
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
          <Form />
        </div>
      </div>
    </main>
  );
};
export default Home;
