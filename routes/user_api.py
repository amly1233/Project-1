from flask import Flask, redirect, request, render_template, session, url_for
from flask import jsonify
import json
import mysql.connector
from mysql.connector import Error

from flask import Blueprint
user_api = Blueprint("user_api", __name__, static_folder="static", template_folder="template")



# MySQL connect setting 
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="1qaz@WSX#EDC",
  database="user"
)

mycursor = mydb.cursor()

# Part 4-1 開發會員系統 API
# Get user info 
@user_api.route("/api/user", methods=['GET'])
def get_user():
    try:
        if 'email' in session: 
    
            userid = session['id']
            name = session['name']
            email = session['email']

            user = {
                "data": {
                    "id":userid,
                    "name":name,
                    "email":email
                }
            }
            return jsonify(user),200
        
        else:
            nouser = {"data": None}
            return jsonify(nouser),200
            
    except:
        errormessage = {
            "error" : True,
            "message" : "伺服器錯誤"
        }
        return jsonify(errormessage),500




# Sign up 
@user_api.route("/api/user", methods=["POST"])
def signup():
    try:
        request_data = request.get_json()

        name = request_data['name']
        email = request_data['email']
        password = request_data['password']

        if not (name and email and password):
            return jsonify({ "error": True, "message": "資料不得為空" })

        sql = "SELECT EXISTS(SELECT email FROM user_account WHERE email = %s);"
        checkemail = (email, )
        mycursor.execute(sql, checkemail)
        result = mycursor.fetchone()

        if result[0]==0:
            sql = "INSERT INTO user_account (name, email, password) VALUES (%s, %s, %s);"
            new_data = (name, email, password)
            mycursor.execute(sql, new_data)

            # 確認資料有存入資料庫
            mydb.commit()
            mycursor.close()

            return jsonify({"ok":True,})

        elif result[0]==1:
            return jsonify({"error":True,"message":" Email 已經被註冊"})
        
        else:
            errormessage = {
                "error" : True,
                "message" : " ERROR "
            }
            return jsonify(errormessage)


    except:
        errormessage = {
            "error" : True,
            "message" : "伺服器錯誤"
        }
        return jsonify(errormessage)





# Sign in 
@user_api.route("/api/user", methods=['PATCH'])
def signin():
    try:
    
        login_data = request.get_json()

        email = login_data['signinEmail']
        password = login_data['signinPassword']

        if not (email and password):
            return jsonify({ "error": True, "message": "登入失敗，帳號、密碼不得為空" })

        mycursor = mydb.cursor()
        # Check if account exists using MySQL
        sql = "SELECT * FROM user_account WHERE email = %s AND password = %s"
        logininfo = (email, password)
        mycursor.execute(sql, logininfo)
        account = mycursor.fetchone()

        mycursor.close()

        # If account exists in accounts table in our database
        if account:
            session['id'] = account[0]
            session['name'] = account[1]
            session['email'] = account[2]
            session['password'] = account[3]

            return jsonify({ "ok": True })

        else:
            errormessage = {
                "error" : True,
                "message" : "帳號或密碼錯誤"
            }
        return jsonify(errormessage)

        
    except:
        errormessage = {
            "error" : True,
            "message" : "ERROR"
        }
        return jsonify(errormessage)








# Sign out 
@user_api.route("/api/user", methods=["DELETE"])
def signout():
    try:
        session.pop('id', None)
        session.pop('name', None)
        session.pop('email', None)
        session.pop('password', None)

        # Delete ALL session
        session.pop('attractionId', None)
        session.pop('date', None)
        session.pop('time', None)
        session.pop('price', None)

        return jsonify({"ok":True})
    except:
        return jsonify({
            "error": True, 
            "message": "伺服器錯誤"})




