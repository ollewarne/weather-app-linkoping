import { jest } from "@jest/globals";
import { setupSuggestionsArrows } from "../components/arrowsSuggestions.js";

test("ArrowUp flyttar activeIndex ett steg upp", () => {
  const field = document.createElement("input");

  const list = document.createElement("div");
  list.hidden = false;

  const item1 = document.createElement("div");
  item1.className = "search-suggestions__item";
  const item2 = document.createElement("div");
  item2.className = "search-suggestions__item";

  list.appendChild(item1);
  list.appendChild(item2);

  const setActiveItem = jest.fn();
  const state = { activeIndex: 1 };

  setupSuggestionsArrows({ field, list, setActiveItem, state });

  const event = new KeyboardEvent("keydown", {
    key: "ArrowUp",
    cancelable: true
  });

  field.dispatchEvent(event);

  expect(setActiveItem).toHaveBeenCalledWith(0);
});
