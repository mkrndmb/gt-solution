import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersList from "../UsersList/UsersList";
import { fetchDataFromAPI, setFilteredData } from "../../redux/adminSlice";
import "./admin-panel.css";

export function AdminPanel() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(fetchDataFromAPI());
    setLoading(false);
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="admin-container">
      <input
        className="search-input"
        value={input}
        placeholder="search by name, email, role"
        onChange={handleInputChange}
      />
      {loading && <h2>Loading...</h2>}
      <div className="admin">
        <UsersList input={input} />
      </div>
    </div>
  );
}
