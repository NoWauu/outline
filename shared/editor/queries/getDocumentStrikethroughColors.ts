import type { EditorState } from "prosemirror-state";

/**
 * Get all unique strikethrough colors used in the document.
 *
 * @param state - the editor state.
 * @returns an array of unique hex color strings used for strikethrough color in the document.
 */
export function getDocumentStrikethroughColors(state: EditorState): string[] {
  const colors = new Set<string>();

  state.doc.descendants((node) => {
    if (node.isText) {
      const strikethroughMark = node.marks.find(
        (mark) => mark.type.name === "strikethrough"
      );
      if (strikethroughMark?.attrs.color) {
        colors.add(strikethroughMark.attrs.color);
      }
    }
  });

  return Array.from(colors);
}
