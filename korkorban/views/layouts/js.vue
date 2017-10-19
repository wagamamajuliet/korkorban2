		        var shoppingCart = (function(){
	            //private methods and properties
	            var cart = [];

	            var Item = function(name, price, count , img) {
	                this.name = name;
	                this.price = price;
	                this.count = count;
	                this.img = img;
	            };
	            var saveCart = function() {
	                localStorage.setItem("korkorban", JSON.stringify(cart));
	            };

	            var loadCart = function() {
	                cart = JSON.parse(localStorage.getItem("korkorban"));
	            };

	        

	            //public methods and properties
	            var obj = {};
	            obj.addItemToCart = function(name, price, count, img) {
	                for (var i in cart) {
	                    if(cart[i].name === name) {
	                        cart[i].count ++;
	                        saveCart();
	                        return;
	                    }
	                }
	                var item = new Item(name, price, count, img);
	                cart.push(item);
	                saveCart();
	            };

	            obj.removeItemFromCart = function (name) {
	                for (var i in cart) {
	                    if(cart[i].name === name) {
	                        cart[i].count --;
	                        if(cart[i].count === 0) {
	                            cart.splice(i,1);
	                        }
	                        break;
	                    }
	                }
	                saveCart();
	            }

	            obj.clearCart = function() {
	                cart = [];
	                saveCart();
	            }

	            obj.countCart = function() {
	                var totalCount = 0;
	                for(var i in cart) {
	                    totalCount += cart[i].count;
	                }

	                return totalCount;
	            }

	            obj.totalCart = function() {
	                var totalCost = 0;
	                for(var i in cart) {
	                    totalCost += cart[i].price * cart[i].count;
	                }
	                return totalCost.toLocaleString();
	            }

	            obj.listCart =function() {
	                var cartCopy = [];
	                for(var i in cart) {
	                    var item = cart[i];
	                    var itemCopy = [];
	                    for(var p in item) {
	                        itemCopy[p] = item[p];
	                    }
	                    itemCopy.total = (item.price * item.count);
	                    cartCopy.push(itemCopy);
	                }
	                return cartCopy;
	            }

	            obj.removeItemFromCartAll = function(name) {
	                for(var i in cart) {
	                    if(cart[i].name === name) {
	                        cart.splice(i, 1);
	                        break;
	                    }
	                }
	                saveCart();
	            }

	            obj.setCountForItem = function(name,count) {
	                for (var i in cart) {
	                    if(cart[i].name === name) {
	                        cart[i].count = count;
	                        break;
	                    }
	                    saveCart();
	                }
	            }

	            loadCart();

	            return obj;
	        })();

	    displayCart();


	    $(".add-to-cart").click(function(event){
	        event.preventDefault();
	        var name = $(this).attr("data-name");
	        var price = Number($(this).attr("data-price"));
	        var img = $(this).attr("data-img");
	        console.log("Click add to cart:"+name+" "+price+" "+img);

	        shoppingCart.addItemToCart(name, price, 1,img);
	        displayCart();
	    });

	    $("#clear-cart").click(function(event){
	        shoppingCart.clearCart();
	        displayCart();
	    });

	    function displayCart() {
	        console.log("*** display Cart ***");
	        var cartArray = shoppingCart.listCart();
	        console.log("*** Count Cart ***"+ cartArray.length);
	        var output = "";
	        for(var i in cartArray) {
	            output +="<div class='cart-input'>"+"<div class='cart-left'>"
	                   + "<img src='"+cartArray[i].img+"'>"+"</div>"
	                   + "<div class='cart-right'>"+"<div class='cart-name'>"+cartArray[i].name+"</div>"
	                   + "<div class='cart-price-quantity'>"
	                   + "<p class='cart-price'>"+cartArray[i].price.toLocaleString()+"</p>"
	                   + "<div class='cart-quantity'>"
	                   + "<input type='number' name='number' data-name='"
	                   + cartArray[i].name
	                   + "'class='input-cart-quantity item-count' value='"+ cartArray[i].count+"'>" 
	                   + "</div>"
	                   + "</div>"
	                   + "<div class='cart-totalprice'>"+cartArray[i].total.toLocaleString()+"</div>"
	                   + "<div class='cart-button'>"
	                   + "<div class='plus-Button'>"
	                   + "<div class='ab-Button plus-item' data-name='"+cartArray[i].name+"'>"+"+"
	                   + "</div>"
	                   + "</div>"
	                   + "<div class='minus-Button'>"
	                   + "<div class='ab-Button subtract-item' data-name='"+cartArray[i].name+"'>"+"-"
	                   + "</div>"
	                   + "</div>"
	                   + "<div class='delete-Button'>"
	                   + "<div class='ab-Button delete-item' data-name='"+cartArray[i].name+"'>"+"x"
	                   + "</div>"
	                   + "</div>"
	                   + "</div>"
	                   + "</div>"
	                   + "</div>";
	        }
	        $("#show-cart").html(output);
	        $("#count-cart").html(shoppingCart.countCart());
	        $("#total-cart").html(shoppingCart.totalCart());
	    }

	    $("#show-cart").on("click", ".delete-item", function(event){
	        var name = $(this).attr("data-name");
	        shoppingCart.removeItemFromCartAll(name);
	        displayCart();
	    });

	    $("#show-cart").on("click", ".subtract-item", function(event){
	        var name = $(this).attr("data-name");
	        shoppingCart.removeItemFromCart(name);
	        displayCart();
	    });

	    $("#show-cart").on("click", ".plus-item", function(event){
	        var name = $(this).attr("data-name");
	        shoppingCart.addItemToCart(name, 0 ,1);
	        displayCart();
	    });

	    $("#show-cart").on("change", ".item-count", function(event){
	        var name = $(this).attr("data-name");
	        var count = Number($(this).val());
	        shoppingCart.setCountForItem(name, count);
	        displayCart();
	    });