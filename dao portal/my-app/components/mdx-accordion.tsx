"use client";

import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-4 rounded-lg border border-gray-200 bg-white overflow-hidden sm:my-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-medium text-gray-900 transition-all hover:bg-gray-50 sm:px-4 sm:py-3 sm:text-base"
      >
        <span className="break-words pr-2">{title}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-3 pb-3 pt-2 border-t border-gray-200 sm:px-4 sm:pb-4">
          {children}
        </div>
      )}
    </div>
  );
}

