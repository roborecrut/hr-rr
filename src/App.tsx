/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from "react";
import { RouterProvider, useRouter } from "./components/RouterContext";
import LandingPage from "./pages/LandingPage";
import MainCatalogPage from "./pages/MainCatalogPage";
import EmployerPanel from "./pages/EmployerPanel";
import CandidateFlow from "./pages/CandidateFlow";
import AdminPanel from "./pages/AdminPanel";
import JobVacancyLanding from "./pages/JobVacancyLanding";
import CompanyLanding from "./pages/CompanyLanding";
import NotFoundPage from "./pages/NotFoundPage";

const KNOWN_PATHS: Record<string, () => React.ReactElement> = {
  "/": LandingPage,
  "/main": LandingPage,
  "/vacancy": MainCatalogPage,
  "/admin": AdminPanel,
  "/job": JobVacancyLanding,
  "/auth": LandingPage,
  "/setup": EmployerPanel,
};

const RESERVED_FIRST_SEGMENTS = new Set([
  "main",
  "vacancy",
  "admin",
  "job",
  "auth",
  "setup",
  "candidate",
  "employer",
]);

const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/;

function AppContent() {
  const { path } = useRouter();

  const segments = path.split("/").filter(Boolean);

  // Candidate flow (any path starting with "candidate" or "cand")
  const isCandidateUrl =
    path.startsWith("/candidate") ||
    segments.some(
      (s) => s.toLowerCase().startsWith("candidate") || s.toLowerCase().startsWith("cand"),
    );
  if (isCandidateUrl) return <CandidateFlow />;

  // Employer panel
  if (/^\/employer[a-zA-Z0-9_-]*/.test(path)) return <EmployerPanel />;

  // Exact known paths
  const Known = KNOWN_PATHS[path];
  if (Known) return <Known />;

  // Single-segment company slug -> company landing
  if (
    segments.length === 1 &&
    !RESERVED_FIRST_SEGMENTS.has(segments[0]) &&
    SLUG_RE.test(segments[0])
  ) {
    return <CompanyLanding />;
  }

  return <NotFoundPage />;
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
