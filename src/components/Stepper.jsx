import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Slide from "@mui/material/Slide";
import StepLabel from "@mui/material/StepLabel";
import { useFormikContext } from "formik";
import Alert from "@mui/material/Alert";
import { useNavigate, useLocation } from "react-router-dom";

export default function StepperCustom({
  children,
  currentStep = 0,
  onStepChange,
  endButton,
}) {
  const { validate, validateForm, dirty, validateField, errors } =
    useFormikContext();
  const [triedNextWithErrors, setTriedNextWithErrors] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    //navigate(`?paso=${currentStep}`, { replace: true });
  }, [currentStep, navigate]);

  /*
  React.useEffect(() => {
    const urlStep = parseInt(
      new URLSearchParams(location.search).get("paso") || currentStep,
      10
    );
    console.log(`${urlStep}, ${currentStep}`);

    if (urlStep !== currentStep) {
      onStepChange(urlStep);
    }
  }, [location.search]);*/

  const handleStepChange = async (newActiveStep = 0) => {
    let stepHasErrors = false;

    if (children[currentStep].props.fields) {
      stepHasErrors = Object.entries(errors).some(([key, value]) =>
        children[currentStep].props.fields.includes(key)
      );
    }

    /*
    if (stepHasErrors) {
      setTriedNextWithErrors(true);
    } else {
      setTriedNextWithErrors(false);
      setActiveStep(newActiveStep);
      onStepChange(newActiveStep);
      navigate(`?paso=${newActiveStep}`);
    }
      */
    onStepChange(newActiveStep);
  };

  const handleNext = () => {
    handleStepChange(currentStep + 1);
  };

  const handleBack = () => {
    handleStepChange(currentStep - 1);
  };

  const handleStepSelect = (stepIndex) => () => {
    handleStepChange(stepIndex);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={currentStep}>
        {children.map((child, index) => (
          <Step key={child.props.title}>
            {!child.props.optional && (
              <StepButton color="inherit" onClick={handleStepSelect(index)}>
                <StepLabel>{child.props.title}</StepLabel>
              </StepButton>
            )}
          </Step>
        ))}
      </Stepper>
      <div>
        <>
          <Stack paddingTop={5} paddingBottom={5}>
            {children[currentStep].props.children}

            {triedNextWithErrors && (
              <Alert severity="error">
                Por favor, llene los campos requeridos antes de continuar.
              </Alert>
            )}
          </Stack>

          <Stack direction={"row"} justifyContent={"end"}>
            <Button
              color="inherit"
              disabled={currentStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Regresar
            </Button>
            {currentStep === children.length - 1 ? (
              endButton
            ) : (
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Siguiente
              </Button>
            )}
          </Stack>
        </>
      </div>
    </Box>
  );
}
