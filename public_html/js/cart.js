var cart={}; //Создаём корзину как список
function proverka() { //Если в корзине что-то осталось, данные о товарах сохранятся
    if (localStorage.getItem('cart')!== null) {
        cart=JSON.parse (localStorage.getItem('cart'));
    }
}

function visual(tovar) {
      var out = '';
      var st = 0;
      for (var key in cart) {
          if (!tovar[key]) {
              continue; // Пропускаем, если товар не найден
          }
          out += '<tr width="100%">';
          out += '<th width="5%"><button class="del" title="Удалить товар" data-art="' + key + '">x</button></th>';
          out += '<th width="10%">' + "арт." + tovar[key].id + '</th>';
          out += '<th width="35%">' + tovar[key].name + '</th>';
          out += '<th width="15%">' + tovar[key].price + " руб." + '</th>';
          out += '<th width="10%">' + cart[key] + '</th>';
          st += cart[key] * tovar[key].price;
          out += '<th width="20%">' + (cart[key] * tovar[key].price) + " руб." + '</th></tr>';
      }
      $('#korz').html(out);
      $('#itog').html("Итого: " + st + " руб.");
      $('.del').on('click', deletion);
  }

 function visual1(tovar) {
      var out = '';
      var st = 0;
      for (var key in cart) {
          if (!tovar[key]) {
              continue; // Пропускаем, если товар не найден
          }
          out += "Артикул " + tovar[key].id + "---";
          out += "Название " + tovar[key].name + "---";
          out += "Цена " + tovar[key].price + "---";
          out += "Кол-во " + cart[key] + "+++";
          st += cart[key] * tovar[key].price;
          out += st + "\n";
      }
      $('.nevid').html(out);
  }
  function deletion() {
      var tovar = $(this).attr('data-art');
      delete cart[tovar];
      localStorage.setItem('cart', JSON.stringify(cart));
      $.getJSON('/backend/start.php', function(data) {
        visual(data);
        visual1(data);
      });
}
$(document).ready(function() {
      proverka();
      $.getJSON('/backend/start.php', function(data) {
        visual(data);
        visual1(data);
  });
});

