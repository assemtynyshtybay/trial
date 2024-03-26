import React, { useEffect, useRef, useState } from "react";

export function useOutClick() {
  const [isOpen, setIsOpen] = useState(false);
  const openRef = useRef(null);
  useEffect(() => {
    function handleOutsideClick(e) {
      if (openRef?.current && !openRef?.current?.contains(e?.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openRef]);
  return { isOpen, setIsOpen, openRef };
}
