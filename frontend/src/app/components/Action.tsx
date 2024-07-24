"use client";

import React from "react";

interface ActionProps {
  handleClick: () => void;
  type: string;
  className?: string; // className is optional
}

const Action: React.FC<ActionProps> = ({ handleClick, type, className }) => {
  return (
    <section className={className} onClick={handleClick}>
      {type}
    </section>
  );
};

export default Action;
