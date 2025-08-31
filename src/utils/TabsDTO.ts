export type TabsDTO = GoalDTO[]; // array of goals, not object

export interface GoalDTO {
  id: string;
  name: string;
  activities: ActivityDTO[];
}

export interface ActivityDTO {
  id: string;
  name: string;
  location: string | null; // nullable in your response
  sensors: SensorDTO[];
}

export interface SensorDTO {
  id: string;
  name: string;
  slug: string;
}
