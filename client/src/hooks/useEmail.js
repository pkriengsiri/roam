import React, { useState } from "react";

const useEmail = (initialValue) => {
  const [email, setEmail] = useState(initialValue || "");
  const [emailStatus, setEmailStatus] = useState(false);
  const [emailStatusMessage, setEmailStatusMessage] = useState(
    "An email address is required"
  );

  const handleEmailChange = (value) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value === "") {
      setEmailStatusMessage("An email address is required");
    } else if (!emailRegex.test(value)) {
      setEmailStatusMessage("Please enter a valid email");
    }

    // if (value.length > 4) {
    //   const regex = new RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/);
    //   if (regex.test(value)) {
    //     setZipCode(value);
    //   }
    // } else {
    //   setZipCode(value);
    // }
    setEmail(value);
  };

  return [email, handleEmailChange, emailStatus, emailStatusMessage];
};

export default useEmail;
