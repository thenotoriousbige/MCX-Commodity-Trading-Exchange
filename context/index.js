import React from 'react'
import { PortfolioProvider } from "./Portfolio"

const PortfolioWrapper = ({ children }) => {
     return (
          <PortfolioProvider>
               {children}
          </PortfolioProvider>
     )
}

export default PortfolioWrapper
