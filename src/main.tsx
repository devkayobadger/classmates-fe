import { StrictMode } from "react"

import { PersistGate } from "redux-persist/integration/react"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import { createRoot } from "react-dom/client"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

import { router } from "@/routes"
import { store, persistor } from "@/lib/redux/store"

import { ErrorBoundary } from "./error-boundary"

import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TooltipProvider>
            <ThemeProvider>
              <RouterProvider router={router} />
              <Toaster richColors position="top-right" />
            </ThemeProvider>
          </TooltipProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
)
