set arg1=%1
set NODE_ENV=acr
set REACT_APP_SAP_CLIENT=100

start npm start
cd client
if %1%==react ( start npm start )
cd ..
