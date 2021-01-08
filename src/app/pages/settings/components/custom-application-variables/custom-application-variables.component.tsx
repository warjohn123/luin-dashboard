import { Button, Card, Input } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as Filter } from "../../../../../assets/icons/filters.svg";
import { ReactComponent as Search } from "../../../../../assets/icons/search.svg";
import { setCustomApplicationVariablesSearch } from "../../../../states/custom-application-variable";
import { RootState } from "../../../../states/rootReducer";
import { CustomApplicationVariablesTable } from "./components/custom-application-variables-table.component";

import { LuinAddCustomVariablesModal } from "./modals/add-custom-variables";
import styles from "./custom-application-variables.module.scss";
import { LuinApplication } from "../../../../api/application.api";
import { Application } from "../../../../models/Application";

export function CustomApplicationVariables() {
  const dispatch = useDispatch();
  const [isAddCustomVariableOpen, setIsAddCustomVariableOpen] = useState<
    boolean
  >(false);

  const handleSearchChange = (e: any) => {
    dispatch(setCustomApplicationVariablesSearch(e.target.value));
  };

  const searchKey: string = useSelector(
    (state: RootState) =>
      state.customApplicationVariable.customApplicationVariablesSearch || ""
  );

  const [application, setApplication] = useState<Application>();

  useEffect(() => {
    const applicationdId = new LuinApplication().getCurrentAppIdFromPath();
    new LuinApplication().getApplication(applicationdId).then((result: any) => {
      setApplication(result["data"][0]);
    });
  }, []);

  return (
    <Card>
      <Title level={4} className="title">
        Custom Application Variables
      </Title>

      <div className={styles.filtersContainer}>
        <div>
          <Input
            className={styles.input}
            value={searchKey}
            onChange={handleSearchChange}
            prefix={<Search style={{ marginRight: "10px" }}></Search>}
            placeholder="Search custom variable"
          ></Input>
          <Filter className={styles.svg}></Filter>
        </div>

        <div>
          <Button
            onClick={() => {
              setIsAddCustomVariableOpen(true);
            }}
          >
            Add Custom Variable
          </Button>

          {application && (
            <LuinAddCustomVariablesModal
              application={application}
              setIsAddCustomVariableOpen={setIsAddCustomVariableOpen}
              visible={isAddCustomVariableOpen}
            ></LuinAddCustomVariablesModal>
          )}
        </div>
      </div>

      <CustomApplicationVariablesTable></CustomApplicationVariablesTable>
    </Card>
  );
}
