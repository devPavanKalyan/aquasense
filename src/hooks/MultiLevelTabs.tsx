import { Plus } from "lucide-react";
import React, { useState } from "react";
import CreateGoalSetupModal from "../components/business/CreateGoalSetup";

interface TabItem {
  id: string;
  name: string;
}

interface MenuLevelTabsProps<T extends TabItem> {
  order: T[];
  selected?: T;
  onSelect: (item: T) => void;
  onDragStart: (lvl: number, key: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (lvl: number, target: string) => void;
  level: number;
}

function MenuLevelTabs<T extends TabItem>({
  order,
  selected,
  onSelect,
  onDragStart,
  onDragOver,
  onDrop,
  level
}: MenuLevelTabsProps<T>) {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  return (
    <>
      <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-200">
        {order.map((item) => {
          const isActive = selected?.id === item.id;
          return (
            <div
              key={item.id}
              className={`flex items-center cursor-pointer rounded-t-lg transition-colors duration-200 
              ${
                isActive
                  ? "bg-[#4a90e2] text-white"
                  : "bg-[#c0dffb] hover:bg-[#7bb8ff] text-gray-900"
              }`}
              onClick={() => onSelect(item)}
              draggable
              onDragStart={() => onDragStart(level, item.id)}
              onDragOver={onDragOver}
              onDrop={() => onDrop(level, item.id)}
            >
              <div className="flex items-center justify-between gap-2 p-1 px-2 rounded-md transition-colors w-full">
                <span className="text-sm font-semibold truncate text-[#002b40]">
                  {item.name}
                </span>
              </div>
            </div>
          );
        })}

        {/* Plus button at the end */}
        <button
          onClick={() => setShowCreateModal(true)}
          aria-label="Add new tab"
          className="flex items-center justify-center p-1 rounded-full bg-[#e2f0ff] hover:bg-[#b5d6ff] transition-colors duration-200"
        >
          <Plus size={20} stroke="#002b40" strokeWidth={2} />
        </button>
      </div>

      <CreateGoalSetupModal
        isOpen={showCreateModal}
        type={level === 1 ? "goal" : level === 2 ? "activity" : "sensor"}
        onClose={() => setShowCreateModal(false)}
      />
    </>
  );
}

export default MenuLevelTabs;
