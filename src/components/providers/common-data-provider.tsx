"use client";

import { createContext, useContext } from "react";

type Props = {
  children: React.ReactNode;
};

type CommonDataProps = {
  categories: TCategory[];
  countries: TCountry[];
  years: number[];
};

const CommonDataContext = createContext<CommonDataProps>({
  categories: [],
  countries: [],
  years: [],
});

export const useCommonData = () => useContext(CommonDataContext);

export default function CommonDataProvider({
  children,
  ...props
}: CommonDataProps & Props) {
  return (
    <CommonDataContext.Provider value={props}>
      {children}
    </CommonDataContext.Provider>
  );
}
