var cart={}; //Создаём корзину как список

$('document').ready(function(){ //Функции начинают работать только после полной загрузки страницы с товаром
    loadGoods();
    proverka();
});
function loadGoods() { //Функция отвечает за вываод на страницу товаров из базы данных
    $.getJSON('/backend/start.php', function (data) {
        var out=''; //Обявляем строку для вывода карточки с товаром
        for (var key in data){ //Постепенно идём по json файлу, формируются блоки товаров из основных полей: цена, фото товара и т.д. При этом можно свободно менять расположение объектов блока. например, поменять местами цену (1) и кнопку (2)
            if(data[key]["avalible"] == 1 && data[key]["category"] == "Мячи"){
                out+='<li class="tovar1" data-category="'+data[key]["brand"]+'">';
                out+='<div class="tovar_fil" data-category="'+data[key]["brand"]+'">';
                //out+='<a id="tovar_s" target="_blank" href="'+data[key]["sy"]+'">';
                out+='<img width="50%" src="'+ data[key]["image"]+'"><br>';
                out+='<p>'+data[key]["name"]+'</p>';
                if(data[key]["sale"] > 0){
                    out+='<p class="old">'+"Старая цена: "+data[key]["old_price"]+" руб."+'</p>';
                    out+='<p class="sale">'+"SALE "+data[key]["sale"]+ "%" + '<br>'+"Новая цена: "+data[key]["price"]+" руб."+'</p>';
                }
                else{
                out+='<p>'+"Цена: "+data[key]["price"]+" руб."+'</p>';
                }
                out+='<p>'+"Артикул: "+data[key]["id"]+'</p>'+'</a>';
                out+='<button data-art="'+key+'" class="knopka">Добавить в корзину</button>';
                out+='</div>';
                out+='</li>';
            }
        }
        $('.pri').html(out); //Выводим данные на страницу
        $('button.knopka').on('click', add); //Добавляем товар в корзину при нажатии на кнопку
    });
}

function add() {
    if (cart[$(this).attr('data-art')]!=undefined) { //Если данный товар есть в корзине, увеличиваем его количество
        cart[$(this).attr('data-art')]++;
    }
    else {
        cart[$(this).attr('data-art')]=1; //Если товара нет в корзине, заносим его туда
    }
    localStorage.setItem('cart', JSON.stringify(cart)); //Добавляем корзину в LocalStorage
    alert("Товар добавлен в корзину"); //Выводим уведомление о добавлении товара в корзину. Текст можно написать любой
    proverka();
    console.log(cart);
}
function proverka() {
    if (localStorage.getItem('cart')!= null) { //Если в корзине что-то осталось, данные о товарах сохранятся
        cart=JSON.parse (localStorage.getItem('cart'));
    }
    
}
