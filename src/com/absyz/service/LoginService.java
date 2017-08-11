package com.absyz.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.http.HttpServletRequest;

import com.absyz.core.DbConnection;

public class LoginService {
	
	public static String userLogin(HttpServletRequest request)
	{
		String strOutput="";
		Connection conn =null;
		ResultSet rsLogin = null;
		Statement stSelectQuery = null;
		String strEmail = request.getParameter("email");
		String strPassword = request.getParameter("password");
		String strQuery = "Select * from users where email = '"+strEmail+"' and password = '"+strPassword+"'";
		System.out.println(strQuery);
		try {
			conn = DbConnection.getConnection();
			stSelectQuery = conn.createStatement();
			rsLogin = stSelectQuery.executeQuery(strQuery);
			if(rsLogin.next())
			{
				strOutput = "success";
				
			}
			else
			{
				strOutput = "failure";
			}
		}
			 catch (SQLException e) {
					// TODO Auto-generated catch block
					strOutput = "Data Connection Lost. Please Try again after sometime";
					e.printStackTrace();
				}
				System.out.println(strOutput);
			
		return strOutput;
	}

}
