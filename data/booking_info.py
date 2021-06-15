import mysql.connector

# Connect to MySQL
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="1qaz@WSX#EDC",
  database="user"
)
mycursor = mydb.cursor()


# Create another table for booking list
sql = '''CREATE TABLE booking_info (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    userEmail VARCHAR(255) NOT NULL,
    bookingAttractionId INT NOT NULL,
    bookingDate DATE NOT NULL,
    bookingPrice INT NOT NULL,
    contactName VARCHAR(255) NOT NULL,
    contactEmail VARCHAR(255) NOT NULL,
    contactNumber INT NOT NULL
    );'''


mycursor.execute(sql) 

mycursor.close()