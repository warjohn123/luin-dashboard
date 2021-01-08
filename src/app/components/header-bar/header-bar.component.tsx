import { ReactComponent as Logo } from "../../../assets/icons/logo.svg";
import { ReactComponent as ChevronDown } from "../../../assets/icons/chevron-down.svg";
import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./header-bar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsAppBarOpen } from "../../states/app-bar";
import { RootState } from "../../states/rootReducer";
import { LuinApplicationsBar } from "../applications-bar/applications-bar.component";
import { LuinApplicationInitial } from "../application-initial/application-initial.component";
import {
  loadApplications,
  loadCurrentApplicationById,
} from "../../states/application";
import { ApplicationsResponse } from "../../models/Application";
import { LuinAppNavigator } from "../app-navigator/app-navigator.component";
import { LuinApplication } from "../../api/application.api";
import { LuinHeaderAccountOptionsComponent } from "../header-account-options/header-account-options.component";
import { LuinAccountSettingsHeader } from "../account-settings-header/account-settings-header";
const { Header } = Layout;

export function LuinHeaderBar() {
  const dispatch = useDispatch();
  const applicationId = new LuinApplication().getCurrentAppIdFromPath();
  // const [currentApp, setCurrentApp] = useState<any>();

  const isAppBarOpen = useSelector(
    (state: RootState) => state.appBar.isAppBarOpen
  );

  const applications: ApplicationsResponse = useSelector(
    (state: RootState) => state.application.applications || []
  );

  const isLoadingApplications: boolean = useSelector(
    (state: RootState) => state.application.isLoadingApplications || false
  );

  const currentApp: any = useSelector(
    (state: RootState) => state.application.currentApplication || {}
  );

  useEffect(() => {
    dispatch(loadCurrentApplicationById(applicationId));
    // new LuinApplication().getApplication(applicationId).then((result) => {
    //   const app = result.data[0];
    //   setCurrentApp(app);
    // });
  }, [applicationId, dispatch]);

  useEffect(() => {
    dispatch(loadApplications());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header className={styles.AppHeader}>
        <div>
          <Logo className={styles.logo} />
          {currentApp && (
            <div
              className={styles.dropdownContainer}
              onClick={() => {
                dispatch(setIsAppBarOpen(!isAppBarOpen));
              }}
            >
              {currentApp.name && (
                <>
                  <LuinApplicationInitial
                    title={currentApp.name}
                  ></LuinApplicationInitial>

                  <span style={{ marginLeft: "8px" }}>{currentApp.name}</span>

                  <ChevronDown style={{ marginLeft: "16px" }} />
                </>
              )}
            </div>
          )}
        </div>

        <LuinHeaderAccountOptionsComponent></LuinHeaderAccountOptionsComponent>
      </Header>

      {isAppBarOpen && (
        <LuinApplicationsBar
          isLoadingApplications={isLoadingApplications}
          applications={applications.data}
        ></LuinApplicationsBar>
      )}

      {currentApp && (
        <>
          {window.location.pathname === `/${applicationId}/account` ? (
            <LuinAccountSettingsHeader></LuinAccountSettingsHeader>
          ) : (
            <LuinAppNavigator></LuinAppNavigator>
          )}
        </>
      )}
    </React.Fragment>
  );
}
