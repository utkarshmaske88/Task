import React from "react";
import { ApolloProvider } from "@apollo/client";
// import { client } from "./graphql/client";
import client from "pg/lib/native/client";
import LoginPage from "./Component/main";
import UserListPage from "./Component/users";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {!loggedIn ? <LoginPage onLogin={handleLogin} /> : <UserListPage />}
      </div>
    </ApolloProvider>
  );
}

export default App;
