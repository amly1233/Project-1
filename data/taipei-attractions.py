import mysql.connector
from mysql.connector import Error
import json
# JSON 格式讀取


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="1qaz@WSX#EDC",
  database="user"
)

mycursor = mydb.cursor()

sql = '''CREATE TABLE attractions (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    category VARCHAR(255),
    description TEXT,
    address TEXT,
    transport TEXT,
    mrt VARCHAR(255),
    latitude VARCHAR(55),
    longitude VARCHAR(55),
    images TEXT
    );'''

mycursor.execute(sql)

with open("taipei-attractions.json", mode="r", encoding="utf-8") as file:
    data=json.load(file)
    spotList=data["result"]["results"]


for spot in spotList:
    id = spot["_id"]
    name = spot["stitle"]
    category = spot["CAT2"]
    description = spot["xbody"]
    address = spot["address"]
    transport = spot["info"]
    mrt = spot["MRT"]
    latitude = spot["latitude"]
    longitude = spot["longitude"]

    # imgs list
    cntimg = spot["file"].count("http")

    images=[]
    for y in range(cntimg+1):
        imgList = spot["file"].split("http", cntimg+1)
        if imgList[y][-3:].lower()=="jpg" or imgList[y][-3:].lower()=="png":
            images.append("http"+imgList[y])
    img_str=str(images)


    sql = '''INSERT INTO attractions (id, name, category, description, address, transport, mrt, latitude, longitude, images) 
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''
    val = (id, name, category, description, address, transport, mrt, latitude, longitude, img_str)
    mycursor.execute(sql, val)
    mydb.commit()



