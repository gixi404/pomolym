import CircleProgress from "./components/CircleProgress";
import Controls from "./components/Controls";
import SettingsBtn from "./components/SettingsBtn";
import SettingsModal from "./components/SettingsModal";
import { TimerProvider } from "./context/TimerContext";
import { useState } from "react";
import type { Component } from "./utils/types";

function App(): Component {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <TimerProvider>
      <main className="min-h-screen bg-[#1D1616] text-[#EEEEEE] flex flex-col items-center justify-center p-4">
        <CircleProgress />
        <Controls />
        <SettingsBtn openModal={() => setModal(true)} />
        {modal && <SettingsModal closeModal={() => setModal(false)} />}
      </main>
    </TimerProvider>
  );
}

export default App;
