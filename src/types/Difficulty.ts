export interface IDifficultySetting {
  mediumDisabled: boolean;
  hardDisabled: boolean;
}

export const defaultDifficultySetting = {
  mediumDisabled: true,
  hardDisabled: true,
};

export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
  Impossible = "Impossible",
}
