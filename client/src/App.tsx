import { useState } from "react";
import "./App.scss";
import SignIn from "./SignIn";

const App = () => {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <>
      {!signedIn ? (
        <SignIn setSignedInState={setSignedIn} />
      ) : (
        <div>Logged in!</div>
      )}
    </>
  );
};

export default App;
