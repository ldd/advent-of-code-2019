day=$1
new_day_path=js/day${day}

# if necessary, make a new directory for the new day
# copy the template to start working on parts 1 & 2
mkdir -p ${new_day_path}/
cp ./day_template.js ${new_day_path}/index.js

# download the input if it doesn't exist yet
input_file=input/day${day}.txt
if [ ! -f ${input_file} ]; then
  source .env
  curl "https://adventofcode.com/2019/day/${day}/input" -H "cookie: session=${ADVENT_SESSION}" -o ${input_file}
fi