export type Period = "week" | "weekend";

export interface Member {
  id: string;
  name: string;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  period: Period;
  is_completed: boolean;
  created_at: string;
  assigneeIds?: string[];
}

export interface TaskWithAssignees extends Task {
  assignees: Member[];
}
