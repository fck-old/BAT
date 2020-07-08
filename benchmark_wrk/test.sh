threads=$1
duration=$2
url=$3
rm -r results/results_$1_$2
mkdir results/results_$1_$2
echo run test 1 Connections 10 ...
./wrk -t$1 -c10 -d$2s -s login_skip_logout.lua $url >> results/results_$1_$2/10connection.txt
echo finish test 1 
echo run test 2 Connections 100 ...
./wrk -t$1 -c100 -d$2s -s login_skip_logout.lua $url >> results/results_$1_$2/100connections.txt
echo finish test 2 
echo run test 3 Connections 200 ...
./wrk -t$1 -c200 -d$2s -s login_skip_logout.lua $url >> results/results_$1_$2/200connections.txt
echo finish test 3
echo run test 4 Connections 300 ... 
./wrk -t$1 -c300 -d$2s -s login_skip_logout.lua $url >> results/results_$1_$2/300connections.txt
echo finish test 4
echo run test 5 Connections 400 ... 
./wrk -t$1 -c400 -d$2s -s login_skip_logout.lua $url >> results/results_$1_$2/400connections.txt
echo finish test 5
echo run test 6 Connections 500 ... 
./wrk -t$1 -c500 -d$2s -s login_skip_logout.lua $url >> results/results_$1_$2/500connections.txt
echo finish test 6
