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

  const { data } = await api.post("/tournament", tournamentDetails);

  return data.tournament;
}

export async function UploadTournamentImage(id: string, imageBlob: Blob) {
  const formData = new FormData();
  formData.append("tournament", imageBlob);
  await api.post(`/upload/tournament/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
