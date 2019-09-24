// create new to-do
var listCount = 1;

$('#another-item').click(function () {
  listCount++;
  $('ul').append(`<li><input type="text" name="item+${listCount}"></li>`);
  console.log("item" + listCount);
});
