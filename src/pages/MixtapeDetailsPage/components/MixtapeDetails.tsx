import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AvatarImage from "../../../components/AvatarImage";
import SideModal from "../../../components/SideModal";
import AddSongModal from "./AddSongModal";
import EditMixtapeModal from "./EditMixtapeModal";
import MixtapeActions from "./MixtapeActions";

function MixtapeDetails(props: Props) {
  const [showModal, setShowModal] = useState(false);
  const [modalToShow, setModalToShow] = useState(0);
  const history = useHistory();
  const mixtape = props.mixtape;

  const toggleAddSongsModal = () => {
    setModalToShow(0);
    toggleModal();
  };

  const toggleEditMixtapeModal = () => {
    setModalToShow(1);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const addNewSongs = (newSongs: any[]) => {
    newSongs.forEach((s) => mixtape.songs.push(s.id));
    props.updateMixtape(mixtape);
  };

  const modals = [
    <AddSongModal toggle={toggleAddSongsModal} addNewSongs={addNewSongs} />,
    <EditMixtapeModal
      mixtape={mixtape}
      toggleModal={toggleEditMixtapeModal}
      updateMixtape={props.updateMixtape}
    />,
  ];

  return props.isLoading ? (
    <span>Loading</span>
  ) : (
    <Container>
      <SideModal width={600} toggle={toggleModal} isActive={showModal}>
        {modals[modalToShow]}
      </SideModal>
      <Title>{mixtape.mixtapeName}</Title>
      <div style={{ height: "50px" }}>
        {/* <CreatedByAvatar /> */}
        <AvatarImage username={mixtape.createdBy} size={50} />
        <Username onClick={() => history.push(`/user/${mixtape.createdBy}`)}>
          {mixtape.createdBy}
        </Username>
        <Pill>{mixtape.songs.length} Songs</Pill>
        {/* <Pill>7hr 23min</Pill> */}
        <Pill>
          <span>{mixtape.followers}</span>Followers
        </Pill>
      </div>
      <Description>{mixtape.description}</Description>
      <MixtapeActions
        showEditMixtapeModal={toggleEditMixtapeModal}
        showAddSongModal={toggleAddSongsModal}
        mixtape={mixtape}
      />
      <TagsContainer>
        <div>
          <TagTitle>{props.mixtape.tags.length ? "Tags" : ""}</TagTitle>
          {props.mixtape.tags?.map((a: string) => (
            <Tag>{a}</Tag>
          ))}
        </div>
      </TagsContainer>
    </Container>
  );
}

type Props = {
  mixtape: any;
  isLoading: boolean;
  updateMixtape: (newMixtape: any) => void;
};

export default MixtapeDetails;

const Container = styled.div``;

const Title = styled.div`
  font-size: 3rem;
  font-weight: 500;
`;

const Username = styled.div`
  display: inline-block;
  margin: 0 10px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.7rem;
  color: var(--text-inactive);

  position: relative;
  bottom: 30%;
  &:hover {
    color: whitesmoke;
  }
`;

const Pill = styled.div`
  position: relative;
  bottom: 35%;
  user-select: none;

  display: inline-block;
  border-radius: 50px;
  background-color: var(--card-color);
  margin-left: 10px;
  padding: 5px 15px;

  & > span {
    color: var(--main-color);
    margin-right: 5px;
  }
`;

const Description = styled.div`
  font-family: "Inter";
  font-size: 1.2rem;
  color: var(--text-inactive);
  margin-top: 30px;
  max-width: 750px;
  margin-bottom: 20px;
`;

const TagsContainer = styled.div`
  margin-top: 15px;
  font-family: var(--font-secondary);
`;

const TagTitle = styled.div`
  color: var(--text-inactive);
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Tag = styled.div`
  cursor: pointer;
  display: inline-block;
  background-color: var(--card-color);
  border-radius: 4px;
  padding: 5px;
  margin-right: 10px;
`;
