import time
import datetime
import random
import math
import csv

dateTimeList = []
unixTimeList = []
luxList = []
csvWriteData = []

unixTimeList.append(time.time())
dateTimeList.append(datetime.datetime.fromtimestamp(time.time()))

#現在時刻から五分後ごとの時間をdateTimeList,unixTimeListに格納
for i in range(1,1000):
  unixTimeList.append(unixTimeList[i-1] + 300)
  dateTimeList.append(datetime.datetime.fromtimestamp(unixTimeList[i]))
 
#ダミーデータ作成
for i in range(1000):
  deg = i % 180   
  rad = math.radians(deg)
  luxList.append(math.sin(rad) * 600 * random.uniform(0.8,1.2))

#csv書き込み用のリスト作成
for i in range(1000):
  tmp = []
  tmp.append(dateTimeList[i])
  tmp.append(unixTimeList[i])
  tmp.append(luxList[i])
  csvWriteData.append(tmp)


#csv書き込み
header = ['dateTime', 'unixTime', 'lux']
with open('sensorData.csv','w', encoding='UTF-8') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    writer.writerows(csvWriteData) 

