"use client";

//hooks
import { useState } from "react";

//components
import { Button } from "./ui/button";

const ButtonSwitcher = ({
  onSwitch,
}: {
  onSwitch: (value: string) => void;
}) => {
  const [activeButton, setActiveButton] = useState("Private");

  const handleSwitch = (value: string) => {
    setActiveButton(value);
    onSwitch(value);
  };

  return (
    <div className="inline-flex rounded-md" role="group">
      <Button
        type="button"
        variant={`${activeButton === "Public" ? "default" : "outline"}`}
        size="default"
        onClick={() => handleSwitch("Public")}
      >
        Public
      </Button>
      <Button
        type="button"
        variant={`${activeButton === "Private" ? "default" : "outline"}`}
        size="default"
        onClick={() => handleSwitch("Private")}
      >
        Private
      </Button>
    </div>
  );
};

export default ButtonSwitcher;
