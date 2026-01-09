export function setupSuggestionsEscape({ field, hideList }) {
  field.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideList();
    }
  });
}
