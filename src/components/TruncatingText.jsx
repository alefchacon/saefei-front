import useIsMobile from "./hooks/useIsMobile";
export default function TruncatingText({ children = "" }) {
  const isMobile = useIsMobile();
  if (isMobile) {
    const verbOnly = children.split(" ").at(0);
    console.log(children);
    return verbOnly;
  }
  return children;
}
