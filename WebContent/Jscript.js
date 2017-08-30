$(document).ready(loadProducts);

$(document).on("click", "#userreg",function userReg(){
	var fname=$('#txtFname').val();
	var lname=$('#txtlname').val();
	var email=$('#txtEmail').val();
	var mobile=$('#txtPwd').val();
	var password=$('#txtMobile').val();
	var address1=$('#txtAdd1').val();
	var address2=$('#txtAdd2').val();
	var city=$('#txtCity').val();
	var state=$('#txtState').val();
	var country=$('#txtCountry').val();
	var zipcode=$('#txtZipcode').val();
	var landmark=$('#txtLadmark').val();
	 if($('#radio_button').is(':checked'))
	 {
	 	var gender = "Male";
	 }
	 else
	 {
	 	var gender = "Female";
	 }
	$.ajax({
		url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=userreg',
		type: 'POST',
		data : {
			fname:fname,lname:lname,email:email,password:password,mobile:mobile,address1:address1,
			address2:address2,city:city,state:state,country:country,zipcode:zipcode,landmark:landmark,
			gender:gender
		},
		success : function(responseText) {
			var obj = jQuery.parseJSON(responseText);
			console.log(obj);
			if(obj.success == "success"){window.location.href = "http://localhost:8080/Ecommerce/userlogin.html";}
			
				else{alert(obj.message);}
					
		}
	});
});

$(document).on("click", "#addproduct",function userReg(){
	var pname=$('#txtPname').val();
	var pcount=$('#txtPcount').val();
	var bname=$('#txtBname').val();
	var price=$('#txtPrice').val();
		$.ajax({
		url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=addproduct',
		type: 'POST',
		data : {
			productname:pname,stock:pcount,brand:bname,price:price
		},
		success : function(responseText) {
			var obj = jQuery.parseJSON(responseText);
			console.log(obj);
			if(obj == "success"){alert("Product Added");}
			
				else{alert("Try Again");}
					
		}
	});
});

$(document).on("click", "#userlogin", function() {
	var email = $('#txtEmail').val();
	var pwd = $('#txtPwd').val();
	$.ajax({
		url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=login',
		type: 'POST',
		data : {
			email : email,password:pwd
		},
		success : function(responseText) {
			if(responseText == "success"){window.location.href = "http://localhost:8080/Ecommerce/home.html";}
				
				else{alert("Wrong Login Credientials");$('#txtEmail').val("");$('#txtPwd').val("");}
					
		}
	});
});

$(document).on("click", "#addtocart", function() {
	var productid = $('input[name=product]:checked').attr('id');
	alert(productid);
	$.ajax({
		url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=addtocart',
		type: 'POST',
		data : {
			userid :"1",productid:productid
		},
		success : function(responseText) {
			if(responseText == "success"){alert("added to cart");}
				
				else{alert("try again");}
					
		}
	});
});

$(document).on("click", "#placeorder", function() {
	var productid = $('input[name=cart]:checked').attr('id');
	var quantity = $('#txtQty').val();
	var td_id = "#td_"+$('input[name=cart]:checked').attr('id');
	var price =$('#td_1').html();
	var totalamount = quantity * price;
	$.ajax({
		url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=orders',
		type: 'POST',
		data : {
			userid :"1",productid:productid,quantity:quantity,shippingid:"1",totalamount:totalamount
		},
		success : function(responseText) {
			if(responseText == "success"){
				alert("order placed");
				
				}
				
				else{alert("try again");}
					
		}
	});
});
$(document).on("click", "#td_myorders", function() {
	$('#product_list').hide();
	$('#my_carts').hide();
	$('#my_orders').show();
	$.ajax({
		url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=myorders&userid=1',
		type: 'POST',
		data : {
			
		},
		success : function(responseText) {
			console.log(responseText);
			var obj = jQuery.parseJSON(responseText);
			var orderTable="<table border='1'><tr><td>Order No</td><td>Product Name</td><td>Date</td><td>Quantity</td><td>Amount</td>";
			for(var i=0;i<obj.length;i++)
			{
				orderTable = orderTable + "<tr><td>"+obj[i].orderid+"</td><td>"+obj[i].productname+"</td>" +
						"<td>"+obj[i].orderdate+"</td><td>"+obj[i].productquantity+"</td><td>"+obj[i].totalamount+"</td></tr>";
				}
			orderTable = orderTable + "</table>";
			$('#my_orders').empty();
			$('#my_orders').append(orderTable);
								
		}
	});
});

$(document).on("click", "#td_mycarts", function() {
	$('#product_list').hide();
	$('#my_orders').hide();
	$('#my_carts').show();
	$.ajax({
		url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=mycarts&userid=1',
		type: 'POST',
		data : {
			
		},
		success : function(responseText) {
			console.log(responseText);
			var obj = jQuery.parseJSON(responseText);
			//alert(obj.length);
			var cartTable="<table border='1'><tr><td>Select</td><td>Product Name</td><td>Price</td></tr>";
			for(var i=0;i<obj.length;i++)
			{
				var td_id = "td_"+ obj[i].productid;
				cartTable = cartTable + "<tr><td><input name='cart' type ='radio' id="+obj[i].productid+" /></td><td>"+obj[i].productname+"</td><td id="+td_id+">"+obj[i].price+"</td></tr>";
				}
			cartTable = cartTable + "<tr><td>Quantity</td><td colspan='2'><input type='textbox' id='txtQty' /></td></tr>";
			cartTable = cartTable + "<tr><td colspan='3' align='center'><input class='btn' type='button' id='placeorder' value='Place Order' ></td></tr></table>";
			$('#my_carts').empty();
			$('#my_carts').append(cartTable);
								
		}
	});
});

$(document).on("click", "#td_products", function() {
	loadProducts();
});


function loadProducts()
{
	$('#product_list').show();
	$('#my_carts').hide();
	$('#my_orders').hide();
	$.ajax({
		url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=show_products',
		type: 'POST',
		data : {
			
		},
		success : function(responseText) {
			console.log(responseText);
			var obj = jQuery.parseJSON(responseText);
			//alert(obj.length);
			var productTable="<table border='1' width='100%'><tr><td>Select</td><td>Brand</td><td>Product Name</td><td> Price</td></tr>";
			for(var i=0;i<obj.length;i++)
			{
				productTable = productTable + "<tr><td><input name='product' type ='radio' id="+obj[i].productid+" /></td><td>"+obj[i].brandname+"</td><td>"+obj[i].productname+"</td><td>"+obj[i].price+"</td></tr>";
				}
			productTable = productTable + "<tr><td colspan='4' align='center'><input class='btn' type='button' id='addtocart' value='Add To Cart' ></td></tr></table>";
			$('#product_list').empty();
			$('#product_list').append(productTable);
		}
	});
}
function showrow()
{
	$('.products').hide();
}

