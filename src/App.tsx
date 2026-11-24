import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import Admin from "./pages/Admin.tsx";
import { CmsPage, CmsRoute } from "@/cms/CmsPage";
import { PRODUCT_SLUG } from "@/cms/types";
import { BookingProvider } from "@/components/BookingProvider";
import BookingModal from "@/components/BookingModal";

// Editor code is only downloaded when you open /admin/editor
const Editor = lazy(() => import("@/cms/editor/Editor"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BookingProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <Routes>
            {/* Every public page is rendered by the website editor (CMS).
                Built-in pages keep their original content until you change them in /admin/editor. */}
            <Route path="/product/:id" element={<CmsPage slug={PRODUCT_SLUG} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/admin/editor" element={<Editor />} />
            <Route path="*" element={<CmsRoute />} />
          </Routes>
          </Suspense>
          <BookingModal />
        </BrowserRouter>
      </BookingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
