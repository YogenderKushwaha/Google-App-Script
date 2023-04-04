#Importing Libraries
import gspread
import json
from google.auth import default
from gspread_dataframe import set_with_dataframe
import pandas as pd
import time
from google.oauth2.credentials import Credentials
from google.oauth2.service_account import Credentials as ServiceAccountCredentials


#Setting up Credentials with service account
credentials = {
    "type": "service_account",
    "project_id": "project-id-123456",
    "private_key_id": "sdgfsFDHG87321764HSG38b412f1d0e421a7d3b7",
    "private_key": "-----BEGIN PRIVATE KEY-----\nFEL2f\nGfP7q8CfUY0X2IzMlzzGpSZ4/U0u/=\n-----END PRIVATE KEY-----\n",
    "client_email": "tesaccount@test-python-123456.iam.gserviceaccount.com",
    "client_id": "1233247836428932147",
    "token_uri": "https://oauth2.googleapis.com/token"
}
gc = gspread.service_account_from_dict(credentials)


"""
#If you don't have service you account you can use this way - 
#Setting up Credentials

auth.authenticate_user()
creds, _= default() 
gc = gspread.authorize(creds) 
"""



#Function to Import data
def import_data(data_key,data_tab,data_range,target_key,target_tab):
  datasheet= gc.open_by_key(data_key).worksheet(data_tab)
  targetsheet = gc.open_by_key(target_key).worksheet(target_tab)
  rows = datasheet.get_all_values()
  df = pd.DataFrame.from_records(rows)
  df.columns = df.iloc[0]
  df=df.drop(df.index[0])
  df=df.iloc[ : ,data_range]
  set_with_dataframe(targetsheet,df)
  
  
#Sheet Name: sheet1
#Data 1
dk1='source-data-gsheet-key-jsadkjbbjdsabdbf'
dt1='source tab name'
dr1=list(range(0,51))
tk1='target-data-gsheet-key-jsadkjbbjdsabdbf'
tt1='target tab name'

#Data 2
dk2='source-data-gsheet-key-jsadkjbbjdsabdbf'
dt2='source tab name'
dr2=list(range(0,20))
tk2='target-data-gsheet-key-jsadkjbbjdsabdbf'
tt2='target tab name'



# Calling import_data function using for loop for all the data

start = time.time()
data_key = [dk1,dk2]
data_tab = [dt1,dt2]
data_range= [dr1,dr2]
target_key = [tk1,tk2]
target_tab = [tt1,tt2]

for i in range (0,len(data_key)):
  import_data(data_key[i],data_tab[i],data_range[i],target_key[i],target_tab[i])
end = time.time()
print("Execution time:",round(end - start,4), "Seconds")
