import Stack from "@mui/material/Stack";

import Skeleton from "@mui/material/Skeleton";

export default function EventFormSkeleton() {
  return (
    <Stack gap={"var(--field-gap)"} className="side-padding">
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} gap={1}>
          <Skeleton
            variant="circular"
            sx={{ height: "30px", width: "30px" }}
          ></Skeleton>
          <Skeleton
            variant="rounded"
            sx={{ height: "30px", width: "100px" }}
          ></Skeleton>
        </Stack>
        <Stack direction={"row"} gap={1}>
          <Skeleton
            variant="circular"
            sx={{ height: "30px", width: "30px" }}
          ></Skeleton>
          <Skeleton
            variant="rounded"
            sx={{ height: "30px", width: "100px" }}
          ></Skeleton>
        </Stack>
        <Stack direction={"row"} gap={1}>
          <Skeleton
            variant="circular"
            sx={{ height: "30px", width: "30px" }}
          ></Skeleton>
          <Skeleton
            variant="rounded"
            sx={{ height: "30px", width: "100px" }}
          ></Skeleton>
        </Stack>
        <Stack direction={"row"} gap={1}>
          <Skeleton
            variant="circular"
            sx={{ height: "30px", width: "30px" }}
          ></Skeleton>
          <Skeleton
            variant="rounded"
            sx={{ height: "30px", width: "100px" }}
          ></Skeleton>
        </Stack>
      </Stack>
      <Skeleton variant="rectangle" sx={{ height: "40px" }}></Skeleton>
      <Skeleton variant="rectangle" sx={{ height: "40px" }}></Skeleton>
      <Skeleton variant="rectangle" sx={{ height: "40px" }}></Skeleton>
      <Stack gap={1}>
        <Skeleton variant="rectangle" sx={{ height: "60px" }}></Skeleton>
        <Skeleton variant="rectangle" sx={{ height: "60px" }}></Skeleton>
      </Stack>
    </Stack>
  );
}
