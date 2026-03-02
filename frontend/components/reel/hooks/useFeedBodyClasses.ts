"use client";

import { useEffect } from "react";

const FEED_BODY_CLASSES = ["!overflow-hidden", "!bg-black", "!pb-0"] as const;

export function useFeedBodyClasses() {
  useEffect(() => {
    const bodyClassList = document.body.classList;
    FEED_BODY_CLASSES.forEach((className) => {
      bodyClassList.add(className);
    });

    return () => {
      FEED_BODY_CLASSES.forEach((className) => {
        bodyClassList.remove(className);
      });
    };
  }, []);
}
