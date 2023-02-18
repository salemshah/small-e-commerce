import React, {useContext, useEffect} from "react";
import {UserContext} from "../context/user";
//import loginUser from "../strapi/loginUser";

export default function Alert() {
  const {showMessage, setShowMessage} = useContext(UserContext);

  useEffect(() => {
    let msg;
    msg = setTimeout(() =>  setShowMessage(null), 10000)
    return () => {
      clearTimeout(msg);
    }
  });

  return (
    <>
      {showMessage === true || showMessage === false ?
        <div className="text-center custom-alert"
             style={!showMessage ? {backgroundColor: "rgb(238,171,176)"} : {}}>
          {showMessage ? "Vous avez bien connecté 👏" : "Désolé réessayer encore 😔"}
          <span className="px-1 ml-2 bg-danger rounded text-light" style={{cursor: "pointer"}}
                onClick={() => setShowMessage(null)}>x</span>
        </div>
        : ""
      }
    </>
  );
}
