import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    fetch("http://172.232.70.228:8080/api/gql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        mutation generateOTP($email: NullString) {
          generateOTP(input: { email: $email })
        }
        `,
        variables: { email: email },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setOtp(data.generateOTP);
      });
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    fetch("http://172.232.70.228:8080/api/gql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation login($email: String!, $otp: String!) {
            login(email: $email, otp: $otp)
          }
        `,
        variables: { email, otp },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.login === true) {
          console.log(data);
        } else {
          console.log(data);
        }
      });
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit">Get OTP</button>
      </form>
      {otp && (
        <form onSubmit={handleSignIn}>
          <label>
            OTP:
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </label>
          <button type="submit">Sign In</button>
        </form>
      )}
    </div>
  );
}
export default LoginPage;
