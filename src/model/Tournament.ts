export interface Tournament {
  id: string;
  title: string;
  createdBy: string;
  description: string;

  winnerBy: string;
  rewards: Map<string, Reward>;
  NumWinners: number;

  VoteDate: Date;
  SubmissionDate: Date;

  Restrictions: Map<string, Restriction>;
  Voters: Map<string, boolean>;
  Submissions: Map<string, Submission>;
}

enum RewardType {
  Coin = "coin",
  Xp = "xp",
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
