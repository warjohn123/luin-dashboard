import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LuinApplication } from "../../../../../api/application.api";
import { getVariableType } from "../../../../../helpers";
import { RootState } from "../../../../../states/rootReducer";
import { config } from "./custom-application-variables-config";

interface Variable {
  name: string;
  type: string;
  value: any;
}

export function CustomApplicationVariablesTable() {
  const applicationId: string = new LuinApplication().getCurrentAppIdFromPath();
  const [variables, setVariables] = useState<Variable[]>();
  const [isLoadingApplication, setIsLoadingApplication] = useState<boolean>(
    true
  );

  useEffect(() => {
    setIsLoadingApplication(true);
    new LuinApplication().getApplication(applicationId).then((result) => {
      const app = result.data[0];
      let variables = [];
      for (let custom in app.custom) {
        variables.push({
          name: custom,
          type: getVariableType(app.custom[custom]),
          value: app.custom[custom],
        });
      }

      setVariables(variables);
      setIsLoadingApplication(false);
    });
  }, [applicationId]);

  let allVariables: Variable[] = variables || [];
  let displayedVariables: Variable[] = variables || [];

  const searchKey: string = useSelector(
    (state: RootState) =>
      state.customApplicationVariable.customApplicationVariablesSearch || ""
  );

  if (searchKey) {
    displayedVariables = allVariables.filter((variable) =>
      variable.name.toLowerCase().includes(searchKey.toLowerCase())
    );
  } else {
    displayedVariables = allVariables;
  }

  return (
    <>
      <Table
        loading={isLoadingApplication}
        dataSource={displayedVariables}
        columns={config}
      />
    </>
  );
}
