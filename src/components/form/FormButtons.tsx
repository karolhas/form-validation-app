//components
import { Button } from "../ui/button";

interface FormButtonsProps {
  resetForm: () => void;
}

export const FormButtons: React.FC<FormButtonsProps> = ({ resetForm }) => (
  <div className="flex justify-center gap-4 mt-10">
    <Button type="reset" onClick={resetForm}>
      Reset
    </Button>
    <Button type="submit">Submit</Button>
  </div>
);
