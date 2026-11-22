import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import App from "./App.tsx";
import "./index.css";

// The website editor loads the site inside an iframe at /__cms/preview.
// That preview runs its own in-memory router so clicking around never leaves the editor.
const PreviewApp = lazy(() => import("./cms/PreviewRoot"));
const isPreview = window.location.pathname === "/__cms/preview";

createRoot(document.getElementById("root")!).render(
  isPreview ? (
    <Suspense fallback={null}>
      <PreviewApp />
    </Suspense>
  ) : (
    <App />
  ),
);
