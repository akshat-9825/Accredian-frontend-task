import { useState } from "react";
import "./App.scss";
import SignIn from "./SignIn";

const App = () => {
  const [signedIn, setSignedIn] = useState(false);
  return <>{!signedIn ? <SignIn setSignedInState={setSignedIn} /> : null}</>;
};

export default App;
