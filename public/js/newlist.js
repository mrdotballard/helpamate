// create new to-do
var listCount = 1;

$('#another-item').click(function () {
  var bulk_drop = $('.bulk-input')[0];
  var bulk = $('.bulk-input')[0].value;

  if (bulk > 1) {
    for (i = 0; i < bulk; i++) {
      $('ul').append(`<li><input type="text" name="item+${listCount}"></li>`);
      listCount++;
    }
  } else {
    $('ul').append(`<li><input type="text" name="item+${listCount}"></li>`);
    listCount++;
  }
  bulk_drop.value = "";
  console.log("item" + listCount);
});
