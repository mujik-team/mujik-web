import { api } from "./api";

export async function CreateNewTournament(form: any) {
  const tournamentDetails = {
    Title: form.title,
    CreatedBy: form.createdBy,
    Description: form.description,
    WinnerBy: form.winnerBy,
    SubmissionDate: form.submissionDate,
    VoteDate: form.voteDate,
    NumWinners: 3,
    Rewards: [
      {
        Type: "coin",
        Value: form.coins,
      },
    ],
    Restrictions: [] as any[],
  };

  Object.keys(form.restrictions).forEach((Type) => {
    tournamentDetails.Restrictions.push({
      Type,
      Value: form.restrictions[Type],
    });
  });

  console.log(JSON.stringify(tournamentDetails));

  // TODO Make post request.
}

export async function GetAllActiveTournaments() {
  const { data } = await api.get("/tournament");

  const { tournaments } = data.payload;

  return tournaments;
}

export async function GetTournament(id: string) {
  const { data } = await api.get(`/tournament/${id}`);
  const { tournament } = data.payload;
  return tournament;
}
