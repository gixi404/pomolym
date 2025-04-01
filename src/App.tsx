import Controls from "./components/Controls";
import NextCycle from "./components/NextCycle";
import Progress from "./components/Progress";
import SettingsBtn from "./components/SettingsBtn";
import SettingsModal from "./components/SettingsModal";
import { useState } from "react";
import type { Component } from "./utils/types";

function App(): Component {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <main className="min-h-screen text-[#EEEEEE] flex flex-col items-center justify-center w-full">
      <NextCycle />
      <Progress />
      <Controls />
      <SettingsBtn openModal={() => setModal(true)} />
      {modal && <SettingsModal closeModal={() => setModal(false)} />}
    </main>
  );
}

export default App;
