export function setupSuggestionsArrows({ field, list, setActiveItem, state }) {
  field.addEventListener("keydown", (event) => {
    const items = list.querySelectorAll(".search-suggestions__item");

    // PIL NER
    if (event.key === "ArrowDown") {
      if (!list.hidden && items.length > 0) {
        event.preventDefault();
        if (state.activeIndex < 0) {
          setActiveItem(0);
        } else if (state.activeIndex >= items.length - 1) {
          setActiveItem(items.length - 1); // stanna längst ner
        } else {
          setActiveItem(state.activeIndex + 1);
        }
      }
      return;
    }

    // PIL UPP
    if (event.key === "ArrowUp") {
      if (!list.hidden && items.length > 0) {
        event.preventDefault();
        if (state.activeIndex <= 0) {
          setActiveItem(-1); // inga markerad
        } else {
          setActiveItem(state.activeIndex - 1);
        }
      }
      return;
    }
  });
}
