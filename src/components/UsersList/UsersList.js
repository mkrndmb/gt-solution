import { useDispatch, useSelector } from "react-redux";
import User from "../User/User";
import "./userslist.css";
import { setUsersData, setFilteredData } from "../../redux/adminSlice";
import { useEffect, useState } from "react";

export default function UsersList({input}) {
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin?.users);
  const filteredUsers = useSelector((state) => state.admin?.filteredUsers);

  const pages = Math.ceil(filteredUsers?.length / 10);
  const usersPerPage = filteredUsers?.slice(
    (pageNumber - 1) * 10,
    (pageNumber - 1) * 10 + 10
  );

  useEffect(() => {
    if(users.length>0)
    dispatch(setFilteredData(users))
  }, [users])

  useEffect(() => {
    const filteredData = users.filter(
      (user) =>
        user.role.includes(input) ||
        user.name.includes(input) ||
        user.email.includes(input)
    );
    if(input.length>0)
    dispatch(setFilteredData(filteredData))
  }, [input, users])
  

  const handleSelectAll = (e) => {
    const pageIDs = usersPerPage.map((item) => item.id);
    const filtered = users.map((user) =>
      pageIDs.includes(user.id)
        ? { ...user, isChecked: e.target.checked }
        : user
    );
    dispatch(setUsersData(filtered));
  };

  const handleClick = (e) => {
    if (!e.target.id) return;

    const id = e.target.id.split(" ")[0];
    const actionType = e.target.id.split(" ")[1];

    if (actionType === "delete") {
      const filtered = users.filter((user) => user.id !== id);
      dispatch(setUsersData(filtered));
    }

    if (actionType === "check") {
      const filtered = users.map((user) =>
        user.id === id ? { ...user, isChecked: e.target.checked } : user
      );
      dispatch(setUsersData(filtered));
    }
  };

  const handleDelete = () => {
    const filtered = users.filter((user) => !user.isChecked);
    dispatch(setUsersData(filtered));
  };

  return (
    <div className="userlist">
      <div className="list-header">
        <div className='input-check'>
        <input
          type="checkbox"
          name="check"
          onClick={handleSelectAll}
          id={0}
          checked={
            usersPerPage.filter((user) => user.isChecked).length ===
            usersPerPage.length
          }
        />
        </div>
        <div className='name'>Name</div>
        <div className='email'>Email</div>
        <div className='role'>Role</div>
        <div className='action'>Actions</div>
      </div>
      <div className='list' onClick={handleClick}>
        {usersPerPage?.map((user) => {
          return (
            <div key={user.id}>
              <User user={user} />
            </div>
          );
        })}
      </div>
      <div className="btn-cont">
        <button className="delete-btn" onClick={handleDelete}>
          Delete Selected
        </button>
        {users && (
          <div className='page-cont'>
            {[...Array(pages)].map((_, i) => {
              return (
                <button
                  key={i}
                  className={`page-button  ${
                    pageNumber === i + 1 ? "current" : ""
                  }`}
                  onClick={() => {
                    setPageNumber(i + 1);
                  }}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
