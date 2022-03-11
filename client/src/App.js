import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AskAndGreet from "./AskAndGreet";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>{!data ? "Loading..." : data}</p>
            <AskAndGreet />
        </header>
    </div>
  );
}

export default App;
