import axios from "axios";
import { useEffect, useState } from "react";

type MenuNode = {
  label: string;
  status?: string;
  children?: Record<string, MenuNode>;
};

const YourComponent = () => {
  const [menu, setMenu] = useState<Record<string, MenuNode>>({});

  useEffect(() => {
    async function fetchMenu() {
      try {
        const userId = "suddalapavankalyan.sp@gmail.com";

        // 1. Fetch goal types
        const goalTypesResponse = await axios.get<string[]>(
          `http://localhost:8080/api/objectives.versewave.com/goals/type?userId=${userId}`
        );

        const goalTypes = goalTypesResponse.data; // ["FISH_FARMING", "AGRICULTURE", "INDUSTRIAL_WATER"]

        // 2. Fetch allocated sensors
        const sensorsResponse = await axios.post<
          Record<
            string,
            { location: string; sensorName: string; status: string }[]
          >
        >(
          `http://localhost:8080/api/objectives.versewave.com/allocated-sensors/ls?userId=${userId}`,
          goalTypes
        );

        const sensorsData = sensorsResponse.data;

        // 3. Construct the MENU
        const builtMenu: Record<string, MenuNode> = {};

        let goalCounter = 1;
        for (const goalType of goalTypes) {
          const formattedGoalType = formatGoalType(goalType);

          const sensors = sensorsData[goalType] || [];

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

        // 4. Set the MENU to state
        setMenu(builtMenu);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    }

    fetchMenu();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(menu, null, 2)}</pre>
    </div>
  );
};

function formatGoalType(goalType: string): string {
  return goalType
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export default YourComponent;
