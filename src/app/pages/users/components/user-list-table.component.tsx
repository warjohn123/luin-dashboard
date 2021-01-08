import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, UsersResponse } from "../../../models/User";
import { RootState } from "../../../states/rootReducer";
import { loadUsers } from "../../../states/user";
import { config } from "./users-table.config";

export function LuinUserListTable() {
  const dispatch = useDispatch();

  const users: UsersResponse = useSelector(
    (state: RootState) => state.user.users || []
  );

  const isLoadingUsers: boolean = useSelector(
    (state: RootState) => state.user.isLoadingUsers || false
  );

  const searchKey: string = useSelector(
    (state: RootState) => state.user.usersSearch || ""
  );
  let allUsers: User[] = users.data;
  let displayedUsers: User[] = users.data;

  if (searchKey) {
    displayedUsers = allUsers.filter((user) =>
      user.username.toLowerCase().includes(searchKey.toLowerCase())
    );
  } else {
    displayedUsers = allUsers;
  }

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <>
      <Table
        loading={isLoadingUsers}
        dataSource={displayedUsers}
        columns={config}
      />
    </>
  );
}
