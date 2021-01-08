import React from "react";
import { LuinDeviceListTable } from "./components/device-list-table.component";
import { Route, Switch } from "react-router-dom";
import { LuinDeviceItem } from "./sub-pages/device-item.page";
import { LuinDeviceIntegrations } from "./sub-pages/device-integrations.page";

export function LuinDevices() {
  return (
    <Switch>
      <Route
        path="/:appId/devices"
        exact
        component={LuinDeviceListTable}
      ></Route>
      <Route
        path="/:appId/devices/device-item/:deviceId"
        exact
        component={LuinDeviceItem}
      ></Route>
      <Route
        path="/:appId/devices/device-item/:deviceId/integrations"
        exact
        component={LuinDeviceIntegrations}
      ></Route>
    </Switch>
  );
}
