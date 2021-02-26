import React from "react";

const AlertContext = React.createContext({
    display: false,
    msg: "default value",
    theme: "",
    onDisplay: () => undefined
});

export default AlertContext;