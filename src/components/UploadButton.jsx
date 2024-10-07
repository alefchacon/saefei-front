import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UploadButton({
  values = [],
  onChange,
  multiple = false,
}) {
  const [files, setFiles] = useState(values);
  const handleSetFiles = (event) => {
    const newFiles = event.target.files;
    setFiles(newFiles);
    onChange(newFiles);
  };
  return (
    <Stack>
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Subir archivos
        <VisuallyHiddenInput
          type="file"
          onChange={handleSetFiles}
          multiple={multiple}
        />
      </Button>
      <Typography variant="caption">
        {files.length} archivos cargados
      </Typography>
    </Stack>
  );
}
