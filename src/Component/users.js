import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users(search: {}, roleID: "") {
      results {
        id
        name
        email
      }
    }
  }
`;

const UserListPage = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const users = data.users.results;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            // Add additional fields you want to display
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListPage;
