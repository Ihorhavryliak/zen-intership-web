import "./Images.css";
import oneImg from "../../../assets/img/footer/red_cartoon.png";
import twoImg from "../../../assets/img/footer/Vector3.png";
import treeImg from "../../../assets/img/footer/Vector4.png";
import fourImg from "../../../assets/img/footer/Vector5.png";
import fiveImg from "../../../assets/img/footer/Vector6.png";
import sixImg from "../../../assets/img/footer/Group80.png";
import sevenImg from "../../../assets/img/red_cartoon4.png";

export const Images = () => {
  return (
    <span>
      <img
        src={oneImg}
        alt="smile"
        className="footer__img__left position__absolute "
      />
      {/*    icons */}
      <img
        src={twoImg}
        alt="smile"
        className="footer__img__linked position__absolute footer__icons__top"
      />
      <img
        src={treeImg}
        alt="smile"
        className="footer__img__twitter position__absolute footer__icons__top"
      />
      <img
        src={fourImg}
        alt="smile"
        className="footer__img__facebook position__absolute footer__icons__top"
      />
      <img
        src={fiveImg}
        alt="smile"
        className="footer__img__pinter position__absolute footer__icons__top"
      />
      {/*    icons end */}
      <img
        src={sixImg}
        alt="smile"
        className="footer__img__scare position__absolute "
      />
      <img
        src={sevenImg}
        alt="smile"
        className="footer__img__yellow position__absolute "
      />
    </span>
  );
};
