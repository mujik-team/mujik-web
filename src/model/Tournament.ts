export interface Tournament {
  id: string;
  title: string;
  createdBy: string;
  description: string;

  winnerBy: string;
  rewards: Map<RewardType, Reward>;
  numWinners: number;

  voteDate: Date;
  submissionDate: Date;

  restrictions: Restriction[];
  voters: Map<string, boolean>;
  submissions: Map<string, Submission>;
}

enum RewardType {
  coin = "coin",
  xp = "xp",
}

interface Reward {
  type: RewardType;
  value: number;
}

interface Restriction {
  type: string;
  value: number;
}

interface Submission {
  id: string;
  votes: number;
  rewardsClaimed: boolean;
}
