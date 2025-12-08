export function setupSuggestionsTab({ field, list, setActiveItem, state }) {
  field.addEventListener("keydown", (event) => {
    const items = list.querySelectorAll(".search-suggestions__item");

    // TAB – hoppa mellan förslag, loopa
    if (event.key === "Tab") {
      if (!list.hidden && items.length > 0) {
        event.preventDefault();

        if (state.activeIndex < 0) {
          // första Tab
          setActiveItem(0);
        } else if (state.activeIndex >= items.length - 1) {
          // längst ner -> upp igen
          setActiveItem(0);
        } else {
          setActiveItem(state.activeIndex + 1);
        }
      }
      return;
    }
  });
}
