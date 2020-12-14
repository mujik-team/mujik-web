import React, { useState, useContext, useEffect, useMemo } from "react";
import styled from "styled-components";
import TextInput from "../../../../components/Input/TextInput";
import styles from "./EnterTournamentModal.module.css";
import { AuthContext } from "../../../../App";
import * as mixtapeService from "../../../../services/mixtapeService";
import Button from "../../../../components/Button";
import { Checkbox } from "primereact/checkbox";
import { SpotifyContext } from "../../../../App";
import { toast } from "react-toastify";

function EnterTournamentModal(props: Props) {
  const authContext = useContext(AuthContext);
  const [mixtapes, setMixtapes] = useState([] as any[]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mixtapesSelected, setMixtapesSelected] = useState([] as any[]);
  const [showAddedMixtapes, setShowAddedMixtapes] = useState(false);
  const [readTermsAndC, setReadTermsAndC] = useState(false);
  const [mixtapeToSubmit, setMixtapeToSubmit] = useState(null as any);
  const { spotifyService } = useContext(SpotifyContext);
  let restrictionsMet = [] as any;

  const checkMixtapeRestrictions = (type: string, value: any): any => {
    switch (type) {
      case "song_limit": {
        const fulfilled = mixtapeToSubmit
          ? mixtapeToSubmit.songs.length < value
          : 999 < value;
        const name = "Number of Songs";
        const RestrictionObject = {
          fulfilled: fulfilled,
          name: name,
        };
        restrictionsMet.push(fulfilled);
        // setSongLimitRestriction(songLimitRestriction)
        return RestrictionObject;
      }
      case "min_lvl": {
        const fulfilled = authContext.currentUser.profile.level >= value;
        const name = "Minumum Level Requirement";
        const RestrictionObject = {
          fulfilled: fulfilled,
          name: name,
        };
        restrictionsMet.push(fulfilled);
        // setLvlRestriction(fulfilled)
        return RestrictionObject;
      }
      case "min_time": {
        restrictionsMet.push(true);
        return { fulfilled: true, name: "Minimum Mixtape Duration" };
      }
      case "time_limit": {
        // const fulfilled =
        const name = "Max Time Limit";
        const RestrictionObject = {
          name,
          fulfilled: true,
        };
        return RestrictionObject;
      }

      case "allow_duplicates": {
        const songSet = new Set<string>();
        const name = "No Duplicates";
        const fulfilled: boolean = mixtapeToSubmit
          ? mixtapeToSubmit.songs.every((m: string) => {
              if (songSet.has(m)) return false;

              songSet.add(m);
              return true;
            })
          : false;

        const RestrictionObject = {
          fulfilled,
          name,
        };

        restrictionsMet.push(fulfilled);
        return RestrictionObject;
      }
    }
  };

  const RestrictionChecklist = props.tournament.Restrictions.map(
    (r: any, i: any) => (
      <div
        key={i}
        style={{
          display: "inline-block",
          marginTop: "20px",
          marginLeft: "20px",
        }}
      >
        <Checkbox
          inputId={r.type}
          checked={
            checkMixtapeRestrictions(r.Type, r.Value)
              ? checkMixtapeRestrictions(r.Type, r.Value).fulfilled
              : false // checkMixtapeRestrictions(mixtapesSelected,r.type, r.value)
          }
        />
        <span style={{ marginLeft: "20px" }}>
          {checkMixtapeRestrictions(r.Type, r.Value)
            ? checkMixtapeRestrictions(r.Type, r.Value).name
            : false}
        </span>
      </div>
    )
  );

  const submitMixtapeToTournament = async () => {
    if (restrictionsMet.includes(false)) {
      toast.error("🤔 Mixtape doesn't meet restrictions.");
      return;
    }

    if (!readTermsAndC) {
      toast.dark("Please read tournament rules.");
      return;
    }

    if (!mixtapeToSubmit) return;

    props.submit(mixtapeToSubmit._id);
  };

  const addMixtapeToSelected = (mixtape: any) => {
    setMixtapesSelected([...mixtapesSelected, mixtape]);
    setShowAddedMixtapes(!showAddedMixtapes);
    setMixtapeToSubmit(mixtape);
  };

  const toggleAddedMixtapes = () => {
    setShowAddedMixtapes(!showAddedMixtapes);
    setMixtapesSelected([]);
    setMixtapeToSubmit(null);
    setReadTermsAndC(false);
  };

  const removeMixtapeFromSelect = (song: any, i: number) => {
    const newSelected = mixtapesSelected.filter((s, index) => index !== i);

    if (newSelected.length === 0) setShowAddedMixtapes(false);

    setMixtapesSelected(newSelected);
  };

  const mixtapesSelectedList = mixtapesSelected.map((s, i) => (
    <SearchResultItem key={i} onClick={() => removeMixtapeFromSelect(s, i)}>
      {<span className="name">{s.mixtapeName}</span>}
      {<span className="artist">{s.createdBy}</span>}
    </SearchResultItem>
  ));

  const results =
    showAddedMixtapes && mixtapesSelected.length > 0
      ? mixtapesSelectedList
      : "";

  const getUserMixtapes = async () => {
    console.log(authContext.currentUser);
    const userMixtapes = await mixtapeService.getSeveralMixtapes(
      authContext.currentUser.profile.mixtapes
    );

    setMixtapes([...userMixtapes]);
  };

  useEffect(() => {
    if (
      authContext.isLoggedIn &&
      authContext.currentUser.profile.mixtapes.length !== 0
    ) {
      getUserMixtapes();
    }
  }, [authContext.isLoggedIn, authContext.currentUser]);

  const filteredMixtapeResults = useMemo(() => {
    return mixtapes.filter((m) =>
      m.mixtapeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [mixtapes, searchTerm]);

  return (
    <div>
      <div className={styles.mixtapeSearchContainer}>
        <div className="p-input-icon-left">
          <i
            style={{ fontSize: "20px", top: "45%" }}
            className="pi mdi mdi-magnify"
          ></i>
          <TextInput
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
          />
        </div>
        {mixtapesSelected.length > 0 && (
          <ConfirmSongsAddedButton onClick={() => toggleAddedMixtapes()}>
            {showAddedMixtapes ? "Back" : "Add Mixtape"}
          </ConfirmSongsAddedButton>
        )}

        {showAddedMixtapes ? (
          <Instructions>
            Make sure that selected mixtape meets all restrictions.
          </Instructions>
        ) : (
          <Instructions>Please select a mixtape to submit.</Instructions>
        )}
        {showAddedMixtapes
          ? ""
          : filteredMixtapeResults.map((m, i) => (
              <SearchResultItem key={i} onClick={() => addMixtapeToSelected(m)}>
                {<span className="name">{m.mixtapeName}</span>}
                {<span className="artist">{m.createdBy}</span>}
              </SearchResultItem>
            ))}
        {showAddedMixtapes && (
          <AddSongsToMixtapeButton onClick={() => console.log("Suk pepepe")}>
            Add To Mixtape
          </AddSongsToMixtapeButton>
        )}
        {results}
      </div>
      {!showAddedMixtapes ? (
        ""
      ) : (
        <div>
          {/* {showAddedMixtapes ? : ""} */}
          <Instructions style={{ marginLeft: "20px" }}>
            Restrictions Met:{" "}
          </Instructions>
          {mixtapeToSubmit !== null ? RestrictionChecklist : null}
          <Instructions style={{ marginTop: "20px", marginLeft: "20px" }}>
            Agree to Terms and Conditions:{" "}
          </Instructions>
          <div
            style={{
              display: "inline-block",
              marginTop: "20px",
              marginLeft: "20px",
            }}
          >
            <Checkbox
              inputId="TermsAndCond"
              checked={readTermsAndC}
              onChange={(e) => setReadTermsAndC(!readTermsAndC)}
            />
            <span style={{ marginLeft: "20px" }}>
              I have read the contest rules.
            </span>
          </div>
          <div
            style={{
              display: "inline-block",
              marginTop: "20px",
              marginLeft: "20px",
            }}
          ></div>
        </div>
      )}

      {showAddedMixtapes && (
        <div
          onClick={submitMixtapeToTournament}
          // onClick={props.submit}
          className={styles.submitButton}
        >
          Submit
        </div>
      )}
    </div>
  );
}

export default EnterTournamentModal;

const SearchResultItem = styled.div`
  font-family: "Inter";
  user-select: none;
  cursor: pointer;
  background-color: var(--card-color);
  border-radius: 6px;
  margin-top: 2px;
  padding: 15px 10px;
  margin: 10px 0;
  transition: 0.2s linear all;

  &:hover {
    box-shadow: inset 0px 0px 0px 2px var(--main-color);
  }

  & > span.name {
    display: inline-block;
    width: 200px;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 10px;
  }

  & > span.artist {
    float: right;
    color: var(--text-inactive);
  }
`;

const ConfirmSongsAddedButton = styled(Button)`
  font-weight: 500;
  font-size: 18px;
  display: inline-block;
`;

const AddSongsToMixtapeButton = styled.div`
  user-select: none;
  cursor: pointer;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  width: 100%;
  padding: 30px 0;
  background-color: var(--card-color);
  position: absolute;
  bottom: 0;
  transition: 0.2s ease-in all;

  &:hover {
    background-color: var(--main-color);
    color: black;
  }
`;

const Instructions = styled.div`
  margin-top: 20px;
  font-family: "Inter";
  color: var(--text-inactive);
  font-size: 16px;
`;
type Props = {
  submit: (id: string) => Promise<void>;
  tournament: any;
};
