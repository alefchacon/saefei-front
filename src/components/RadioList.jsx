import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  ListItemButton,
  styled,
} from "@mui/material";

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.MuiListItemButton-root": {
    padding: 0,
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: 0,
  width: "100%",
  "& .MuiFormControlLabel-label": {
    flex: 1,
  },
}));

export default function RadioButtonsGroup({ children, label, id }) {
  return (
    <FormControl>
      <FormLabel id={id}>{label}</FormLabel>
      <RadioGroup aria-labelledby={id} name="radio-buttons-group">
        {children.map((child) => (
          <StyledListItemButton key={child.props.value} divider>
            <StyledFormControlLabel
              value={child.props.value}
              control={<Radio />}
              label={child}
            />
          </StyledListItemButton>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
