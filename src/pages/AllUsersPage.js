import React, { useState, useEffect } from "react";
import UserTab from "../components/UserTab";
import "../styling/AllUsersPage.css";

const AllUsersPage = (props) => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    let userList = [];
    await props.firestore
      .collection("users")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          userList.push(doc.data());
        });
      });
    setUsers(userList);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="page">
      <div className="users-list">
        {users.length > 0 &&
          users.map((item) => (
            <UserTab
              user={item}
              key={item.id}
              onLookupCards={() => props.lookupUserCards(item.id)}
              onLookupUser={() => props.lookupUser(item.id)}
              onSendMessage={() => props.sendMessage(item.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default AllUsersPage;
