import { SettingsIcon } from "lucide-react";
import type { Component } from "../utils/types";

function SettingsBtn({ openModal }: Props): Component {
  return (
    <button
      type="button"
      onClick={openModal}
      className="cursor-pointer absolute bottom-4 right-4 lg:bottom-6 lg:right-6 transition-opacity opacity-70 hover:opacity-100"
    >
      <SettingsIcon size={24} color="#eee" strokeWidth={1.5} />
    </button>
  );
}

export default SettingsBtn;

interface Props {
  openModal: () => void;
}
