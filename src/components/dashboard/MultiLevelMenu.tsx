import React, { useEffect, useRef, useState } from "react";
import MenuLevelTabs from "../../hooks/MultiLevelTabs";
import SensorLayout from "../../layouts/sensors/SensorLayout";
import type { LevelActivity, LevelGoal, LevelSensor } from "../../styles/types";
import type { TabsDTO } from "../../utils/TabsDTO";

type Props = {
  tabs: TabsDTO;
  l1Order: LevelGoal[];
  l1: LevelGoal | undefined;
  handleSetL1Order: (order: LevelGoal[]) => void;
  handleSetL1: (level: LevelGoal | undefined) => void;
};

const MultiLevelMenu: React.FC<Props> = ({
  tabs,
  l1Order,
  l1,
  handleSetL1Order,
  handleSetL1
}) => {
  const [l2Order, setL2Order] = useState<LevelActivity[]>([]);
  const [l2, setL2] = useState<LevelActivity | undefined>();
  const [l3Order, setL3Order] = useState<LevelSensor[]>([]);
  const [l3, setL3] = useState<LevelSensor | undefined>();

  const dragRef = useRef<{ lvl: number; key: string } | null>(null);

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

  function onDragStart(lvl: number, key: string) {
    dragRef.current = { lvl, key };
  }

  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  function onDrop(lvl: number, target: string) {
    if (!dragRef.current || dragRef.current.lvl !== lvl) return;
    const fromKey = dragRef.current.key;

    const order =
      lvl === 1 ? [...l1Order] : lvl === 2 ? [...l2Order] : [...l3Order];
    const fromIdx = order.findIndex((o) => ("id" in o ? o.id : o) === fromKey);
    const toIdx = order.findIndex((o) => ("id" in o ? o.id : o) === target);

    if (fromIdx === -1 || toIdx === -1) return;

    const [moved] = order.splice(fromIdx, 1);
    order.splice(toIdx, 0, moved);

    if (lvl === 1) handleSetL1Order(order as LevelGoal[]);
    else if (lvl === 2) setL2Order(order as LevelActivity[]);
    else setL3Order(order as LevelSensor[]);
  }

  return (
    <div className="flex flex-col h-full pt-4 space-y-[1px] text-sm md:text-base bg-white">
      <MenuLevelTabs
        order={l1Order}
        selected={l1}
        onSelect={handleSetL1}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        level={1}
      />

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

      {l3 && (
        <div className="flex flex-col xl:flex-row flex-1 p-3 space-y-6 xl:space-y-0 xl:space-x-8">
          <SensorLayout selected={l3} level={3} />
        </div>
      )}
    </div>
  );
};

export default MultiLevelMenu;
