import { useTheme } from "./hooks/useTheme";
import { Hero } from "./components/Hero";
import { ProblemSection } from "./components/ProblemSection";
import { PipelineSection } from "./components/PipelineSection";
import { VisualizationsSection } from "./components/VisualizationsSection";
import { MaskSection } from "./components/MaskSection";

function App() {
  const { theme, nextTheme, toggleTheme } = useTheme();

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <main id="main-content" className="app-shell">
        <Hero theme={theme} nextTheme={nextTheme} onToggleTheme={toggleTheme} />
        <ProblemSection />
        <PipelineSection />
        <MaskSection />
        <VisualizationsSection />
      </main>
    </>
  );
}

export default App;
