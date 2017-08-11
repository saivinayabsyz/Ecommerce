package com.absyz.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;

import javax.servlet.http.HttpServletRequest;

import com.absyz.core.DbConnection;

public class Orders {
	
	public static String new_order(HttpServletRequest request)
	{
		Connection conn =null;
		PreparedStatement psInsert = null;
		ResultSet rsOrderMaxId = null;
		Statement stSelectMaxId = null;
		String strOutput="";
		String strQuery="";
		int intOrderId = 0;
		try {
			Timestamp timestamp = new Timestamp(System.currentTimeMillis());
			conn = DbConnection.getConnection();
			strQuery = "Select max(orderid) orderid from orders";
			int intUserId = Integer.parseInt(request.getParameter("userid"));
			int intProductId = Integer.parseInt(request.getParameter("productid"));
			int intQuantity = Integer.parseInt(request.getParameter("quantity"));
			double dblAmount = Double.parseDouble(request.getParameter("totalamount"));
			int intShippingId = Integer.parseInt(request.getParameter("shippingid"));
			stSelectMaxId = conn.createStatement();
			rsOrderMaxId = stSelectMaxId.executeQuery(strQuery);
			if(rsOrderMaxId.next())
			{
				intOrderId = rsOrderMaxId.getInt("orderid")+1;
			}
			else
			{
				intOrderId = 100;
			}
			psInsert = conn.prepareStatement("Insert into orders(orderid,userid,productid,shippingid,productquantity,totalamount,orderdate)values(?,?,?,?,?,?,?)");
			psInsert.setInt(1, intOrderId);
			psInsert.setInt(2, intUserId);
			psInsert.setInt(3, intProductId);
			psInsert.setInt(4, intShippingId);
			psInsert.setInt(5, intQuantity);
			psInsert.setDouble(6, intProductId);
			psInsert.setTimestamp(7, timestamp);
			
			psInsert.executeUpdate();
			strOutput = "Record Inserted";
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			strOutput = "Record Not Inserted";
			e.printStackTrace();
		}
		System.out.println(strOutput);
		return strOutput;
	}
	
	public static String my_order_list(HttpServletRequest request)
	{
		String strOutput="";
		int intUserId = Integer.parseInt(request.getParameter("userid"));
		Connection conn = null;
		Statement stSelectOrders = null;
		
		return strOutput;
	}
}
