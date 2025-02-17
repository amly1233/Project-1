from flask import Flask, redirect, request, render_template, session, url_for
from flask import jsonify
import json
import mysql.connector
from mysql.connector import Error

from flask import Blueprint
attraction_api = Blueprint("attraction_api", __name__, static_folder="static", template_folder="template", url_prefix='')


# Connect to MySQL
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="1qaz@WSX#EDC",
  database="user"
)
mycursor=mydb.cursor()

# Part 1 - 2：開發旅遊景點 API
@attraction_api.route("/api/attractions")
def get_attractions():
	try:
		page = int(request.args.get("page"))
		keyword = request.args.get("keyword")


		if keyword==None:
			spotRangeStart = 1+(page-1)*12
			spotRangeEnd = page*12
			sql = "SELECT * FROM attractions WHERE id BETWEEN '%s' AND '%s';"
			val = (spotRangeStart, spotRangeEnd, )
			mycursor.execute(sql, val)
			spotResult = mycursor.fetchall()

			spotLists12 = []
			for i in range(len(spotResult)):
				id = spotResult[i][0]
				name = spotResult[i][1]
				category = spotResult[i][2]
				description = spotResult[i][3]
				address = spotResult[i][4]
				transport = spotResult[i][5]
				mrt = spotResult[i][6]
				latitude = spotResult[i][7]
				longitude = spotResult[i][8]
				images = spotResult[i][9]
				spotLists = {
					"id":id, 
					"name":name, 
					"category":category, 
					"description":description, 
					"address":address, 
					"transport":transport, 
					"mrt":mrt, 
					"latitude":latitude, 
					"longitude":longitude, 
					"images":images
					}
				spotLists12.append(spotLists)


				if page < 27:
					nextPage = page+1
				else:
					nextPage = None

			

		elif keyword != None:

			sql = "SELECT * FROM attractions WHERE (name LIKE %s OR category LIKE %s OR description LIKE %s OR address LIKE %s OR mrt LIKE %s) LIMIT %s, 13 ;"
			
			keyword = "%"+keyword+"%"
			offset = page *12
			val = (keyword, keyword, keyword, keyword, keyword, offset) 
			mycursor.execute(sql,val)
			spotResult = mycursor.fetchall()

			spotLists12 = []
			for i in range(len(spotResult)):
				id = spotResult[i][0]
				name = spotResult[i][1]
				category = spotResult[i][2]
				description = spotResult[i][3]
				address = spotResult[i][4]
				transport = spotResult[i][5]
				mrt = spotResult[i][6]
				latitude = spotResult[i][7]
				longitude = spotResult[i][8]
				images = spotResult[i][9]
				spotLists = {
					"id":id, 
					"name":name, 
					"category":category, 
					"description":description, 
					"address":address, 
					"transport":transport, 
					"mrt":mrt, 
					"latitude":latitude, 
					"longitude":longitude, 
					"images":images
					}
				spotLists12.append(spotLists)




			if len(spotResult)==13:
				nextPage = page+1
				spotLists12.pop()
			else:
				nextPage = None

		searchResult = {
			"nextPage":nextPage,
			"data":spotLists12
		}
		return jsonify(searchResult)

	except:
		errormsg = {
			"error": True,
			"message":"伺服器錯誤"
		}
		return jsonify(errormsg)


@attraction_api.route("/api/attraction/<attractionId>")
def get_attractionById(attractionId):
	try:
		sql = "SELECT * FROM attractions WHERE id = %s ;"
		val = (attractionId, )
		mycursor.execute (sql, val)
		attractionIDResult = mycursor.fetchone()

		id = attractionIDResult[0]
		name = attractionIDResult[1]
		category = attractionIDResult[2]
		description = attractionIDResult[3]
		address = attractionIDResult[4]
		transport = attractionIDResult[5]
		mrt = attractionIDResult[6]
		latitude = attractionIDResult[7]
		longitude = attractionIDResult[8]
		images = attractionIDResult[9]
		spotList = {
			"id":id, 
			"name":name, 
			"category":category, 
			"description":description, 
			"address":address, 
			"transport":transport, 
			"mrt":mrt, 
			"latitude":latitude, 
			"longitude":longitude, 
			"images":images
			}


		searchResult = {
			"data":spotList
		}
		return jsonify(searchResult)
	
	except:
		errormsg = {
			"error": True,
			"message":"網頁伺服器錯誤"
		}
		return jsonify(errormsg)

