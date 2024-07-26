"use client";

import { createContext, useState, useMemo, useCallback } from "react";

export const ButtonVisibleContext = createContext({
  visible: true,
  toggleVisible: () => {},
});

export const ButtonVisibleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(true);
  const toggleVisible = useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  const providerValue = useMemo(
    () => ({ visible, toggleVisible }),
    [visible, toggleVisible]
  );
  return (
    <ButtonVisibleContext.Provider value={providerValue}>
      {children}
    </ButtonVisibleContext.Provider>
  );
};
