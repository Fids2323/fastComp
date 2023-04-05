import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";
const Users = () => {
  const params = useParams();

  const { userId } = params;
  return (
    <>
      <UserProvider>
        {userId ? <UserPage userId={userId} /> : <UsersListPage />}
      </UserProvider>
    </>
  );
};

export default Users;
