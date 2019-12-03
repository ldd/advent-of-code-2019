day=$1
new_day_path=js/day${day}

# if necessary, make a new directory for the new day
# copy the template to start working on parts 1 & 2
mkdir -p ${new_day_path}/
cp ./day_template.js ${new_day_path}/index.js
