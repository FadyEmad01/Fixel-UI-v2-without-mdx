export interface EasingPreset {
  label: string;
  timingFunction: string;
}

/**
 * Explicit allowlist of easing presets collection cards may reference via the
 * `easing` renderer's `source` key. Only CSS-safe timing functions live here;
 * raw metadata can never inject a style value.
 */
export const easingPresetRegistry: Record<string, EasingPreset> = {
  "ease-in-out": {
    label: "Ease In Out",
    timingFunction: "cubic-bezier(0.42, 0, 0.58, 1)",
  },
  "ease-out-quart": {
    label: "Ease Out Quart",
    timingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
  },
  "ease-in-quart": {
    label: "Ease In Quart",
    timingFunction: "cubic-bezier(0.5, 0, 0.75, 0)",
  },
  "ease-out-cubic": {
    label: "Ease Out Cubic",
    timingFunction: "cubic-bezier(0.33, 1, 0.68, 1)",
  },
};

export function getEasingPreset(source: string): EasingPreset | undefined {
  return easingPresetRegistry[source];
}
