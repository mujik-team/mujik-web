import React, { useState } from "react";
import Button from "../../../components/Button";
import { Menu } from "primereact/menu";
import styled from "styled-components";

function MixtapeActions(props: Props) {
  const [menu, setMenu] = useState(null as any);

  return (
    <div>
      <ActionButton>Play</ActionButton>
      <ActionButton className="icon-button" onClick={() => props.showModal()}>
        <i className="mdi mdi-plus" />
      </ActionButton>

      <ActionButton className="icon-button" onClick={(e) => menu.toggle(e)}>
        <i className="mdi mdi-menu" />
      </ActionButton>
      <PopupMenu popup ref={(el) => setMenu(el)} model={items} />
    </div>
  );
}

export default MixtapeActions;

type Props = {
  showModal: () => any;
};

const items = [
  {
    label: "Edit",
    icon: "mdi mdi-pencil",
  },
  {
    label: "Follow",
    icon: "mdi mdi-heart",
  },
  {
    label: "Delete Mixtape",
    icon: "mdi mdi-delete",
  },
];

const PopupMenu = styled(Menu)`
  border: none !important;
  box-shadow: none !important;
  background-color: var(--card-color) !important;

  &.p-menu {
    padding: 0 0 !important;
  }
`;

const ActionButton = styled(Button)`
  font-weight: 500;
  font-size: 20px;
  margin-right: 10px;

  &.icon-button {
    text-align: center;
    border-radius: 25px;
  }
`;
