import { useCallback } from "react";
import ColorPicker from "@shared/components/ColorPicker";
import { useEditor } from "./EditorContext";

type Props = {
  /** The currently active color */
  activeColor: string;
};

/**
 * A color picker component for applying strikethrough color.
 */
function StrikethroughColorPicker({ activeColor }: Props) {
  const { commands } = useEditor();

  const handleSelect = useCallback(
    (color: string) => {
      if (commands.strikethrough) {
        commands.strikethrough({ color });
      }
    },
    [commands]
  );

  return (
    <ColorPicker alpha={false} activeColor={activeColor} onSelect={handleSelect} />
  );
}

export default StrikethroughColorPicker;
