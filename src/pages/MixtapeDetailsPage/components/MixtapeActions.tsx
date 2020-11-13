import React, { useContext, useState } from "react";
import Button from "../../../components/Button";
import { Menu } from "primereact/menu";
import styled from "styled-components";
import { AuthContext, SpotifyContext } from "../../../App";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import * as mixtapeService from "../../../services/mixtapeService";

const copyToClipboard = (str: string) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

function MixtapeActions(props: Props) {
  const [menu, setMenu] = useState(null as any);
  const spotifyContext = useContext(SpotifyContext);
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const playMixtape = () => {
    if (spotifyContext.isAuthorized && props.mixtape.songs) {
      const uris = props.mixtape.songs.map((m: string) => "spotify:track:" + m);
      spotifyContext.actions.playSong(uris);
    }
  };

  const shareMixtape = () => {
    copyToClipboard(window.location.href);
    toast.dark("🎶 Copied link to mixtape!");
  };

  const deleteMixtape = async () => {
    await mixtapeService.deleteMixtape(props.mixtape._id);
    await authContext.update();
    history.push("/library");
  };

  const items = [
    {
      label: "Share Mixtape",
      icon: "mdi mdi-export-variant",
      command: () => shareMixtape(),
    },
  ];

  const ownedByUser =
    authContext.currentUser.username === props.mixtape.createdBy;

  if (ownedByUser) {
    items.push(
      {
        label: "Edit",
        icon: "mdi mdi-pencil",
        command: () => props.showEditMixtapeModal(),
      },
      {
        label: "Delete Mixtape",
        icon: "mdi mdi-delete",
        command: () => deleteMixtape(),
      }
    );
  }

  return (
    <div>
      <ActionButton onClick={() => playMixtape()}>Play</ActionButton>
      {ownedByUser && (
        <ActionButton
          className="icon-button"
          onClick={() => props.showAddSongModal()}
        >
          <i className="mdi mdi-plus" />
        </ActionButton>
      )}

      <ActionButton className="icon-button" onClick={(e) => menu.toggle(e)}>
        <i className="mdi mdi-menu" />
      </ActionButton>
      <PopupMenu popup ref={(el) => setMenu(el)} model={items} />
    </div>
  );
}

export default MixtapeActions;

type Props = {
  showEditMixtapeModal: () => any;
  showAddSongModal: () => any;
  mixtape: any;
};

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
