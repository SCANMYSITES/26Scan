import SECSummary from "./SECSummary";
import SECAlertsPlaceholder from "./SECAlertsPlaceholder";
import SECAuditPlaceholder from "./SECAuditPlaceholder";

export default function SECDashboard() {
  return (
    <div className="dashboard-panel">
      <SECSummary />
      <SECAlertsPlaceholder />
      <SECAuditPlaceholder />
    </div>
  );
}

