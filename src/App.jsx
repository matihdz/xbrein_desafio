import Map from "./dom/Map";
import Navigation from "./dom/Navigation";
import PoisProvider from "./providers/PoisProvider";

function App() {
  return (
    <PoisProvider>
      <div className="flex h-screen">
        <Navigation />
        <Map />
      </div>
    </PoisProvider>
  );
}

export default App;
