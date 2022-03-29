import { useEffect, useState } from "react";
import "./user.css";
import { setUsersData } from "../../redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";

export default function User({ user }) {
  const users = useSelector((state) => state.admin?.users);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    setInfo({ name: user.name, email: user.email, role: user.role });
  }, []);

  const handleUpdate = (e) => {
    e.stopPropagation();
    const updatedData = users.map((u) =>
      u.id === user.id
        ? { ...u, name: info.name, email: info.email, role: info.role }
        : u
    );
    dispatch(setUsersData(updatedData));
    setEdit(false);
  };

  // const handleDelete = () => {
  //   const updatedData = users.filter((u) => u.id != user.id);
  //   console.log(updatedData, user.id, "delete");
  //   dispatch(setUsersData(updatedData));
  // };

  return (
    <div className={`user ${user.isChecked ? "checked" : ""}`} id={user.id}>
      <div className="input-check">
        <input
          type="checkbox"
          name="check"
          checked={user.isChecked}
          id={`${user.id} ${"check"}`}
        />
      </div>
      {edit ? (
        <>
          <input
            className="input-name"
            type="text"
            value={info.name}
            onChange={(e) => {
              e.stopPropagation();
              setInfo((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
          <input
            className="input-email"
            type="text"
            value={info.email}
            onChange={(e) => {
              e.stopPropagation();
              setInfo((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
          />
          <input
            className="input-role"
            type="text"
            value={info.role}
            onChange={(e) => {
              e.stopPropagation();
              setInfo((prev) => {
                return { ...prev, role: e.target.value };
              });
            }}
          />
        </>
      ) : (
        <>
          <div className="name">{info.name}</div>
          <div className="email">{info.email}</div>
          <div className="role">{info.role}</div>
        </>
      )}
      <div className="action">
        {edit ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <i
            className="edit-icon far fa-edit"
            onClick={(e) => {
              e.stopPropagation();
              setEdit(true);
            }}
          ></i>
        )}
        <i
          className="delete-icon far fa-trash-alt"
          id={`${user.id} ${"delete"}`}
        ></i>
      </div>
    </div>
  );
}
