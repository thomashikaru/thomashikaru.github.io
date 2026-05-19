(function () {
  var tiles = document.querySelectorAll(".interest-tile");
  if (!tiles.length) return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function closeTile(tile) {
    tile.setAttribute("aria-expanded", "false");
    var card = tile.querySelector(".interest-card");
    if (card) card.classList.remove("is-flipped");
  }

  function closeOthers(except) {
    tiles.forEach(function (tile) {
      if (tile !== except) closeTile(tile);
    });
  }

  tiles.forEach(function (tile) {
    tile.addEventListener("click", function () {
      var expanded = tile.getAttribute("aria-expanded") === "true";
      closeOthers(tile);
      if (expanded) {
        closeTile(tile);
        return;
      }
      tile.setAttribute("aria-expanded", "true");
      var card = tile.querySelector(".interest-card");
      if (card) card.classList.add("is-flipped");
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    tiles.forEach(closeTile);
  });

  if (reducedMotion) {
    document.documentElement.classList.add("interest-reduced-motion");
  }
})();
