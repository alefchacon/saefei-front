import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import DirectionsIcon from "@mui/icons-material/Directions";
import Button from "@mui/material/Button";

export default function SearchField({ onSearch, onDeleteQuery }) {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      search();
    }
  };

  const search = () => {
    onSearch(query);
  };
  const handleChange = (e) => {
    const newQuery = e.target.value;
    if (newQuery === "") {
      onDeleteQuery();
    }
    setQuery(newQuery);
  };

  const deleteQuery = () => {
    setQuery("");
    onDeleteQuery();
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "var(--bg)",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Buscar eventos por título o por organizador"
        inputProps={{
          "aria-label": "buscar eventos",
          onKeyDown: handleKeyDown,
        }}
        onChange={handleChange}
        value={query}
      />
      {query.length > 0 && (
        <>
          <IconButton
            type="button"
            sx={{ p: "10px", color: "var(--blue)" }}
            aria-label="search"
            onClick={deleteQuery}
          >
            <CloseIcon />
          </IconButton>

          <Divider orientation="vertical"></Divider>
        </>
      )}
      <IconButton
        type="button"
        sx={{ p: "10px", color: "var(--blue)" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
