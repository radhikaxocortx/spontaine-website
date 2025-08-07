import { createContext, useContext, ReactNode } from 'react'

export type RenderMode = 'page' | 'drawer'

interface PageBuilderContextType {
  renderMode: RenderMode
}

const PageBuilderContext = createContext<PageBuilderContextType | undefined>(undefined)

interface PageBuilderProviderProps {
  children: ReactNode
  renderMode: RenderMode
}

export const PageBuilderProvider = ({ children, renderMode }: PageBuilderProviderProps) => {
  return (
    <PageBuilderContext.Provider value={{ renderMode }}>
      {children}
    </PageBuilderContext.Provider>
  )
}

export const usePageBuilderContext = (): PageBuilderContextType => {
  const context = useContext(PageBuilderContext)
  if (context === undefined) {
    // Default to page mode if no context is provided
    return { renderMode: 'page' }
  }
  return context
}

export default PageBuilderContext