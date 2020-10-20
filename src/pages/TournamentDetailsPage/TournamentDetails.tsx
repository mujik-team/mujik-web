import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SideModal from "../../components/SideModal";
import EnterTournamentModal from "./EnterTournamentModal";
import s from "./TournamentDetails.module.css";

const details =
  "This one here is for all of our boomers out there! You are tasked with creating the most boomer friendly playlist possible. Think drinking Monster on the weekend while mowing your lawn, think summer barbecues, think riding down the highway in your Ford pickup with the windows down.";

function TournamentDetails() {
  const { tournamentId } = useParams() as any;

  const toggleModal = () => {
    setShowEntryModal(!showEntryModal);
  };

  const [showEntryModal, setShowEntryModal] = useState(false);

  return (
    <div>
      <SideModal isActive={showEntryModal} toggle={toggleModal}>
        <EnterTournamentModal />
      </SideModal>
      <div className={s.TournamentDetailsContainer}>
        <div className={s.tournamentImage}></div>
        <div className={s.tournamentInfo}>
          <div className={s.tournamentTitle}>Ultimate DnD Campaign</div>
          <div className={s.description}>{details}</div>
        </div>
      </div>

      <div className={s.tournamentSubmissionContainer}>
        <div className={s.tournamentSubmissionRestrictions}>
          <h1>Mixtape Restrictions</h1>
          <div className={s.restrictionCard}></div>
          <div className={s.restrictionCard}></div>
          <div className={s.restrictionCard}></div>
          <div className={s.restrictionCard}></div>
        </div>

        <div className={s.tournamentRules}>
          <h1>Rules</h1>
          <div className={s.rulesCard}></div>
        </div>

        <div className={s.submissionDetails}>
          <div className={s.tournamentSubmissionDate}>Ends Septemeber 28th</div>
          <div className={s.tournamentSubmissionTimeLeft}>12D 13H 45M 30S</div>
          <button
            onClick={() => toggleModal()}
            className={s.enterTournamentButton}
          >
            ENTER TOURNEY
          </button>
          <div>Unsure about something? Ask a question.</div>
        </div>
      </div>
    </div>
  );
}

export default TournamentDetails;
