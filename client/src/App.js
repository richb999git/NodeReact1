import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);
  const [name, setName] = React.useState('');
  const [greeting, setGreeting] = React.useState('');

  React.useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const handleChange = (value) => {
      setName(value);
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      setName('')

      fetch(`/api/greeting?name=${encodeURIComponent(name)}`)
          .then(response => response.json())
          .then(jsonResponse => setGreeting(jsonResponse.greeting))

      // Alternative using await (async needed at function top level)
      // const respose = await fetch(`/api/greeting?name=${encodeURIComponent(name)}`)
      // const jsonResponse = await respose.json()
      // setGreeting(jsonResponse.greeting)
  }

  return (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>{!data ? "Loading..." : data}</p>
        </header>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Enter your name: </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={event => handleChange(event.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
        <p>Greeting: {greeting}</p>
    </div>
  );
}

export default App;
