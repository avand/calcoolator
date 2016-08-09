$(document).ready(function() {
  $("#add-cooler-button").click(function(e) {
    e.preventDefault();

    var lastCooler = $(".cooler:last");
    lastCooler.clone().insertAfter(lastCooler);
    bindCoolerEvents();
  })

  function bindCoolerEvents() {
    $(".cooler-type").click(function(e) {
      var coolerType = $(this);
      var cooler = coolerType.parents(".cooler");
      cooler.find(".cooler-type").removeClass("cooler-type-active");
      coolerType.addClass("cooler-type-active");
    })

    $(".cooler-remove-control").click(function(e) {
      e.preventDefault();

      var cooler = $(this).parents(".cooler");
      cooler.css("opacity", 0)

      setTimeout(function() {
        cooler.remove();
      }, parseFloat(cooler.css("transition-duration")) * 1000);
    })

    $(".cool-slider").on("input", function() {
      var slider = $(this);
      var changes = slider.data("changes");
      var changesWithin = slider.data("changes-within");
      var val = slider.val();
      if (changesWithin) {
        slider.parents(changesWithin).find(changes).text(val)
      } else {
        $(changes).text(val)
      }
    })
  }

  bindCoolerEvents();
})
