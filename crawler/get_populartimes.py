import populartimes
import sys
import json

api_key = sys.argv[1]
types = sys.argv[2].split('|')
p1 = sys.argv[3].split(',')
p1_f = [float(p1[0]), float(p1[1])]
p1_t = tuple(p1_f)
p2 = sys.argv[4].split(',')
p2_f = [float(p2[0]), float(p2[1])]
p2_t = tuple(p2_f)
n_threads = int(sys.argv[5])
radius = int(sys.argv[6])
all_places = bool(sys.argv[7])
# data = populartimes.get(api_key, types, p1_t, p2_t, n_threads, radius, all_places);
data = populartimes.get(api_key, types, p1_t, p2_t);
print(json.dumps(data))
# print(types)