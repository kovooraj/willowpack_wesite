#!/bin/sh
# Make a seamless loop: the clip's last second crossfades into its first second.
# Output starts at 1s into the source and ends on frame 1s, so the end meets the start.
# usage: scripts/make-loop.sh in.mp4 out.mp4 [poster.jpg]
set -e
IN="$1"; OUT="$2"; POSTER="$3"
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
OFF=$(awk -v d="$D" 'BEGIN { printf "%.3f", d - 2 }')
ffmpeg -y -v error -i "$IN" -filter_complex \
  "[0:v]split[a][b];[a]trim=start=1,setpts=PTS-STARTPTS[main];[b]trim=0:1,setpts=PTS-STARTPTS[head];[main][head]xfade=transition=fade:duration=1:offset=${OFF},scale=1600:-2,format=yuv420p[v]" \
  -map "[v]" -an -c:v libx264 -preset slow -crf 24 -movflags +faststart "$OUT"
[ -n "$POSTER" ] && ffmpeg -y -v error -i "$OUT" -frames:v 1 -q:v 3 "$POSTER"
echo "loop: $OUT ($(du -h "$OUT" | cut -f1))"
