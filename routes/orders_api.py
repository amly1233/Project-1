from flask import Flask, redirect, request, render_template, session, url_for
from flask import jsonify
import json
import mysql.connector
from mysql.connector import Error

from flask import Blueprint
orders_api = Blueprint("orders_api", __name__, static_folder="static", template_folder="template")



# MySQL connect setting 
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="1qaz@WSX#EDC",
  database="user"
)

mycursor = mydb.cursor()


# Write orders info in
@orders_api.route("/api/orders", methods=['POST'])
def get_order():
    try:
        print ("ok1")
        request_data = request.get_json()
        print ("ok2")
        userId = session['id']
        userName = session['name']
        userEmail = session['email']
        bookingAttractionId = session['attractionId']
        bookingDate = session['date']
        bookingPrice = session['price']
        contactName = request_data['contactName']
        contactEmail = request_data['contactEmail']
        contactNumber =  request_data['contactNumber']
        print ("ok3")

        if not (contactName and contactEmail and contactNumber):
          return jsonify({ "error": True, "message": "聯絡資料不得為空" })

        else:
          print ("ok4")
          sql = "INSERT INTO booking_info (userId, userName, userEmail, bookingAttractionId, bookingDate, bookingPrice, contactName, contactEmail, contactNumber) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);"
          new_data = (userId, userName, userEmail, bookingAttractionId, bookingDate, bookingPrice, contactName, contactEmail, contactNumber)
          mycursor.execute(sql, new_data)
          print ("ok5")

          # 確認資料有存入資料庫
          mydb.commit()
          mycursor.close()

          # Delete ordered info session
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



