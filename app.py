from flask import Flask, redirect, request, render_template, session, url_for
from flask import jsonify
import json
import mysql.connector
from mysql.connector import Error
# from flask_cors import CORS, cross_origin

from routes.attraction_api import attraction_api
from routes.user_api import user_api
from routes.booking_api import booking_api
from routes.orders_api import orders_api



app=Flask(
  __name__,
  static_folder="static",
  static_url_path="/"
) 

# Set the secret key for flask session
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

# CORS(app)
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# app.config['CORS HEADERS']='Content-Type'


app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True
app.config['JSON_SORT_KEYS'] = False
# to keep json list in order

# Connect to MySQL
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="1qaz@WSX#EDC",
  database="user"
)
mycursor=mydb.cursor()


# @app.route("/api/v1/users")
# def list_users():
#   return "user example"

# Pages
@app.route("/")
def index():
	return render_template("index.html")

# @cross_origin()

@app.route("/attraction/<id>")
def attraction(id):
	return render_template("attraction.html")
@app.route("/booking")
def booking():
	return render_template("booking.html")
@app.route("/thankyou")
def thankyou():
	return render_template("thankyou.html")




# Attractions APIs
app.register_blueprint(attraction_api)
# Users APIs
app.register_blueprint(user_api)
# Booking APIs
app.register_blueprint(booking_api)
# Orders APIs
app.register_blueprint(orders_api)



if __name__=="__main__":
  app.run(host="0.0.0.0", port=3000, debug=True)
