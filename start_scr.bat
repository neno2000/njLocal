set arg1=%1
set NODE_ENV=scr

start npm start
cd client
if %1%==react ( start npm start )
cd ..