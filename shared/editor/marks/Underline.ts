import { isHexColor } from "class-validator";
import { toggleMark } from "prosemirror-commands";
import type { MarkSpec, MarkType } from "prosemirror-model";
import { presetDecorationColors } from "@shared/utils/color";
import { markInputRuleForPattern } from "../lib/markInputRule";
import underlinesRule from "../rules/underlines";
import Mark from "./Mark";

export default class Underline extends Mark {
  /** Preset colors available for underline coloring */
  static presetColors = presetDecorationColors;

  /**
   * Checks if a color is one of the underline preset colors.
   *
   * @param color - A hex color string to check.
   * @returns true if the color matches a preset color's hex value.
   */
  static isPresetColor(color: string): boolean {
    return Underline.presetColors.some((c) => c.hex === color);
  }

  get name() {
    return "underline";
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
          tag: "u",
          getAttrs: () => ({ color: null }),
        },
        {
          tag: "span[data-underline-color]",
          getAttrs: (dom) => {
            const color = dom.getAttribute("data-underline-color") || "";
            return {
              color: isHexColor(color) ? color : null,
            };
          },
        },
        {
          consuming: false,
          tag: ":not(a)",
          getAttrs: (node: HTMLElement) => {
            if (
              !node.style.textDecoration.includes("underline") &&
              !node.style.textDecorationLine.includes("underline")
            ) {
              return false;
            }
            const color =
              node.style.textDecorationColor || node.getAttribute("data-underline-color");
            return {
              color: color && isHexColor(color) ? color : null,
            };
          },
        },
      ],
      toDOM: (node) => {
        if (node.attrs.color) {
          return [
            "span",
            {
              "data-underline-color": node.attrs.color,
              style: `text-decoration: underline ${node.attrs.color}`,
            },
            0,
          ];
        }
        return ["u", 0];
      },
    };
  }

  get rulePlugins() {
    return [underlinesRule];
  }

  inputRules({ type }: { type: MarkType }) {
    return [markInputRuleForPattern("__", type)];
  }

  keys({ type }: { type: MarkType }) {
    return {
      "Mod-u": toggleMark(type),
    };
  }

  toMarkdown() {
    return {
      open: "__",
      close: "__",
      mixable: true,
      expelEnclosingWhitespace: true,
    };
  }

  parseMarkdown() {
    return { mark: "underline" };
  }
}
