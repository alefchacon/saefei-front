import { useRef } from "react";
export default function usePageControl() {
  const pageRef = useRef(null);

  const scrollToTop = () => {
    pageRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return { pageRef, scrollToTop };
}
