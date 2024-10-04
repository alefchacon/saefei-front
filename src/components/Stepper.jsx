import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

export default function StepperCustom({ children, step = 0, onStepChange }) {
  const [activeStep, setActiveStep] = React.useState(step);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return children.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return step === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleStepChange = (newActiveStep = 0) => {
    setActiveStep(newActiveStep);
    onStepChange(newActiveStep);
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? children.findIndex((step, i) => !(i in completed))
        : step + 1;
    handleStepChange(newActiveStep);
  };

  const handleBack = () => {
    handleStepChange((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (stepIndex) => () => {
    handleStepChange(stepIndex);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [step]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={step}>
        {children.map((label, index) => (
          <Step key={label.props.title} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label.props.title}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        <React.Fragment>
          <Stack paddingTop={5} paddingBottom={5}>
            {children[step].props.children}
          </Stack>

          <Stack direction={"row"} justifyContent={"end"}>
            <Button
              color="inherit"
              disabled={step === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Regresar
            </Button>
            <Button onClick={handleNext} sx={{ mr: 1 }}>
              Siguiente
            </Button>
          </Stack>
        </React.Fragment>
      </div>
    </Box>
  );
}
