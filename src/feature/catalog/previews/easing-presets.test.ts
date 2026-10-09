import { describe, expect, it } from "vitest";

import { easingPresetRegistry, getEasingPreset } from "./easing-presets";

describe("getEasingPreset", () => {
  it("resolves an allowlisted source to a labeled preset", () => {
    const preset = getEasingPreset("ease-out-quart");

    expect(preset?.label).toBe("Ease Out Quart");
    expect(preset?.timingFunction).toBe("cubic-bezier(0.25, 1, 0.5, 1)");
  });

  it("returns undefined for an unregistered source", () => {
    expect(getEasingPreset("ease-out-bounced")).toBeUndefined();
  });
});

describe("easingPresetRegistry", () => {
  it("only contains safe CSS timing functions", () => {
    for (const preset of Object.values(easingPresetRegistry)) {
      expect(preset.timingFunction).toMatch(/^cubic-bezier\(/);
    }
  });
});
