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

#$B8=:_;~9o$+$i8^J,8e$4$H$N;~4V$r(BdateTimeList,unixTimeList$B$K3JG<(B
for i in range(1,1000):
  unixTimeList.append(unixTimeList[i-1] + 300)
  dateTimeList.append(datetime.datetime.fromtimestamp(unixTimeList[i]))
 
#$B%@%_!<%G!<%?:n@.(B
for i in range(1000):
  deg = i % 180   
  rad = math.radians(deg)
  luxList.append(math.sin(rad) * 600 * random.uniform(0.8,1.2))

#csv$B=q$-9~$_MQ$N%j%9%H:n@.(B
for i in range(1000):
  tmp = []
  tmp.append(dateTimeList[i])
  tmp.append(unixTimeList[i])
  tmp.append(luxList[i])
  csvWriteData.append(tmp)


#csv$B=q$-9~$_(B
header = ['dateTime', 'unixTime', 'lux']
with open('sensorData.csv','w', encoding='UTF-8') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    writer.writerows(csvWriteData) 

