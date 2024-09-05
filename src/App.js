import axios from "axios";
import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://randomuser.me/api?results=10")
      .then((response) => {
        setUsers(response.data.results);
      })
      .catch((error) => {
        console.error("Veri çekilirken bir hata oluştu", error);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.name.first} ${user.name.last}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <input
        className="searchInput"
        type="text"
        placeholder="İsim Giriniz..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user, index) => (
          <li key={index}>
            {user.name.title}
            {user.name.first} {user.name.last}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
