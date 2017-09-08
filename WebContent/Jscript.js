$(document).ready(function (){
	
	showuserinfo();
	loadProducts();
	
//	if($('#hidid').val() != "")
//	{
//		showuserinfo();
//		loadProducts();
//		}
//	else
//	{
//		window.location.href = "http://localhost:8080/Ecommerce/userlogin.html";
//		}
//	
});

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
	var pwd = $('#txtPwd').val();
	var cfrmpwd = $('#txtCfrmPwd').val();
	if($('#rdMale').is(':checked'))
	 {
	 	var gender = "Male";
	 }
	 else
	 {
	 	var gender = "Female";
	 }
	if(pwd == cfrmpwd)
	{
		$.ajax({
			url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=userreg',
			type: 'POST',
			data : {
				fname:fname,lname:lname,email:email,password:pwd,mobile:mobile,address1:address1,
				address2:address2,city:city,state:state,country:country,zipcode:zipcode,landmark:landmark,
				gender:gender
			},
			success : function(responseText) {
				var obj = jQuery.parseJSON(responseText);
				console.log(obj);
				if(obj[0].success == "success"){window.location.href = "http://localhost:8080/Ecommerce/userlogin.html";}
				
					else{alert(obj.message);}
						
			}
		});
	}
	else
	 {
		 alert("Password Not Matching");
	 }
	
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



$(document).on("click", "#btn_addtocart", function() {
	//var productid = $('input[name=product]:checked').attr('id'); 
	var productid = $('#hidPrdId').val();
	var quantity = $('#txtgetQty').val();
	var price = $('#showPrdPrice').text();
	var amount = quantity * price;
	var userid = $('#hidid').val();//alert(productid);
	$.ajax({
		url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=addtocart',
		type: 'POST',
		data : {
			userid :userid,productid:productid,quantity:quantity,amount:amount,
		},
		success : function(responseText) {
			var obj = jQuery.parseJSON(responseText);
			alert(obj[0].success[0].message);
			$('#divcontent').show();
			$('#userdiv').hide();
			$('#changepwd').hide();
			$('#prdndesc').hide();
					
		}
	});
});

$(document).on("click", "#placeorder", function() {
	var productid = $('input[name=cart]:checked').attr('id');
	var qty_id = "#qty_"+$('input[name=cart]:checked').attr('id');
	var amt_id = "#amt_"+$('input[name=cart]:checked').attr('id');
	var price =$('#td_1').html();
	var quantity = $(qty_id).text();
	var totalamount =  $(amt_id).text();
	var userid = $('#hidid').val();
	$.ajax({
		url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=orders',
		type: 'POST',
		data : {
			userid :userid,productid:productid,quantity:quantity,shippingid:"1",totalamount:totalamount
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
	$('#divhome').hide();
	$('#product_list').hide();
	$('#my_carts').hide();
	$('#my_orders').show();
	var userid = $('#hidid').val(); 
	$.ajax({
		url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=myorders',
		type: 'POST',
		data : {
			userid:userid
		},
		success : function(responseText) {
			console.log(responseText);
			var obj = jQuery.parseJSON(responseText);
			//alert(obj.length);
			//alert(obj[0].data.length);
			//alert(obj[0].data[0].productname);
			var orderTable="<table width='100%'><tr class='tbl_header'><td>Order No</td><td>Product Name</td><td>Date</td><td>Quantity</td><td>Amount</td>";
			for(var i=0;i<obj[0].data.length;i++)
			{
				if(i%2 == 0)
				{
					orderTable = orderTable + "<tr class='tbl_even_row'><td>"+obj[0].data[i].orderid+"</td><td>"+obj[0].data[i].productname+"</td>" +
					"<td>"+obj[0].data[i].orderdate+"</td><td>"+obj[0].data[i].productquantity+"</td><td>"+obj[0].data[i].totalamount+"</td></tr>";
					}
				else
				{
					orderTable = orderTable + "<tr class='tbl_odd_row'><td>"+obj[0].data[i].orderid+"</td><td>"+obj[0].data[i].productname+"</td>" +
					"<td>"+obj[0].data[i].orderdate+"</td><td>"+obj[0].data[i].productquantity+"</td><td>"+obj[0].data[i].totalamount+"</td></tr>";
					}
				
				}
			orderTable = orderTable + "</table>";
			$('#my_orders').empty();
			$('#my_orders').append(orderTable);
								
		}
	});
});

$(document).on("click", "#td_mycarts", function() {
	$('#divcontent').hide();
	$('#divhome').hide();
	$('#product_list').hide();
	$('#my_orders').hide();
	$('#prdndesc').hide();
	$('#userdiv').hide();
	$('#mycartdata').show();
	
	
	var userid=$('#hidid').val();
	$.ajax({
		url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=mycarts',
		type: 'POST',
		data : {
			userid:userid,
		},
		success : function(responseText) {
			console.log(responseText);
			var obj = jQuery.parseJSON(responseText);
			//alert(obj.length);
			//alert(obj[0].data.length);
			//alert(obj[0].data[0].productname);
			var cartTable="<table width='100%' border='1'><tr class='tbl_header'><td colspan='5'>My Carts Info</td></tr><tr class='tbl_header'><td>Select</td><td>Product Name</td><td>Quantity</td><td>Amount</td><td>Remove Item</td></tr>";
			for(var i=0;i<obj[0].data.length;i++)
			{
				var qty_id = "qty_"+ obj[0].data[i].productid;
				var amt_id = "amt_"+ obj[0].data[i].productid;
				var rm_id = "rm_"+ obj[0].data[i].cartid;
				if(i%2 == 0)
				{
					cartTable = cartTable + "<tr class='tbl_even_row'><td><input name='cart' type ='radio' id="+obj[0].data[i].productid+" /></td><td>"+obj[0].data[i].productname+"</td>" +
					"<td id="+qty_id+">"+obj[0].data[i].quantity+"</td><td id="+amt_id+">"+obj[0].data[i].amount+"</td><td id="+rm_id+" onclick='delete_cartitem(this.id)'>Remove</td>" +
					"</tr>";
					}
				else
				{
					cartTable = cartTable + "<tr class='tbl_odd_row'><td><input name='cart' type ='radio' id="+obj[0].data[i].productid+" /></td><td>"+obj[0].data[i].productname+"</td>" +
					"<td id="+qty_id+">"+obj[0].data[i].quantity+"</td><td id="+amt_id+">"+obj[0].data[i].amount+"</td><td id="+rm_id+" onclick='delete_cartitem(this.id)'>Remove</td>" +
					"</tr>";
					}
				
				}
			cartTable = cartTable + "<tr><td colspan='5' align='center'><input type='button' id='placeorder' value='Place Order' ><input type='button' id='btn_backcart' value='Back' ></td></tr></table>";
			$('#mycartdata').empty();
			$('#mycartdata').append(cartTable);
								
		}
	});
});


$(document).on("click", "#btnSave", function() {
	var pwd = $('#txtPwd').val();
	var cfrmpwd = $('#txtCfrmPwd').val();
	var userid = $('#hidid').val();
	$.ajax({
		url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=changepwd',
		type: 'POST',
		data : {
			userid : userid,pwd:pwd
		},
		success : function(responseText) {
			var obj = jQuery.parseJSON(responseText);
			
			if(obj[0].success == "success"){
				alert("Password Changed Successfully");
				$('#txtPwd').val("");
				$('#txtCfrmPwd').val("");
				$('#divcontent').hide();
				$('#userdiv').show();
				$('#changepwd').hide();
				}
				else{alert("try again");}
					
		}
	});
});

$(document).on("click", "#td_products", function() {
	loadProducts();
});
$(document).on("click","#username",function(){
	$('#divcontent').hide();
	$('#userdiv').show();
	$('#changepwd').hide();
	$('#mycartdata').hide();
})
$(document).on("click","#btnBack",function(){
	$('#divcontent').show();
	$('#userdiv').hide();
	$('#changepwd').hide();
	$('#mycartdata').hide();
})
$(document).on("click","#btnChngPwd",function(){
	$('#divcontent').hide();
	$('#userdiv').hide();
	$('#changepwd').show();
	$('#mycartdata').hide();
})

$(document).on("click","#btnUser",function(){
	$('#divcontent').hide();
	$('#userdiv').show();
	$('#changepwd').hide();
	$('#mycartdata').hide();
})
$(document).on("click","#td_home",function(){
	$('#divhome').show();
	$('#product_list').hide();
	$('#my_orders').hide();
})
$(document).on("click","#divlogout",function(){
	$('#hidid').val("");
	window.location.href = "http://localhost:8080/Ecommerce/userlogin.html";
})
$(document).on("click","#btn_backpd",function(){
	$('#divcontent').show();
	$('#userdiv').hide();
	$('#changepwd').hide();
	$('#prdndesc').hide();
})
$(document).on("click","#btn_backcart",function(){
	$('#divcontent').show();
	$('#userdiv').hide();
	$('#changepwd').hide();
	$('#prdndesc').hide();
	$('#mycartdata').hide();
	$('#product_list').show();
})

function loadProducts()
{
	$('#divhome').hide();
	$('#product_list').show();
	$('#my_carts').hide();
	$('#my_orders').hide();
	$('#prdndesc').hide();
	$('#mycartdata').hide();
	$.ajax({
		url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=show_products',
		type: 'POST',
		data : {
			
		},
		success : function(responseText) {
			console.log(responseText);
			var obj = jQuery.parseJSON(responseText);
			//alert(responseText);
			//alert(obj[0].data.length);
			//alert(obj[0].data[0].productname);
			var productTable="<table class='prdtable' width='100%'><tr class='tbl_header' style='height:30px;'><td>Select</td><td>Brand</td><td>Product Name</td><td> Price</td></tr>";
			for(var i=0;i<obj[0].data.length;i++)
			{
				var pr_id = "pr_"+obj[0].data[i].productid;
				var filename = "images/"+obj[0].data[i].filename;
				//alert(amt_id);
				//productTable = productTable + "<tr style='height:100px;'><td><input name='product' type ='radio' id="+obj[0].data[i].productid+" onclick='showproduct(this.id);'/></td><td>"+obj[0].data[i].brandname+"</td><td>"+obj[0].data[i].productname+"</td><td id="+pr_id+">"+obj[0].data[i].price+"</td>" +
				if(i%2 == 0)
				{
					productTable = productTable + "<tr class='tbl_even_row' style='height:100px;'><td><img id="+obj[0].data[i].productid+" src="+filename+" height='100' width='100' onclick='showproduct(this.id);'/></td><td>"+obj[0].data[i].brandname+"</td><td>"+obj[0].data[i].productname+"</td><td id="+pr_id+">"+obj[0].data[i].price+"</td>" +
					"</tr>";
					}
				else
				{
					productTable = productTable + "<tr class='tbl_odd_row' style='height:100px;'><td><img id="+obj[0].data[i].productid+" src="+filename+" height='100' width='100' onclick='showproduct(this.id);'/></td><td>"+obj[0].data[i].brandname+"</td><td>"+obj[0].data[i].productname+"</td><td id="+pr_id+">"+obj[0].data[i].price+"</td>" +
					"</tr>";
					}
				
				}
			productTable = productTable + "</table>";
			$('#product_list').empty();
			$('#product_list').append(productTable);
		}
	});
}
function showproduct(prdid)
{
	//alert(prdid);
	$('#divcontent').hide();
	$('#userdiv').hide();
	$('#changepwd').hide();
	$('#prdndesc').show();
	$.ajax({
		url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=show_productinfo',
		type: 'POST',
		data : {
			prodid:prdid,
		},
		success : function(responseText) {
			console.log(responseText);
			var obj = jQuery.parseJSON(responseText);
			//alert(responseText);
			//alert(obj[0].data.length);
			//alert(obj[0].data[0].productname);
			$('#showPrdName').text(obj[0].data[0].productname);
			$('#showBrand').text(obj[0].data[0].brandname);
			$('#showPrdPrice').text(obj[0].data[0].price);
			$('#hidPrdId').val("");
			$('#hidPrdId').val(obj[0].data[0].productid);
		}
	});
}
function showuserinfo()
{
	var searchParams = new URLSearchParams(window.location.search); //?anything=123
	var userid = searchParams.get("userid");
	$('#divcontent').show();
	$('#userdiv').hide();
	$('#changepwd').hide();
	$('#prdndesc').hide();
	$.ajax({
		url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=showuser',
		type: 'POST',
		data : {
			userid:userid,
		},
		success : function(responseText) {
			console.log(responseText);
			var obj = jQuery.parseJSON(responseText);
			//alert(obj.length);
			console.log(obj);
			//alert(obj[0].data[0].zipcode);
			if(obj[0].success[0].success == "success"){
				$('#username').text('Welcome '+obj[0].data[0].firstname);
				var usertable="<table border='1' width='100%'><tr><td colspan='4'>User Info</td></tr>";
				usertable = usertable + "<tr><td>Firstname</td><td>"+obj[0].data[0].firstname+"</td><td>Lastname</td><td>"+obj[0].data[0].lastname+"</td></tr>";
				usertable = usertable + "<tr><td>Email</td><td>"+obj[0].data[0].email+"</td><td>Mobile</td><td>"+obj[0].data[0].mobile+"</td></tr>";		
				usertable = usertable + "<tr><td>Address1</td><td>"+obj[0].data[0].address1+"</td><td>Address2</td><td>"+obj[0].data[0].address2+"</td></tr>";
				usertable = usertable + "<tr><td>City</td><td>"+obj[0].data[0].city+"</td><td>State</td><td>"+obj[0].data[0].state+"</td></tr>";
				usertable = usertable + "<tr><td>Country</td><td>"+obj[0].data[0].country+"</td><td>Zipcode</td><td>"+obj[0].data[0].zipcode+"</td></tr>";
								
				usertable = usertable + "<tr><td colspan='4' align='center'><input type='button' id='btnBack' value='Back' /><input type='button' id='btnChngPwd' value='Change Password' /></td></tr></table>";
				$('#userdiv').empty();
				$('#userdiv').append(usertable);
				$('#hidid').val(userid);
			}
			else{
				alert("Wrong Login Credientials");$('#txtEmail').val("");$('#txtPwd').val("");
			}
			
		}
	});
	}
function delete_cartitem(cartid)
{
	var cart_id = cartid.split("_");
	alert(cartid);alert(cart_id[1]);
	var userid=$('#hidid').val();
	$.ajax({
		url : 'http://localhost:8080/Ecommerce/Ecommerce?serviceId=deletecart',
		type: 'POST',
		data : {
			userid:userid,cartid:cart_id[1]
		},
		success : function(responseText) {
			console.log(responseText);
			var obj = jQuery.parseJSON(responseText);
			//alert(obj.length);
			//alert(obj[0].data.length);
			//alert(obj[0].data[0].productname);
			var cartTable="<table border='1'><tr><td>Select</td><td>Product Name</td><td>Quantity</td><td>Amount</td><td>Remove Item</td></tr>";
			for(var i=0;i<obj[0].data.length;i++)
			{
				var qty_id = "qty_"+ obj[0].data[i].productid;
				var amt_id = "amt_"+ obj[0].data[i].productid;
				var rm_id = "rm_"+ obj[0].data[i].productid;
				cartTable = cartTable + "<tr><td><input name='cart' type ='radio' id="+obj[0].data[i].productid+" /></td><td>"+obj[0].data[i].productname+"</td>" +
						"<td id="+qty_id+">"+obj[0].data[i].quantity+"</td><td id="+amt_id+">"+obj[0].data[i].amount+"</td><td id="+rm_id+" onclick='delete_cartitem(this.id)'>Remove</td>" +
						"</tr>";
				}
			cartTable = cartTable + "<tr><td colspan='5' align='center'><input type='button' id='placeorder' value='Place Order' ><input type='button' id='btn_backcart' value='Back' ></td></tr></table>";
			$('#mycartdata').empty();
			$('#mycartdata').append(cartTable);
								
		}
	});
}
function showrow()
{
	$('.products').hide();
}


