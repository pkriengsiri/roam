import React from "react";

const Alert = (props) => {
  return (
    <div className={`notification is-danger`}>
      <button className="delete"></button>
      {props.children}
    </div>
  );
};

export default Alert;
