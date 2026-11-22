import { createContext, useContext } from "react";

/**
 * Pages written before the editor existed render <Navbar/> and <Footer/> themselves.
 * Inside the CMS the header & footer live in their own editable groups, so those
 * page-level copies are suppressed through this context.
 */
export const ChromeContext = createContext<"normal" | "suppress">("normal");
export const useChromeSuppressed = () => useContext(ChromeContext) === "suppress";

/** True when rendering inside the editor's live preview iframe. */
export const PreviewContext = createContext(false);
export const useIsPreview = () => useContext(PreviewContext);
