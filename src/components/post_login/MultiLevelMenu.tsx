import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import MenuLevelTabs from "../../hooks/MultiLevelTabs";
import SensorLayout from "../../layouts/sensors/SensorLayout";
import type { TabsDTO } from "../../utils/TabsDTO";
import NoGoalSetUp from "../business/NoGoalSetUp";

type LevelGoal = {
  id: string;
  name: string;
};

type LevelActivity = {
  id: string;
  name: string;
  location: string;
};

type LevelSensor = {
  id: string;
  name: string;
  slug: string;
};

export default function MultiLevelMenu() {
  const [l1Order, setL1Order] = useState<LevelGoal[]>([]);
  const [l1, setL1] = useState<LevelGoal | undefined>();
  const [l2Order, setL2Order] = useState<LevelActivity[]>([]);
  const [l2, setL2] = useState<LevelActivity | undefined>();
  const [l3Order, setL3Order] = useState<LevelSensor[]>([]);
  const [l3, setL3] = useState<LevelSensor | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [tabs, setTabs] = useState<TabsDTO>([]);

  const dragRef = useRef<{ lvl: number; key: string } | null>(null);
  const { authState } = useContext(AuthContext);
  const user = authState.user;

  // Fetch tabs
  useEffect(() => {
    async function fetchTabs() {
      try {
        const userId = user?.email;
        if (!userId) return;

        const result = await axios.get<TabsDTO>(
          `http://localhost:9095/api/tabs/${userId}`
        );

        setTabs(result.data);

        // initialize level 1 (goals)
        if (result.data.length > 0) {
          const goals: LevelGoal[] = result.data.map((g) => ({
            id: g.id,
            name: g.name
          }));
          setL1Order(goals);
          setL1(goals[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    fetchTabs();
  }, [user?.email]);

  // When goal changes, load activities
  useEffect(() => {
    if (!l1) return;
    const goal = tabs.find((g) => g.id === l1.id);
    if (goal) {
      const acts: LevelActivity[] = goal.activities.map((a) => ({
        id: a.id,
        name: a.name,
        location: a.location || ""
      }));
      setL2Order(acts);
      setL2(acts[0]);
    }
  }, [l1, tabs]);

  // When activity changes, load sensors
  useEffect(() => {
    if (!l2 || !l1) return;
    const goal = tabs.find((g) => g.id === l1.id);
    const activity = goal?.activities.find((a) => a.id === l2.id);
    if (activity) {
      const sensors: LevelSensor[] = activity.sensors.map((s) => ({
        id: s.id,
        name: s.name,
        slug: s.slug
      }));
      setL3Order(sensors);
      setL3(sensors[0]);
    }
  }, [l2, l1, tabs]);

  // Drag & drop handlers
  function onDragStart(lvl: number, key: string) {
    dragRef.current = { lvl, key };
  }

  // Drag over
  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  // Drop handler
  function onDrop(lvl: number, target: string) {
    if (!dragRef.current || dragRef.current.lvl !== lvl) return;
    const fromKey = dragRef.current.key;

    // Decide which order array we are modifying
    const order =
      lvl === 1 ? [...l1Order] : lvl === 2 ? [...l2Order] : [...l3Order];
    const fromIdx = order.findIndex((o) => ("id" in o ? o.id : o) === fromKey);
    const toIdx = order.findIndex((o) => ("id" in o ? o.id : o) === target);

    if (fromIdx === -1 || toIdx === -1) return;

    // Reorder
    const [moved] = order.splice(fromIdx, 1);
    order.splice(toIdx, 0, moved);

    // Update state
    if (lvl === 1) setL1Order(order as LevelGoal[]);
    else if (lvl === 2) setL2Order(order as LevelActivity[]);
    else setL3Order(order as LevelSensor[]);
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full pt-4 space-y-[1px] text-sm md:text-base bg-white">
      {l1Order.length > 0 ? (
        <>
          {/* Level 1 Tabs */}
          <MenuLevelTabs
            order={l1Order}
            selected={l1}
            onSelect={setL1}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            level={1}
          />

          {/* Level 2 Tabs */}
          {l2Order.length > 0 && (
            <div className=" pl-4 md:pl-6">
              <MenuLevelTabs
                order={l2Order}
                selected={l2}
                onSelect={setL2}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                level={2}
              />
            </div>
          )}

          {/* Level 3 Tabs */}
          {l3Order.length > 0 && (
            <div className=" space-x-2 md:space-x-4 pl-6 md:pl-12">
              <MenuLevelTabs
                order={l3Order}
                selected={l3}
                onSelect={setL3}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                level={3}
              />
            </div>
          )}

          {/* Charts and Device Details */}
          {l3 && (
            <div className="flex flex-col xl:flex-row flex-1 p-3 space-y-6 xl:space-y-0 xl:space-x-8">
              <SensorLayout selected={l3} level={3} />
            </div>
          )}
        </>
      ) : (
        <NoGoalSetUp />
      )}
    </div>
  );
}
