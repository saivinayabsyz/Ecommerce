package com.absyz.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.http.HttpServletRequest;

import com.absyz.core.DbConnection;

public class Carts {
	
	public static String add_to_cart(HttpServletRequest request)
	{
		Connection conn =null;
		PreparedStatement psInsert = null;
		ResultSet rsCartsMaxId = null;
		Statement stSelectMaxId = null;
		String strOutput="";
		String strQuery="";
		int intCartId = 0;
		try {
			conn = DbConnection.getConnection();
			strQuery = "Select max(cartid) cartid from carts";
			int intUserId = Integer.parseInt(request.getParameter("userid"));
			int intProductId = Integer.parseInt(request.getParameter("productid"));
			stSelectMaxId = conn.createStatement();
			rsCartsMaxId = stSelectMaxId.executeQuery(strQuery);
			if(rsCartsMaxId.next())
			{
				intCartId = rsCartsMaxId.getInt("cartid")+1;
			}
			else
			{
				intCartId = 100;
			}
			psInsert = conn.prepareStatement("Insert into carts(cartid,userid,productid)values(?,?,?)");
			psInsert.setInt(1, intCartId);
			psInsert.setInt(2, intUserId);
			psInsert.setInt(3, intProductId);
			psInsert.executeUpdate();
			strOutput = "success";
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			strOutput = "failure";
			e.printStackTrace();
		}
		System.out.println(strOutput);
		return strOutput;
	}
	
	public static String my_cart_list(HttpServletRequest request)
	{
		String strOutput="";
		int intUserId = Integer.parseInt(request.getParameter("userid"));
		Connection conn = null;
		Statement stSelectCarts = null;
		ResultSet rsSelectCarts = null;
		try {
			//String strQuery = "Select * from carts where userid = "+intUserId;
			String strQuery = "Select c.cartid,c.userid,c.productid,p.productname,p.price from carts c "
					+ "join products p on c.productid = p.productid where userid = "+intUserId;
			conn = DbConnection.getConnection();
			stSelectCarts = conn.createStatement();
			rsSelectCarts = stSelectCarts.executeQuery(strQuery);
			strOutput = Orders.convertResultSetToJson(rsSelectCarts);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return strOutput;
	}

}
