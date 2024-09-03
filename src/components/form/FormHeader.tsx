//components
import ButtonSwitcher from "../ButtonSwitcher";

interface FormHeaderProps {
  isPrivate: string;
  handleSwitch: (value: string) => void;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  isPrivate,
  handleSwitch,
}) => (
  <>
    <h3 className="text-2xl font-semibold">Example Form</h3>
    <ButtonSwitcher onSwitch={handleSwitch} />
  </>
);
