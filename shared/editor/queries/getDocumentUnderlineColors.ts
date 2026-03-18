import type { EditorState } from "prosemirror-state";

/**
 * Get all unique underline colors used in the document.
 *
 * @param state - the editor state.
 * @returns an array of unique hex color strings used for underline color in the document.
 */
export function getDocumentUnderlineColors(state: EditorState): string[] {
  const colors = new Set<string>();

  state.doc.descendants((node) => {
    if (node.isText) {
      const underlineMark = node.marks.find(
        (mark) => mark.type.name === "underline"
      );
      if (underlineMark?.attrs.color) {
        colors.add(underlineMark.attrs.color);
      }
    }
  });

  return Array.from(colors);
}
