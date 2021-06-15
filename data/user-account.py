import mysql.connector

# Connect to MySQL
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="1qaz@WSX#EDC",
  database="user"
)
mycursor = mydb.cursor()

# Create a new table for user account
sql = '''CREATE TABLE user_account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
    );'''

mycursor.execute(sql) 

mycursor.close()