import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionCustom({
  children,
  defaultExpanded = true,
  header = "header",
}) {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        {header}
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: "var(--bg)" }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}
