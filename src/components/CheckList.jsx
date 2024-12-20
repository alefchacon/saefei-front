import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

export default function CheckList({
  children,
  name,
  onChange,
  values = [],
  label,
  selectAll = false,
  min,
  max,
  error,
  required,
  helperText,
}) {
  const [checked, setChecked] = useState(values);
  const [selectedAll, setSelectedAll] = useState(false);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    const isAdding = currentIndex === -1;

    if (checked.length === max && isAdding) {
      return;
    }
    if (isAdding) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    console.log(newChecked);
    setChecked(newChecked);
    return onChange(newChecked);
  };

  const handleSelectAll = () => {
    if (selectedAll) {
      setChecked([]);
      onChange([]);
    } else {
      const all = children?.map((child) => child.props.value);
      setChecked(all);
      onChange(all);
    }
    setSelectedAll(!selectedAll);
  };

  return (
    <FormControl error={error} className="checklist">
      <List
        sx={{
          width: "100%",
        }}
      >
        <FormLabel error={error} required={required}>
          {label}
        </FormLabel>

        {selectAll && (
          <ListItem sx={{ padding: 0 }} disablePadding divider>
            <ListItemButton onClick={handleSelectAll} role={undefined} dense>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                indeterminate={
                  checked.length > 0 && checked.length < children.length
                }
                checked={checked.length === children.length}
              />
              <b>Seleccionar todas</b>
            </ListItemButton>
          </ListItem>
        )}

        {children?.map((child, index) => {
          const labelId = `checkbox-list-label-${child.props.value}`;

          return (
            <ListItem key={index} disablePadding divider>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(child.props.value)}
                dense
              >
                <Checkbox
                  sx={{ paddingLeft: selectAll ? 5 : 0 }}
                  edge="start"
                  checked={checked.includes(child.props.value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
                {child}
              </ListItemButton>
            </ListItem>
          );
        })}
        <FormHelperText color="red" variant="error">
          {helperText}
        </FormHelperText>
      </List>
    </FormControl>
  );
}
