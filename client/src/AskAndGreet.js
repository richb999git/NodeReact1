import React from "react";
import "./App.css";

export default function AskAndGreet() {
    const [name, setName] = React.useState('');
    const [greeting, setGreeting] = React.useState('');

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
        <>
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
            <p>{greeting}</p>
        </>
    )
}
