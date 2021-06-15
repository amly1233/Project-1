import re
from flask import Flask, redirect, request, render_template, session, url_for
from flask import jsonify
import json
import mysql.connector
from mysql.connector import Error
import ast

from flask import Blueprint
booking_api = Blueprint("booking_api", __name__, static_folder="static", template_folder="template")


# MySQL connect setting 
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="1qaz@WSX#EDC",
  database="user"
)

mycursor = mydb.cursor()

# Part 5 - 1：預定行程 API

# Book a schedule
@booking_api.route("/api/booking", methods=['POST'])
def booking():
    print (session)
    try:
        # Check user status
        if 'email' in session: 
            request_data = request.get_json()   #調整格式
            # print (request_data)
            attractionId = request_data['attractionId']
            date = request_data['date']
            time = request_data['time']
            price = request_data['price']

            if date=='':
                return jsonify({
                    "error": True,
                    "message": "請選取日期"})
            else: 
                # booking confirmed, put booking info in session
                session['attractionId'] = attractionId 
                session['date'] = date
                session['time'] = time
                session['price'] = price
                # print (session)
                return jsonify({"ok": True})
                
        elif 'email' not in session: 
            not_signin = {
                "error": True,
                "message": "使用者未登入"
            }
            return jsonify(not_signin)

    except:
        errormessage = {
            "error" : True,
            "message" : "伺服器錯誤"
        }
        return jsonify(errormessage)
        





# GET booking info
@booking_api.route("/api/booking", methods=['GET'])
def get_booking():
    try:
        print (session)
        # Check user status
        if 'email' and 'attractionId' in session:
            sql = "SELECT * FROM attractions WHERE id = %s"
            val = (session['attractionId'], )
            mycursor.execute(sql, val)
            booking_result = mycursor.fetchone()

            display_img = ast.literal_eval(booking_result[9])
            # convert a string representation of a list

            booking_info = {
                "data": {
                    "attraction": {
                        "id": booking_result[0],
                        "name": booking_result[1],
                        "address": booking_result[4],
                        "image": display_img[0]
                    },
                    "date": session['date'],
                    "time": session['time'],
                    "price": session['price']
                }
            }
            # print (booking_info)

            return jsonify(booking_info)
      

        elif 'email' in session and 'attractionId' not in session:
            no_booking = {
                "error": True,
                "message": "無預定資料"
            }
            return jsonify(no_booking)

        elif 'email' not in session:
            not_signin = {
                "error": True,
                "message": "尚未登入"
            }
            return jsonify(not_signin)
        

    except:
        errormessage = {
            "error" : True,
            "message" : "伺服器錯誤"
        }
        return jsonify(errormessage),500










# DELETE a booking
@booking_api.route("/api/booking", methods=['DELETE'])
def delete_booking():
    try:
    # Check user status
        session.pop('attractionId', None)
        session.pop('date', None)
        session.pop('time', None)
        session.pop('price', None)

        return jsonify({"ok":True})

    except:
        errormessage = {
            "error" : True,
            "message" : "伺服器錯誤"
        }
        return jsonify(errormessage)




