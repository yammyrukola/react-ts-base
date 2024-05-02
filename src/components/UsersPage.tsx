import { FC, useEffect, useState } from "react";
import { IUser } from "../types/types";
import axios from "axios";
import List from "./List";
import UserItem from "./UserItem";
import { useNavigate } from "react-router-dom";

const URL_USERS = "https://jsonplaceholder.typicode.com/users";

const UsersPage: FC = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await axios.get<IUser[]>(URL_USERS);
      setUsers(response.data);
    } catch (e) {
      console.log("произошла ошибка при загрузке пользователей: ", e);
    }
  }

  return (
    <List
      items={users}
      renderItem={(user: IUser) => (
        <UserItem
          key={user.id}
          user={user}
          onClick={(user) => {
            navigate(`/user/${user.id}`);
          }}
        />
      )}
    />
  );
};

export default UsersPage;
