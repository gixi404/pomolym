import { SettingsIcon } from "lucide-react";
import type { Component } from "../utils/types";

function SettingsBtn({ openModal }: Props): Component {
  return (
    <button
      type="button"
      onClick={openModal}
      className="cursor-pointer absolute bottom-4 right-4 bg-[#8E1616] p-3 rounded-full hover:bg-[#D84040] transition-opacity opacity-85 hover:opacity-100"
    >
      <SettingsIcon size={24} color="#EEEEEE" strokeWidth={1.5} />
    </button>
  );
}

export default SettingsBtn;

interface Props {
  openModal: () => void;
}
