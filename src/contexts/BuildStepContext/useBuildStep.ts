import { useContext } from "react";
import { BuildStepContext } from "./BuildStepContext";

export const useBuildStep = () => useContext(BuildStepContext)