import { TableRowProps } from "./types";
import { useMemo, useState } from "react";
import Table from "../Table";

export default function TableRow({ item, deleteItem }: TableRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = useMemo(() => !!item.children.length, [item.children]);

  const itemValues = useMemo(() => {
    return Object.entries(item).filter(([key]) => key !== "children");
  }, [item]);

  function toggleExpand() {
    if (!hasChildren) {
      return;
    }
    setIsExpanded((expanded) => !expanded);
  }

  return (
    <div className="my-2 rounded border border-gray-700 shadow-sm">
      <div
        className={`grid bg-gray-900 p-2 items-center ${
          hasChildren ? "cursor-pointer" : "cursor-default"
        }`}
        style={{
          gridTemplateColumns: `minmax(0, 30px) repeat(${itemValues.length}, minmax(0, 1fr)) minmax(0, 100px)`,
        }}
        onClick={toggleExpand}
      >
        <div className="text-center">
          {hasChildren ? (isExpanded ? "▼" : "▶") : ""}
        </div>

        {itemValues.map(([key, value]) => (
          <div key={key} className="font-bold text-center overflow-hidden px-2">
            {`${value}`}
          </div>
        ))}

        <div className="text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteItem([item.id]);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all duration-400"
          >
            Delete
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="ml-4">
          {/* For nested tables, pass showEmptyMessage as false */}
          <Table
            items={item.children}
            deleteItem={(path) => deleteItem([item.id, ...path])}
            showEmptyMessage={false}
          />
        </div>
      )}
    </div>
  );
}
