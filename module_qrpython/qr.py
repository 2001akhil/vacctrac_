# # #Author Akhil

# import cv2
# import mysql.connector
# import json
# import requests
# from pyzbar import pyzbar
# import pymongo

# #connection line start 
# # con=mysql.connector.connect(
# #     host='vacctrac.c8mgoa42axag.ap-south-1.rds.amazonaws.com',
# #     user= 'admin',
# #     password='vactrac2023',
# #     port=3306,
# #     database='vacctrac'
# # )
# # if con.is_connected():
# #   print("Database connected.")
# # else:
# #   print("Database not connected.")
# # cursor=con.cursor()
# # table_name="vaccine_details"
# #connection line end
# #file cerating session start
# # f=open("vaccine Details.json","a")
# #file creating session end
# #file creating session end

# # Initialize the video capture
# cap = cv2.VideoCapture(0)

# # QR code detection
# qr_detector = cv2.QRCodeDetector()

# while True:
#     # Take a frame from the video capture
#     ret, frame = cap.read()

#     # Convert in to  the grayscale
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

#     # Thresholding for easy to analyze the image 
#     _, thresh = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

#     # QR code detection
#     data, vertices, _ = qr_detector.detectAndDecode(thresh)

#     # Display fare
#     cv2.imshow('frame', frame)

#     # If QR code is detected, extract the data and display it on the screen
#     if data:
#         print(data)
#        # json_object(data)
#       #   x=mycol.insert_one(data)
#       #   print(x.inserted_id)
#         # f.write(data)
#         # f.close()
        

#         # f=open("vaccine Details.json","r")
#         # string=f.read()
#         # dictionary=json.loads(string)
#         # json.loads(open("vaccine Details.json","r").read())
#         #print(data)
#         # values=tuple(data.values())
#        # print(values)
#         # data_s = qr_codes[0].data.decode('utf-8')
#         url="http://localhost:1234/data"
#         datas={'data':data}
#         headers={'content-type':'application/json'}
    

#         response=requests.post(url,json=datas,headers=headers)
#         print(response.text)
#         cv2.waitKey(1000)
#         break
        
#         # sql="INSERT INTO vaccine_details VALUES (%s,%s,%s,%s,%s)"
#         # cursor.execute(sql,values)
#         # con.commit()
#         # print(cursor.rowcount,"Row inserted")
        
#       #   sql = "INSERT INTO vaccine_details (data) VALUES (%s)"
#       #   qr_code_data = data
#       #   val = (qr_code_data,)
#       #   cursor.execute(sql, val)
#       #   con.commit()
#       #   print(cursor.rowcount, "record inserted.")
#        # print(query)
#         #mycol.insert_one(dictionary)
        

#     # Press 'q' to exit the loop
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# # Release the video capture and destroy all windows
# cap.release()
# cv2.destroyAllWindows()

import cv2
from pyzbar import pyzbar
import requests

# Set up the camera capture
cap = cv2.VideoCapture(0)

while True:
    # Capture a frame from the camera
    ret, frame = cap.read()

    # Find and decode any QR codes in the frame
    qr_codes = pyzbar.decode(frame)

    # Send the decoded data to Node.js using HTTP
    if qr_codes:
        data = qr_codes[0].data.decode('utf-8')
        url = 'http://localhost:3001/vaccine'
        headers = {'Content-type': 'application/json'}
        payload = {'data': data} 
        #json_data=json.dumps(data)
        
        r = requests.post(url, json=payload, headers=headers)
        print(data)
        cv2.waitKey(2000)
        break
    # Display the frame on the screen
    cv2.imshow('QR Code Reader', frame)
        
    # Exit if the 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera and close the window
cap.release()
cv2.destroyAllWindows()