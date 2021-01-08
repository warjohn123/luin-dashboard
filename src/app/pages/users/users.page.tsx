import { Button, Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import { LuinUserListTable } from "./components/user-list-table.component";
import { ReactComponent as Filter } from "../../../assets/icons/filters.svg";
import { ReactComponent as Search } from "../../../assets/icons/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/rootReducer";
import { loadUsersCount, setUsersSearch } from "../../states/user";
import { UserCount } from "../../models/User";
import styles from "./users.module.scss";
import { LuinSaveUserModal } from "./modals/save-user.modal";

export function LuinUsers() {
  const dispatch = useDispatch();
  const [isSaveUserModalOpen, setIsSaveUserModalOpen] = useState<boolean>(
    false
  );

  const usersCount: UserCount = useSelector(
    (state: RootState) => state.user.usersCount || 0
  );

  const isLoadingUsersCount: boolean = useSelector(
    (state: RootState) => state.user.isLoadingUsersCount || false
  );

  const searchKey: string = useSelector(
    (state: RootState) => state.user.usersSearch || ""
  );

  const handleSearchChange = (e: any) => {
    dispatch(setUsersSearch(e.target.value));
  };

  const addUser = () => {
    setIsSaveUserModalOpen(true);
  };

  useEffect(() => {
    dispatch(loadUsersCount());
  }, [dispatch]);

  return (
    <Card>
      <div className={styles.filtersContainer}>
        <div>
          <Input
            className={styles.input}
            value={searchKey}
            onChange={handleSearchChange}
            prefix={<Search style={{ marginRight: "10px" }}></Search>}
            placeholder="Search user name"
          ></Input>
          <Filter className={styles.svg}></Filter>
        </div>

        {!isLoadingUsersCount && (
          <div>
            <div className={styles.totalText}>
              {usersCount.Count} total users registered
            </div>
            <Button type="primary" onClick={addUser} className={styles.addBtn}>
              Add User
            </Button>
            <LuinSaveUserModal
              setIsSaveUserModalOpen={setIsSaveUserModalOpen}
              visible={isSaveUserModalOpen}
            ></LuinSaveUserModal>
          </div>
        )}
      </div>
      <LuinUserListTable></LuinUserListTable>
    </Card>
  );
}
