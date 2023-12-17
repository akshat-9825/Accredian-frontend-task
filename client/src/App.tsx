import { useState } from "react";
import "./App.scss";
import SignIn from "./SignIn";

const App = () => {
  const [signedIn, setSignedIn] = useState(false);
  console.log("Signed in state: ", signedIn);
  return <>{!signedIn ? <SignIn setSignedInState={setSignedIn} /> : null}</>;
};

export default App;
