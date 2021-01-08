import { Avatar } from "antd";
import React from "react";

interface ApplicationInitialType {
  title: string;
}

export const LuinApplicationInitial: React.FunctionComponent<ApplicationInitialType> = ({
  title,
}) => {
  const getInitials = function (string: string) {
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  let initials = getInitials(title);

  return (
    <>
      <Avatar style={{ backgroundColor: "#B660F0" }}>{initials}</Avatar>
    </>
  );
};
