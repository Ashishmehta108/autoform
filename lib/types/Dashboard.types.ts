import { Persona } from "./persona.types";

export interface DashboardStore {
  selectedPersona: Persona | null;
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  formsFilledThisMonth: number;
  successRate: number;
  setSelectedPersona: (persona: Persona | null) => void;
  setCreateModalOpen: (open: boolean) => void;
  setEditModalOpen: (open: boolean) => void;
  incrementFormsFilled: () => void;
}
