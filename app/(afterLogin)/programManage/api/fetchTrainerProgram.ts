import { sendRequest } from "@/app/api/rootApi";
import { ProgramDataServer } from "../components/ProgramForm";

export const fetchTrainerProgram = async () => {
  return await sendRequest<ProgramDataServer>("trainer/program/me", "get");
};
