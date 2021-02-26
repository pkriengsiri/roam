import React from "react";
import "./Alert.css";

const Alert = (props) => {
  return (
    <p className={`${props.color}`}>
      {props.children}
    </p>
  );
};

export default Alert;
