export function setupSuggestionsEnter({
  field,
  list,
  state,
  hideList,
  handleSearch,
  app,
}) {
  field.addEventListener("keydown", async (event) => {
    if (event.key !== "Enter") return;

    const items = list.querySelectorAll(".search-suggestions__item");

    if (!list.hidden && state.activeIndex >= 0 && items[state.activeIndex]) {
      event.preventDefault();
      const chosen = items[state.activeIndex];
      field.value = chosen.textContent || "";
      hideList();
      await handleSearch(app);
    } else {
      hideList();
      await handleSearch(app);
    }
  });
}
