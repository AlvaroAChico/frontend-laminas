import Cookies from "js-cookie";
import React from "react";
import EditorElaminas from "./features/editor/editor-elaminas";

const App: React.FC = () => {
  const [tokenValue, setTokenValue] = React.useState("");

  React.useEffect(() => {
    const token = Cookies.get("jwt_token");
    setTokenValue(token || "");
  });

  // if (tokenValue) {
  //   window.location.href = "https://test.elaminas.com";
  //   return null;
  // }

  return <EditorElaminas />;
};

export default App;
