#!/bin/bash
nvidia-smi --query-gpu=utilization.gpu,utilization.memory,memory.total,memory.free,memory.used,power.draw,temperature.gpu,name --format=csv,noheader --id=0000:01:00 -l 15 >> ./logs/gpuStats.csv
