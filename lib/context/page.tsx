import { useContext, createContext } from "react";

const initialState: PageProps = {
  year: undefined,
  title: undefined,
  isArchive: false,
  isHome: false
}

export const PageContext = createContext(initialState);

export type PageProviderProps = {
  children: React.ReactElement,
  value: PageProps
}

// Context provider
export const PageProvider = ({ children, value }: PageProviderProps) => {

  return (
    <PageContext.Provider value={{
      ...initialState,
      ...value,
      isArchive: value.year?.title !== process.env.NEXT_PUBLIC_CURRENT_YEAR
    }}>
      {children}
    </PageContext.Provider>
  )
};
// usePage hook
export const usePage = (): PageProps => {
  return useContext(PageContext)
}
