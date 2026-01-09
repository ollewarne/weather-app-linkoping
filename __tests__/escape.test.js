import { jest } from "@jest/globals";
import { setupSuggestionsEscape } from "../components/escapeSuggestions.js";

describe("setupSuggestionsEscape", () => {
  test("anropar hideList när Escape trycks", () => {
    const field = document.createElement("input");
    const hideList = jest.fn();

    setupSuggestionsEscape({ field, hideList });

    const event = new KeyboardEvent("keydown", { key: "Escape" });
    field.dispatchEvent(event);

    expect(hideList).toHaveBeenCalledTimes(1);
  });

  test("anropar INTE hideList för andra tangenter", () => {
    const field = document.createElement("input");
    const hideList = jest.fn();

    setupSuggestionsEscape({ field, hideList });

    const event = new KeyboardEvent("keydown", { key: "Enter" });
    field.dispatchEvent(event);

    expect(hideList).not.toHaveBeenCalled();
  });
});
