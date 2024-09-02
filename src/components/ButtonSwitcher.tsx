"use client";

import { useState } from "react";
import { Button } from "./ui/button";

const ButtonSwitcher = () => {
  const [activeButton, setActiveButton] = useState("Private");

  return (
    <div className="inline-flex rounded-md" role="group">
      <Button
        type="button"
        variant={`${activeButton === "Public" ? "default" : "outline"}`}
        size="default"
        onClick={() => setActiveButton("Public")}
      >
        Public
      </Button>
      <Button
        type="button"
        variant={`${activeButton === "Private" ? "default" : "outline"}`}
        size="default"
        onClick={() => setActiveButton("Private")}
      >
        Private
      </Button>
    </div>
  );
};

export default ButtonSwitcher;
