import type { ReactNode } from "react";
import { Edit } from "react-feather";

type InfoRowProps = {
  icon: ReactNode;
  value: string | undefined | null;
  fallback?: string;
  onEdit: () => void;
};

const InfoRow = ({
  icon,
  value,
  fallback = "Not Provided",
  onEdit
}: InfoRowProps) => {
  return (
    <p className="flex items-center justify-between gap-2 font-medium">
      <span className="flex items-center gap-2">
        {icon}
        {value || fallback}
      </span>
      <button
        onClick={onEdit}
        className="text-blue-600 hover:text-blue-700 text-xs font-semibold flex items-center gap-1"
        type="button"
      >
        <Edit size={14} /> Edit
      </button>
    </p>
  );
};

export default InfoRow;
