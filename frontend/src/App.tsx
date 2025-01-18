import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import PerspectiveForm from "./components/perspective/PerspectiveForm";
import LoadingTransition from "./components/perspective/LoadingTransition";
import VideoResults from "./components/perspective/VideoResults";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route
            path="/"
            element={
              <PerspectiveForm
                onSubmit={(perspective) => {
                  // Navigate to loading page
                  window.location.href = "/loading";
                }}
              />
            }
          />
          <Route path="/loading" element={<LoadingTransition />} />
          <Route path="/results" element={<VideoResults />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
