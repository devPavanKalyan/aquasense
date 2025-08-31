export interface OneGoFullSetupDTO {
  goal: GoalDTO;
  activities: ActivityDTO[];
}

export interface GoalDTO {
  userId: string;
  name: string;
}

export interface ActivityDTO {
  name: string;
  location: string;
  strategy: string;
  sensors: SensorDTO[];
  types: string[];
}

export interface SensorDTO {
  id: string;
  name: string;
}

export type Type = "goal" | "activity" | "sensor" | "";

export interface Option {
  value: string;
  label: string;
}
