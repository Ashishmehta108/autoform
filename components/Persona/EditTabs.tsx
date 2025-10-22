"use client";
import { motion } from "framer-motion";

export default function EditTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const tabs = [
    { key: "general", label: "General" },
    { key: "addresses", label: "Addresses" },
  ];

  return (
    <div className="relative flex space-x-2 border-b border-neutral-300 dark:border-neutral-700 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`relative px-4 py-2 transition-colors duration-200
            ${
              activeTab === tab.key
                ? "text-blue-600 font-semibold"
                : "text-neutral-500 dark:text-neutral-400 hover:text-blue-500"
            }
          `}
        >
          {tab.label}
          {activeTab === tab.key && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 bottom-0 h-[2px] w-full bg-blue-500"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
