import { setupSuggestionsArrows } from "./arrowsSuggestions.js";
import { setupSuggestionsTab } from "./tabSuggestions.js";
import { setupSuggestionsEnter } from "./enterSuggestions.js";
import { setupSuggestionsEscape } from "./escapeSuggestions.js";

export function setupSuggestions({ field, list, app, searchCities, handleSearch }) {
  let debounceId = null;
  const state = { activeIndex: -1 };

  function hideList() {
    list.innerHTML = "";
    list.hidden = true;
    state.activeIndex = -1;
  }

  function setActiveItem(newIndex) {
    const items = list.querySelectorAll(".search-suggestions__item");
    if (!items.length) {
      state.activeIndex = -1;
      return;
    }

    items.forEach((item) =>
      item.classList.remove("search-suggestions__item--active")
    );

    if (newIndex < 0) {
      state.activeIndex = -1;
      return;
    }

    const maxIndex = items.length - 1;
    if (newIndex > maxIndex) newIndex = maxIndex;

    const item = items[newIndex];
    if (!item) {
      state.activeIndex = -1;
      return;
    }

    state.activeIndex = newIndex;
    item.classList.add("search-suggestions__item--active");
    item.scrollIntoView({ block: "nearest" });
  }

  async function updateSuggestions() {
    const value = field.value.trim();
    if (value.length < 3) {
      hideList();
      return;
    }

    const results = await searchCities(value);

    list.innerHTML = "";
    state.activeIndex = -1;

    if (!results.length) {
      hideList();
      return;
    }

    results.slice(0, 5).forEach((city, index) => {
      const li = document.createElement("li");
      li.textContent = city.full;
      li.classList.add("search-suggestions__item");
      li.setAttribute("data-index", String(index));

      li.addEventListener("click", async () => {
        field.value = city.full;
        hideList();
        await handleSearch(app);
      });

      list.appendChild(li);
    });

    list.hidden = false;
  }

  // debounce
  field.addEventListener("input", () => {
    if (debounceId) clearTimeout(debounceId);
    debounceId = setTimeout(updateSuggestions, 500);
  });

  // pilar
  setupSuggestionsArrows({ field, list, setActiveItem, state });

  // tab
  setupSuggestionsTab({ field, list, setActiveItem, state });

  // enter
  setupSuggestionsEnter({
    field,
    list,
    state,
    hideList,
    handleSearch,
    app,
  });

  // escape
  setupSuggestionsEscape({ field, hideList });

  // klick utanför
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-wrapper")) hideList();
  });
}
