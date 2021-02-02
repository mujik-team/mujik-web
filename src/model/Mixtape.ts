export interface Mixtape {
  id: string;
  title: string;
  createdBy: string;
  lastUpdated: Date;
  description: string;
  isPrivate: boolean;

  songs: string[];
}
