import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [response, setResponse] = useState({});

  function fetchData(url) {
    const headers = new Headers();

    const encodedString = btoa(`${username}:${password}`);

    headers.append("Authorization", `basic ${encodedString}`); // Base64 encoding

    fetch("https://centrum-backend.vercel.app/login/dealer/dashboard/ALL", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the API response below the form
        // setResponse(JSON.stringify(data, null, 2));
        setResponse(data);
        console.log(data);
        if (data.status === "success") {
          navigate(`/dasboard/${username}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Display error message
        setResponse("<p>Error fetching data. Please try again.</p>");
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // const responseDiv = document.getElementById("response");

    fetchData();

    // Define API endpoint based on designation
    // let apiUrl;
    // switch (designation) {
    //   case "admin":
    //     apiUrl = "https://centrum-backend.vercel.app/login/admin/dashboard/ALL";
    //     break;
    //   case "research_head":
    //     apiUrl =
    //       "https://centrum-backend.vercel.app/login/ra_head/dashboard/ALL";
    //     break;
    //   case "research_analyst":
    //     apiUrl = "https://centrum-backend.vercel.app/login/ra/dashboard/ALL";
    //     break;
    //   case "dealer":
    //     apiUrl =
    //       "https://centrum-backend.vercel.app/login/dealer/dashboard/ALL";
    //     break;
    //   default:
    //     setResponse("<p>Please select a designation</p>");
    //     return;
    // }

    // Call fetch function with appropriate credentials
    // if (apiUrl) {
    //   // fetchData(apiUrl);
    //   navigate(`/dasboard/${username}`);
    //   // Clear form fields
    //   setUsername("");
    //   setPassword("");
    // }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="designation" className="block font-bold mb-2">
              Designation
            </label>
            <select
              id="designation"
              name="designation"
              className="w-full p-2 border rounded"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            >
              <option value="">Select</option>

              <option value="dealer">Dealer</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="username" className="block font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer transition duration-300 hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        {/* <div className="mt-6 text-center" id="response">
          {response}
        </div> */}
      </div>
    </div>
  );
}

export default LoginForm;
