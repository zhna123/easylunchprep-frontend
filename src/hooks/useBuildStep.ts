import { useContext } from "react";
import { BuildStepContext } from "../Context";

export const useBuildStep = () => useContext(BuildStepContext)