import { isHexColor } from "class-validator";
import { toggleMark } from "prosemirror-commands";
import type { MarkSpec, MarkType } from "prosemirror-model";
import { presetDecorationColors } from "@shared/utils/color";
import { markInputRuleForPattern } from "../lib/markInputRule";
import Mark from "./Mark";

export default class Strikethrough extends Mark {
  /** Preset colors available for strikethrough coloring */
  static presetColors = presetDecorationColors;

  /**
   * Checks if a color is one of the strikethrough preset colors.
   *
   * @param color - A hex color string to check.
   * @returns true if the color matches a preset color's hex value.
   */
  static isPresetColor(color: string): boolean {
    return Strikethrough.presetColors.some((c) => c.hex === color);
  }

  get name() {
    return "strikethrough";
  }

  get schema(): MarkSpec {
    return {
      attrs: {
        color: {
          default: null,
          validate: "string|null",
        },
      },
      parseDOM: [
        {
          tag: "s",
          getAttrs: () => ({ color: null }),
        },
        {
          tag: "del",
          getAttrs: () => ({ color: null }),
        },
        {
          tag: "strike",
          getAttrs: () => ({ color: null }),
        },
        {
          tag: "span[data-strikethrough-color]",
          getAttrs: (dom) => {
            const color = dom.getAttribute("data-strikethrough-color") || "";
            return {
              color: isHexColor(color) ? color : null,
            };
          },
        },
        {
          style: "text-decoration",
          getAttrs: (value) => (value === "line-through" ? { color: null } : false),
        },
      ],
      toDOM: (node) => {
        if (node.attrs.color) {
          return [
            "span",
            {
              "data-strikethrough-color": node.attrs.color,
              style: `text-decoration: line-through ${node.attrs.color}`,
            },
            0,
          ];
        }
        return ["del", 0];
      },
    };
  }

  keys({ type }: { type: MarkType }) {
    return {
      "Mod-d": toggleMark(type),
    };
  }

  inputRules({ type }: { type: MarkType }) {
    return [markInputRuleForPattern("~", type)];
  }

  toMarkdown() {
    return {
      open: "~~",
      close: "~~",
      mixable: true,
      expelEnclosingWhitespace: true,
    };
  }

  get markdownToken() {
    return "s";
  }

  parseMarkdown() {
    return { mark: "strikethrough" };
  }
}
