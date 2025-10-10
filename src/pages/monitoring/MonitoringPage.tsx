import axios from "axios";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { lazy, useContext, useEffect, useState } from "react";
import LoadingSpinner from "../../common/LoadingSpinner";
import { AuthContext } from "../../context/AuthContext";
import type { LevelGoal } from "../../styles/types";
import type { TabsDTO } from "../../utils/TabsDTO";

const MultiLevelMenu = lazy(() => import("../../components/MultiLevelMenu"));
const NoGoalSetUp = lazy(() => import("../../components/business/NoGoalSetUp"));

const MonitoringPage = () => {
  const [tabs, setTabs] = useState<TabsDTO>([]);
  const [l1Order, setL1Order] = useState<LevelGoal[]>([]);
  const [l1, setL1] = useState<LevelGoal | undefined>();
  const [loadingTabs, setLoadingTabs] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  const { authState } = useContext(AuthContext);
  const user = authState.user;

  useEffect(() => {
    async function fetchTabs() {
      try {
        const userId = user?.email;
        if (!userId) return;

        const result = await axios.get<TabsDTO>(
          `http://localhost:9090/api/tabs/${userId}`
        );

        setTabs(result.data);

        if (result.data.length > 0) {
          const goals: LevelGoal[] = result.data.map((g) => ({
            id: g.id,
            name: g.name
          }));
          setL1Order(goals);
          setL1(goals[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingTabs(false);
      }
    }

    fetchTabs();
  }, [user?.email]);

  useEffect(() => {
    axios
      .get("http://localhost:9090/api/gateway/ping")
      .then((result) => {
        if (result.data === 200) {
          setMessage("");
        } else {
          setMessage("Server down.");
        }
      })
      .catch(() => {
        setMessage("Server down.");
      });
  }, []);

  return (
    <>
      {loadingTabs ? (
        <LoadingSpinner />
      ) : tabs.length > 0 ? (
        <MultiLevelMenu
          tabs={tabs}
          l1Order={l1Order}
          l1={l1}
          handleSetL1Order={setL1Order}
          handleSetL1={setL1}
        />
      ) : message ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <AlertTriangle className="w-12 h-12 text-red-500 mb-4 animate-pulse drop-shadow-sm" />

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Oops! Something went wrong.
          </h2>

          <p className="text-gray-600 max-w-md leading-relaxed">
            We couldn’t connect to the server right now. Please check your
            connection or try again in a moment.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl shadow-sm hover:bg-gray-800 transition-all duration-200"
          >
            <RefreshCcw className="w-4 h-4" />
            Retry
          </button>
        </div>
      ) : (
        <NoGoalSetUp />
      )}
    </>
  );
};

export default MonitoringPage;
