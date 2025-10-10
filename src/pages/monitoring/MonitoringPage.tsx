import axios from "axios";
import { lazy, useContext, useEffect, useState } from "react";
import LoadingSpinner from "../../common/LoadingSpinner";
import { AuthContext } from "../../context/AuthContext";
import ServiceDown from "../../hooks/ServiceDown";
import type { LevelGoal } from "../../styles/types";
import type { TabsDTO } from "../../utils/TabsDTO";

const MultiLevelMenu = lazy(() => import("../../components/MultiLevelMenu"));
const NoGoalSetUp = lazy(() => import("../../components/business/NoGoalSetUp"));

const MonitoringPage = () => {
  const [tabs, setTabs] = useState<TabsDTO>([]);
  const [l1Order, setL1Order] = useState<LevelGoal[]>([]);
  const [l1, setL1] = useState<LevelGoal | undefined>();
  const [loading, setLoading] = useState(true);
  const [serverUp, setServerUp] = useState<boolean | null>(null);

  const { authState } = useContext(AuthContext);
  const user = authState.user;

  useEffect(() => {
    async function fetchData() {
      try {
        const pingResult = await axios.get(
          "http://localhost:9090/api/gateway/ping"
        );
        const serverIsUp = pingResult.data === 200;
        setServerUp(serverIsUp);

        if (!serverIsUp) return;

        const userId = user?.email;
        if (!userId) return;

        const tabsResult = await axios.get<TabsDTO>(
          `http://localhost:9090/api/tabs/${userId}`
        );
        setTabs(tabsResult.data);

        if (tabsResult.data.length > 0) {
          const goals: LevelGoal[] = tabsResult.data.map((g) => ({
            id: g.id,
            name: g.name
          }));
          setL1Order(goals);
          setL1(goals[0]);
        }
      } catch (err) {
        console.error(err);
        setServerUp(false);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user?.email]);

  if (loading) return <LoadingSpinner />;
  if (serverUp === false) return <ServiceDown />;
  if (tabs.length > 0)
    return (
      <MultiLevelMenu
        tabs={tabs}
        l1Order={l1Order}
        l1={l1}
        handleSetL1Order={setL1Order}
        handleSetL1={setL1}
      />
    );
  return <NoGoalSetUp />;
};

export default MonitoringPage;
