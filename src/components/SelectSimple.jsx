import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { FormHelperText } from "@mui/material";

import { styled } from "@mui/material/styles";

export default function SelectCustom({
  children,
  label = "Opciones",
  id = "select",
  onChange,
  value,
  helperText,
  error,
}) {
  const [selectedObject, setSelectedObject] = React.useState(value);

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedObject(event.target.value);
    onChange(event);
  };

  return (
    <div>
      <FormControl variant="standard" fullWidth error={error}>
        <InputLabel id={id.concat("-label")}>{label}</InputLabel>
        <Select
          labelId={id.concat("-label")}
          id={id}
          name={id}
          value={selectedObject}
          onChange={handleChange}
          label={label}
          sx={{
            ".MuiSelect-select": {
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          {children.map((option, index) => (
            <MenuItem
              key={index}
              value={option.props.value}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "1",
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
}
