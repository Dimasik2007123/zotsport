var cart={};

$('document').ready(function(){
    loadGoods();
    proverka();
});
function loadGoods() {
    $.getJSON('/backend/start.php', function (data) {
        //console.log(data);
        var out='';
        for (var key in data){
            if(data[key]["avalible"] == 1 && data[key]["category"] == "Шорты"){
                out+='<li class="tovar1" data-category="'+data[key]["brand"]+'">';
                out+='<div class="tovar_fil" data-category="'+data[key]["brand"]+'">';
                //out+='<a id="tovar_s" target="_blank" href="'+data[key]["sy"]+'">';
                out+='<img width="50%" src="'+ data[key]["image"]+'"><br>';
                out+='<p>'+data[key]["name"]+'</p>';
                if(data[key]["sale"] > 0){
                    out+='<p class="old">'+"Старая цена: "+data[key]["old_price"]+" руб."+'</p>';
                    out+='<p class="sale">'+"SALE "+data[key]["sale"]+ "%" +'<br>'+"Новая цена: "+data[key]["price"]+" руб."+'</p>';
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
        $('.pri').html(out);
        $('button.knopka').on('click', add);
    });
}


function add() {
    if (cart[$(this).attr('data-art')] != undefined) {
        cart[$(this).attr('data-art')]++;
    }
    else {
        cart[$(this).attr('data-art')]=1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Товар добавлен в корзину");
    proverka();
    console.log(cart);
}
function proverka() {
    if (localStorage.getItem('cart')!= null) {
        cart=JSON.parse (localStorage.getItem('cart'));
    }
}