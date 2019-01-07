set arg1=%1
set NODE_ENV=dc1
set REACT_APP_SAP_CLIENT=120
cd ..
start npm start
cd client
if %1%==react ( start npm start )
cd ..
