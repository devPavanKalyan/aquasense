{
  /*
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import MenuLevelTabs from "../../hooks/MultiLevelTabs";
import DeviceDetailsPanel from "./DeviceDetailsPanel";
import PhSensorGraph from "./PHSensorGraph";

type MenuNode = {
  label: string;
  status?: string;
  children?: Record<string, MenuNode>;
};

type GoalTypes = {
  id: string;
  name: string;
};

export default function MultiLevelMenu() {
  const [menu, setMenu] = useState<Record<string, MenuNode>>({});
  const [l1Order, setL1Order] = useState<string[]>([]);
  const [l1, setL1] = useState<string>("");
  const [l2Order, setL2Order] = useState<string[]>([]);
  const [l2, setL2] = useState<string>("");
  const [l3Order, setL3Order] = useState<string[]>([]);
  const [l3, setL3] = useState<string>("");
  const [activeTab, setActiveTab] = useState("Device Details");
  const [loading, setLoading] = useState<boolean>(true);
  const [goalTypes, setGoalTypes] = useState<GoalTypes[]>([]);

  const dragRef = useRef<{ lvl: number; key: string } | null>(null);
  const { authState } = useContext(AuthContext);
  const user = authState.user;

  function formatGoalType(goalType: string): string {
    return goalType
      .toLowerCase()
      .split("_")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }
  //   const [businessGoals, setBusinessGoals] = useState<string[]>([]);

  useEffect(() => {
    const businessGoals = goalTypes.map((type) => type.name);
    console.log("businessGoals", businessGoals);
  }, [goalTypes]);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const userId = user?.email;
        if (!userId) return;

        // 1. Goal types
        const goalTypesResponse = await axios.get<GoalTypes[]>(
          `http://localhost:9095/api/tabs/goals/${userId}`
        );
        const types = goalTypesResponse.data;
        setGoalTypes(types);
        console.log("Types", types);

        // 2. Allocated sensors
        const sensorsResponse = await axios.post<
          Record<
            string,
            { location: string; sensorName: string; status: string }[]
          >
        >(`http://localhost:9095/api/tabs`, types);
        const sensorsData = sensorsResponse.data;

        console.log("sensorsData", sensorsData);

        // 3. Build Menu
        const builtMenu: Record<string, MenuNode> = {};
        let goalCounter = 1;
        for (const { name } of types) {
          // use 'types' directly here
          const formattedGoalType = formatGoalType(name);
          const sensors = sensorsData[name] || [];

          const locationMap = new Map<string, MenuNode>();

          for (const sensor of sensors) {
            if (!locationMap.has(sensor.location)) {
              locationMap.set(sensor.location, {
                label: sensor.location,
                children: {}
              });
            }
            const locationNode = locationMap.get(sensor.location)!;
            const sensorChildrenCount =
              Object.keys(locationNode.children || {}).length + 1;
            locationNode.children![String(sensorChildrenCount)] = {
              label: sensor.sensorName,
              status: sensor.status
            };
          }

          const locationChildren: Record<string, MenuNode> = {};
          let locationCounter = 1;
          for (const locationNode of locationMap.values()) {
            locationChildren[String(locationCounter++)] = locationNode;
          }

          builtMenu[String(goalCounter++)] = {
            label: formattedGoalType,
            children: locationChildren
          };
        }

        setMenu(builtMenu);

        // Initialize selection
        const l1Keys = Object.keys(builtMenu);
        setL1Order(l1Keys);
        setL1(l1Keys[0] || "");
        setLoading(false);
      } catch (error) {
        // console.error("Failed to fetch menu:", error);
        setLoading(false);
      }
    }

    fetchMenu();
  }, [user?.email]);

  useEffect(() => {
    const lvl2 = menu[l1]?.children ? Object.keys(menu[l1].children!) : [];
    setL2Order(lvl2);
    setL2(lvl2[0] || "");
  }, [l1, menu]);

  useEffect(() => {
    const lvl3 = menu[l1]?.children?.[l2]?.children
      ? Object.keys(menu[l1].children![l2].children!)
      : [];
    setL3Order(lvl3);
    setL3(lvl3[0] || "");
  }, [l1, l2, menu]);

  const level2Map = menu[l1]?.children || {};
  const level3Map = level2Map[l2]?.children || {};

  function onDragStart(lvl: number, key: string) {
    dragRef.current = { lvl, key };
  }

  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  function onDrop(lvl: number, target: string) {
    if (!dragRef.current || dragRef.current.lvl !== lvl) return;
    const fromKey = dragRef.current.key;
    const order =
      lvl === 1 ? [...l1Order] : lvl === 2 ? [...l2Order] : [...l3Order];
    const fromIdx = order.indexOf(fromKey);
    const toIdx = order.indexOf(target);
    order.splice(fromIdx, 1);
    order.splice(toIdx, 0, fromKey);
    if (lvl === 1) setL1Order(order);
    else if (lvl === 2) setL2Order(order);
    else setL3Order(order);
  }

  const safeL2Order = l2Order.filter((key) => level2Map[key]);
  const safeL3Order = l3Order.filter((key) => level3Map[key]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-blue-600 font-medium text-lg">
        Loading device data...
      </div>
    );
  }

  console.log("menu", menu);

  return (
    <div className="flex flex-col h-full px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6 text-sm md:text-base">
      {Object.keys(menu).length > 0 ? (
        <>
          <div className="border-b border-gray-300 pb-2 md:pb-3">
            <MenuLevelTabs
              order={l1Order}
              selected={l1}
              onSelect={setL1}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              level={1}
              labelMap={menu}
            />
          </div>

          {safeL2Order.length > 0 && (
            <div className="border-b border-gray-200 pb-2 md:pb-3 pl-4 md:pl-6">
              <MenuLevelTabs
                order={safeL2Order}
                selected={l2}
                onSelect={setL2}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                level={2}
                labelMap={level2Map}
              />
            </div>
          )}

          {safeL3Order.length > 0 && (
            <div className="flex flex-wrap items-center space-x-2 md:space-x-4 pl-6 md:pl-12">
              <MenuLevelTabs
                order={safeL3Order}
                selected={l3}
                onSelect={setL3}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                level={3}
                labelMap={level3Map}
              />
            </div>
          )}

          {l3 && (
            <div className="flex flex-col xl:flex-row flex-1 space-y-6 xl:space-y-0 xl:space-x-8">
              <PhSensorGraph />
              <DeviceDetailsPanel
                l1={l1}
                l2={l2}
                l3={l3}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                level2Label={level2Map[l2]?.label || ""}
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center px-4 md:px-6 py-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Start connecting your devices and monitor here.
          </h1>
          <p className="text-xl text-gray-600">
            Add your IoT sensors, view real-time data, and manage everything
            from one place.
          </p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
            Connect Device
          </button>
        </div>
      )}
    </div>
  );
}

import React from "react";
import ScrollableTabs from "./ScrollableTabs";

interface MenuLevelTabsProps {
  order: string[];
  selected: string;
  onSelect: (key: string) => void;
  onDragStart: (lvl: number, key: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (lvl: number, target: string) => void;
  level: number;
  labelMap: Record<string, { label: string; status?: string; children?: any }>;
}

const MenuLevelTabs: React.FC<MenuLevelTabsProps> = ({
  order,
  selected,
  onSelect,
  onDragStart,
  onDragOver,
  onDrop,
  level,
  labelMap
}) => {
  return (
    <ScrollableTabs>
      {order.map((key) => (
        <div
          key={key}
          draggable
          onDragStart={() => onDragStart(level, key)}
          onDragOver={onDragOver}
          onDrop={() => onDrop(level, key)}
        >
          <button
            className={`px-3 py-1.5 font-medium rounded-md shadow-sm transition duration-200 ${
              selected === key
                ? level === 1
                  ? "bg-blue-100 text-blue-700"
                  : level === 2
                  ? "bg-green-100 text-green-700"
                  : "bg-purple-100 text-purple-700"
                : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-700"
            }`}
            onClick={() => onSelect(key)}
          >
            {labelMap[key]?.label}
          </button>
          {level === 3 && labelMap[key]?.status && (
            <span
              className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded-full ${
                labelMap[key].status === "Active"
                  ? "bg-green-100 text-green-800"
                  : labelMap[key].status === "Inactive"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {labelMap[key].status}
            </span>
          )}
        </div>
      ))}
    </ScrollableTabs>
  );
};

           
export default MenuLevelTabs; */
}
