set arg1=%1
set NODE_ENV=scr
set REACT_APP_SAP_CLIENT=120

start npm start
cd client
if %1%==react ( start npm start )
cd ..
