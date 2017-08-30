package com.absyz.core;

import java.io.*;
import java.sql.Connection;

import javax.servlet.*;
import javax.servlet.http.*;

import com.absyz.service.Carts;
import com.absyz.service.LoginService;
import com.absyz.service.Orders;
import com.absyz.service.Products;
import com.absyz.service.UserRegistration;

// Extend HttpServlet class
public class EcommerceServlet extends HttpServlet {
 
   private String message;

   public void init() throws ServletException {
      // Do required initialization
      message = "Hello World";
   }

   public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
	   if (request.getParameter("serviceId").equals("userreg"))
	   {
		   String strOutput = UserRegistration.user_reg(request);
		      // Set response content type
		      response.setContentType("text/html");

		      // Actual logic goes here.
		      PrintWriter out = response.getWriter();
		      out.println("<h1>" + strOutput + "</h1>");
	   }
	   if (request.getParameter("serviceId").equals("login"))
	   {
		   String strOutput = LoginService.userLogin(request);
		   	      
		      response.setContentType("text/html");
				response.setHeader("Cache-Control", "no-cache");
				response.getOutputStream().write(new String(strOutput.getBytes("UTF-8")).getBytes());
	   }
	   if (request.getParameter("serviceId").equals("addproduct"))
	   {
		   String strOutput =Products.add_products(request);
		      // Set response content type
		      response.setContentType("text/html");

		      // Actual logic goes here.
		      PrintWriter out = response.getWriter();
		      out.println("<h1>" + strOutput + "</h1>");
	   }
	   if (request.getParameter("serviceId").equals("addtocart"))
	   {
		   String strOutput =Carts.add_to_cart(request);
		   response.setContentType("text/html");
			response.setHeader("Cache-Control", "no-cache");
			response.getOutputStream().write(new String(strOutput.getBytes("UTF-8")).getBytes());
	   }
	   if (request.getParameter("serviceId").equals("orders"))
	   {
		   String strOutput =Orders.new_order(request);
		      // Set response content type
		      response.setContentType("text/html");

		      // Actual logic goes here.
		      PrintWriter out = response.getWriter();
		      out.println("<h1>" + strOutput + "</h1>");
	   }
	   if (request.getParameter("serviceId").equals("shipping"))
	   {
		   String strOutput =UserRegistration.add_shipping_address(request);
		      // Set response content type
		      response.setContentType("text/html");

		      // Actual logic goes here.
		      PrintWriter out = response.getWriter();
		      out.println("<h1>" + strOutput + "</h1>");
	   }
	   if (request.getParameter("serviceId").equals("myorder"))
	   {
		   String strOutput =Orders.my_order_list(request);
		      // Set response content type
		      response.setContentType("text/html");

		      // Actual logic goes here.
		      PrintWriter out = response.getWriter();
		      out.println("<h1>" + strOutput + "</h1>");
	   }
	   if (request.getParameter("serviceId").equals("show_products"))
	   {
		   String strOutput = Products.show_products(request);
		   response.setContentType("text/html");
		   response.setHeader("Cache-Control", "no-cache");
		   response.getOutputStream().write(new String(strOutput.getBytes("UTF-8")).getBytes());
	   }
	   
   }
   
   public void doPost(HttpServletRequest request, HttpServletResponse response)
		      throws ServletException, IOException {
	   if (request.getParameter("serviceId").equals("userreg"))
	   {
		   String strOutput = UserRegistration.user_reg(request);
		   response.setContentType("text/html");
			response.setHeader("Cache-Control", "no-cache");
			response.getOutputStream().write(new String(strOutput.getBytes("UTF-8")).getBytes());
	   }
	   if (request.getParameter("serviceId").equals("login"))
	   {
		   String strOutput = LoginService.userLogin(request);
		   	      
		      response.setContentType("text/html");
				response.setHeader("Cache-Control", "no-cache");
				response.getOutputStream().write(new String(strOutput.getBytes("UTF-8")).getBytes());
	   }
	   if (request.getParameter("serviceId").equals("addproduct"))
	   {
		   String strOutput =Products.add_products(request);
		   response.setContentType("text/html");
			response.setHeader("Cache-Control", "no-cache");
			response.getOutputStream().write(new String(strOutput.getBytes("UTF-8")).getBytes());
	   }
	   if (request.getParameter("serviceId").equals("addtocart"))
	   {
		   String strOutput =Carts.add_to_cart(request);
		   response.setContentType("text/html");
			response.setHeader("Cache-Control", "no-cache");
			response.getOutputStream().write(new String(strOutput.getBytes("UTF-8")).getBytes());
	   }
	   if (request.getParameter("serviceId").equals("orders"))
	   {
		   String strOutput =Orders.new_order(request);
		   response.setContentType("text/html");
			response.setHeader("Cache-Control", "no-cache");
			response.getOutputStream().write(new String(strOutput.getBytes("UTF-8")).getBytes());
	   }
	   if (request.getParameter("serviceId").equals("shipping"))
	   {
		   String strOutput =UserRegistration.add_shipping_address(request);
		      // Set response content type
		      response.setContentType("text/html");

		      // Actual logic goes here.
		      PrintWriter out = response.getWriter();
		      out.println("<h1>" + strOutput + "</h1>");
	   }
	   if (request.getParameter("serviceId").equals("myorders"))
	   {
		   String strOutput =Orders.my_order_list(request);
		   response.setContentType("text/html");
		   response.setHeader("Cache-Control", "no-cache");
		   response.getOutputStream().write(new String(strOutput.getBytes("UTF-8")).getBytes());
	   }
	   if (request.getParameter("serviceId").equals("show_products"))
	   {
		   String strOutput = Products.show_products(request);
		   response.setContentType("text/html");
		   response.setHeader("Cache-Control", "no-cache");
		   response.getOutputStream().write(new String(strOutput.getBytes("UTF-8")).getBytes());
	   }
	   if (request.getParameter("serviceId").equals("mycarts"))
	   {
		   String strOutput =Carts.my_cart_list(request);
		   response.setContentType("text/html");
		   response.setHeader("Cache-Control", "no-cache");
		   response.getOutputStream().write(new String(strOutput.getBytes("UTF-8")).getBytes());
	   }
		      
}

   public void destroy() {
      // do nothing.
   }
}
