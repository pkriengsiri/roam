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
      setEmailStatus(false);
      setEmailStatusMessage("An email address is required");
    } else if (!emailRegex.test(value)) {
      setEmailStatus(false);
      setEmailStatusMessage("Please enter a valid email");
    } else {
      setEmailStatus(true);
    }
    setEmail(value);
  };

  return [email, handleEmailChange, emailStatus, emailStatusMessage];
};

export default useEmail;
