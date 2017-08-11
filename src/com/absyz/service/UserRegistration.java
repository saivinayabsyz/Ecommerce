package com.absyz.service;

import java.io.*;
import javax.servlet.http.*;

import com.absyz.core.DbConnection;

import java.sql.*;

public class UserRegistration {
	public static String user_reg(HttpServletRequest request)
	{
		Connection conn =null;
		PreparedStatement psInsert = null;
		ResultSet rsUserReg = null;
		Statement stSelectQuery = null;
		String strEmail = request.getParameter("email");
		String strQuery = "Select * from users where email = '"+strEmail+"'";
		System.out.println(strQuery);
		String strOutput="";
		try {
			conn = DbConnection.getConnection();
			stSelectQuery = conn.createStatement();
			rsUserReg = stSelectQuery.executeQuery(strQuery);
			if(!rsUserReg.next())
			{
				String strFname = request.getParameter("fname");
				String strlname = request.getParameter("lname");
				String strAddress1 = request.getParameter("address1");
				String strAddress2 = request.getParameter("address2");
				String strCity = request.getParameter("city");
				String strState = request.getParameter("state");
				String strCountry = request.getParameter("country");
				String strZipcode = request.getParameter("zipcde");
				String strMobile = request.getParameter("mobile");
				String strPassword = request.getParameter("password");
				String strUsername = request.getParameter("username");
				//String strDob = request.getParameter("dob");
				String strGender = request.getParameter("gender");
				psInsert = conn.prepareStatement("Insert into users(username,firstname,lastname,email,password,mobile,address1,address2,city,state,country,"
						+ "zipcode,gender,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
				psInsert.setString(1, strEmail);
				psInsert.setString(2, strFname);
				psInsert.setString(3, strlname);
				psInsert.setString(4, strEmail);
				psInsert.setString(5, strPassword);
				psInsert.setString(6, strMobile);
				psInsert.setString(7, strAddress1);
				psInsert.setString(8, strAddress2);
				psInsert.setString(9, strCity);
				psInsert.setString(10, strState);
				psInsert.setString(11, strCountry);
				psInsert.setString(12, strZipcode);
				psInsert.setString(13, strGender);
				psInsert.setString(14, "active");
				psInsert.executeUpdate();
				strOutput = "Record Inserted";
				
			}
			else
			{
				strOutput = "User Already Exists";
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			strOutput = "Record Not Inserted";
			e.printStackTrace();
		}
		System.out.println(strOutput);
		return strOutput;
	}
	
	public static String add_shipping_address(HttpServletRequest request)
	{
		Connection conn =null;
		PreparedStatement psInsert = null;
		ResultSet rsShipping = null;
		Statement stSelectQuery = null;
		String strEmail = request.getParameter("email");
		String strQuery = "Select max(shippingid) shippingid from shipping_address";
		System.out.println(strQuery);
		String strOutput="";
		int intShippingId =0;
		try {
			conn = DbConnection.getConnection();
			stSelectQuery = conn.createStatement();
			rsShipping = stSelectQuery.executeQuery(strQuery);
			if(rsShipping.next())
			{
				intShippingId = rsShipping.getInt("shippingid") + 1;
				int intUserId = Integer.parseInt(request.getParameter("userid"));
				String strAddress1 = request.getParameter("address1");
				String strAddress2 = request.getParameter("address2");
				String strCity = request.getParameter("city");
				String strState = request.getParameter("state");
				String strCountry = request.getParameter("country");
				String strZipcode = request.getParameter("zipcode");
				psInsert = conn.prepareStatement("Insert into shipping_address(shippingid,userid,address1,address2,city,state,country,"
						+ "zipcode) values(?,?,?,?,?,?,?,?)");
				psInsert.setInt(1, intShippingId);
				psInsert.setInt(2, intUserId);
				psInsert.setString(3, strAddress1);
				psInsert.setString(4, strAddress2);
				psInsert.setString(5, strCity);
				psInsert.setString(6, strState);
				psInsert.setString(7, strCountry);
				psInsert.setString(8, strZipcode);
				psInsert.executeUpdate();
				strOutput = "Record Inserted";
				
			}
			else
			{
				strOutput = "User Already Exists";
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			strOutput = "Record Not Inserted";
			e.printStackTrace();
		}
		System.out.println(strOutput);
		return strOutput;
	}
	
	
	

}
