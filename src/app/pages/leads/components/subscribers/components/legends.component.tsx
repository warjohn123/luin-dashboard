import React from "react";

import { ReactComponent as Envelope } from "../../../../../../assets/icons/envelope.svg";
import { ReactComponent as Avatar } from "../../../../../../assets/icons/avatar.svg";

export function LuinSubscriberLegends() {
  return (
    <div className="legends-container">
      <span>Legends:</span>

      <span className="legend-item">
        <Envelope></Envelope>
        Received from website
      </span>

      <span className="legend-item">
        <Avatar></Avatar>
        Manually added
      </span>
    </div>
  );
}
