import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import StepLabel from "@mui/material/StepLabel";
import { useFormikContext } from "formik";
import Alert from "@mui/material/Alert";
import ButtonResponsive from "./ButtonResponsive";
import useIsMobile from "./hooks/useIsMobile";
import { usePage } from "./providers/PageProvider";

export default function StepperCustom({
  children,
  currentStep = 0,
  onStepChange,
  endButton,
}) {
  const { scrollToTop } = usePage();
  const isMobile = useIsMobile();
  const { validate, validateForm, dirty, validateField, errors } =
    useFormikContext();
  const [triedNextWithErrors, setTriedNextWithErrors] = React.useState(false);

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
    scrollToTop();
  };

  const handleBack = () => {
    handleStepChange(currentStep - 1);
    scrollToTop();
  };

  const handleStepSelect = (stepIndex) => () => {
    handleStepChange(stepIndex);
  };
  const mandatoryStepsNum = children.filter(
    (child) => !child.props.optional
  ).length;

  const handleReturnToMandatory = () => {
    handleStepChange(mandatoryStepsNum - 1);
  };

  const userIsInMandatoryStep = () => {
    return currentStep > -1 && currentStep < mandatoryStepsNum;
  };

  const mandatoryButtons = (
    <Stack direction={"row"} justifyContent={"end"}>
      <Button
        color="inherit"
        disabled={currentStep === 0}
        onClick={handleBack}
        sx={{ mr: 1 }}
      >
        Regresar
      </Button>
      {currentStep === mandatoryStepsNum - 1 ? (
        endButton
      ) : (
        <Button onClick={handleNext} sx={{ mr: 1 }}>
          Siguiente
        </Button>
      )}
    </Stack>
  );

  return (
    <Box sx={{ width: "100%" }}>
      {currentStep <= mandatoryStepsNum - 1 && (
        <Stepper nonLinear activeStep={currentStep}>
          {children.map((child, index) => {
            if (!child.props.optional) {
              return (
                <Step key={child.props.title}>
                  {!child.props.optional && (
                    <StepButton
                      color="inherit"
                      onClick={handleStepSelect(index)}
                    >
                      {!isMobile && <StepLabel>{child.props.title}</StepLabel>}
                    </StepButton>
                  )}
                </Step>
              );
            }
          })}
        </Stepper>
      )}
      <div>
        <Stack className={children[currentStep].props.className}>
          {children[currentStep].props.children}

          {triedNextWithErrors && (
            <Alert severity="error">
              Por favor, llene los campos requeridos antes de continuar.
            </Alert>
          )}
        </Stack>

        {userIsInMandatoryStep() ? (
          mandatoryButtons
        ) : (
          <Stack alignItems={"end"}>
            <ButtonResponsive fixed onClick={handleReturnToMandatory}>
              Guardar
            </ButtonResponsive>
          </Stack>
        )}
      </div>
    </Box>
  );
}
