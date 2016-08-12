function calcPounds() {
  var numberOfDays = parseInt($("#number-of-days input").val());
  var totalFreezerQuarts = 0;
  var totalFridgeQuarts = 0;

  $(".cooler-type-active").each(function(i, activeCoolerType) {
    activeCoolerType = $(activeCoolerType);
    var quarts = parseInt(activeCoolerType.parents(".cooler").find("input").val());
    if (activeCoolerType.data("cooler-type") == "freezer") {
      totalFreezerQuarts += quarts;
    } else {
      totalFridgeQuarts += quarts;
    }
  });

  var totalFreezerPounds = Math.ceil((totalFreezerQuarts / 3) * Math.pow(numberOfDays, 1.2));
  var totalFridgePounds = Math.ceil((totalFridgeQuarts / 3) * Math.pow(numberOfDays, 1.1));

  return {
    days: numberOfDays,
    freezer: {
      totalQuarts: totalFreezerQuarts,
      poundsDryIce: totalFreezerPounds
    },
    fridge: {
      totalQuarts: totalFridgeQuarts,
      poundsDryIce: totalFridgePounds
    }
  }
}

function updatePounds() {
  var result = calcPounds();
  var totalPounds = result.freezer.poundsDryIce + result.fridge.poundsDryIce;
  $("#pounds").text(totalPounds);
}

$(document).ready(function() {
  $("#add-cooler-button").click(function(e) {
    e.preventDefault();

    var lastCooler = $(".cooler:last");
    lastCooler.clone().insertAfter(lastCooler);

    bindCoolerEvents();
    updatePounds();
  })

  function bindCoolerEvents() {
    $(".cooler-type").click(function(e) {
      var coolerType = $(this);
      var cooler = coolerType.parents(".cooler");
      cooler.find(".cooler-type").removeClass("cooler-type-active");
      coolerType.addClass("cooler-type-active");

      updatePounds();
    })

    $(".cooler-remove-control").click(function(e) {
      e.preventDefault();

      var cooler = $(this).parents(".cooler");
      cooler.css("opacity", 0)

      setTimeout(function() {
        cooler.remove();
        updatePounds();
      }, parseFloat(cooler.css("transition-duration")) * 1000);
    })

    $(".cool-slider").on("input", function() {
      var slider = $(this);
      var changes = slider.data("changes");
      var changesWithin = slider.data("changes-within");
      var val = slider.val();

      if (changesWithin) {
        slider.parents(changesWithin).find(changes).text(val);
      } else {
        $(changes).text(val);
      }

      updatePounds();
    })
  }

  bindCoolerEvents();
  updatePounds();
})
