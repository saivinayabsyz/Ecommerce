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
			strOutput = "Record Inserted";
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			strOutput = "Record Not Inserted";
			e.printStackTrace();
		}
		System.out.println(strOutput);
		return strOutput;
	}

}
