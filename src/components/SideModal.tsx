import React from "react";

interface Props {
  isActive: boolean;
  toggle: () => any;
  children?: React.ReactNode;
}

function SideModal(props: Props) {
  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        props.toggle();
      }}
      className={`side-modal-container ${props.isActive ? "active" : ""}`}
    >
      <div onClick={(e: any) => e.stopPropagation()} className="side-modal">
        {props.children}
      </div>
    </div>
  );
}

export default SideModal;
