import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";

export default function CheckList({
  children,
  name,
  onChange,
  values = [],
  label,
  selectAll = false,
  min,
  max,
}) {
  const [checked, setChecked] = useState(values);
  const [selectedAll, setSelectedAll] = useState(false);

  const handleToggle = (value) => () => {
    console.log(value);

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

    setChecked(newChecked);
    return onChange(newChecked);
  };

  const handleSelectAll = () => {
    if (selectedAll) {
      setChecked([]);
    } else {
      setChecked(children.map((child) => child.props.value));
    }
    setSelectedAll(!selectedAll);
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      <FormLabel>{label}</FormLabel>

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

      {children.map((child, index) => {
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
    </List>
  );
}
