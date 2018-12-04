set arg1=%1
set NODE_ENV=bcr


start npm start
cd client
if %1%==react ( start npm start )
cd ..
