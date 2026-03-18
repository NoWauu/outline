type Props = {
  /** The size of the icon, 24px is default to match standard icons */
  size?: number;
  /** The color of the underline bar, defaults to currentColor */
  color?: string;
};

/**
 * Icon representing underline text formatting, showing a "U" with an underline bar.
 *
 * @param size - the size of the icon in pixels.
 * @param color - the color of the underline bar.
 */
export default function UnderlineIcon({
  size = 24,
  color = "currentColor",
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 3v7c0 3.31 2.69 6 6 6s6-2.69 6-6V3h-2v7c0 2.21-1.79 4-4 4s-4-1.79-4-4V3H6z" />
      <rect x="4" y="21" width="16" height="2" rx="1" fill={color} />
    </svg>
  );
}
