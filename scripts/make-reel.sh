#!/bin/sh
# Build a seamless looping reel from several clips.
# Each clip is trimmed to SEG seconds starting at START, scaled to 1600x900 @30fps, and
# crossfaded (FADE seconds) into the next. The first clip is appended again at the end and the
# output is cut so its last frame equals its first frame: the reel loops with no visible seam.
# usage: scripts/make-reel.sh out.mp4 poster.jpg clip1.mp4 clip2.mp4 ...
# The legend in components/HeroReel.tsx assumes SEG=3 and FADE=0.6.
set -e
OUT="$1"; POSTER="$2"; shift 2
SEG=${SEG:-3}; FADE=${FADE:-0.6}; START=${START:-1}
N=$#
ARGS=""; i=0
for c in "$@" "$1"; do ARGS="$ARGS -i $c"; i=$((i+1)); done
F=""
k=0
for c in "$@" "$1"; do
  F="$F[$k:v]trim=start=$START:duration=$SEG,setpts=PTS-STARTPTS,scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900,fps=30,format=yuv420p,setsar=1[c$k];"
  k=$((k+1))
done
prev="c0"; k=1
while [ $k -le $N ]; do
  off=$(awk -v k=$k -v s=$SEG -v f=$FADE 'BEGIN{printf "%.3f", k*(s-f)}')
  F="$F[$prev][c$k]xfade=transition=fade:duration=$FADE:offset=$off[x$k];"
  prev="x$k"; k=$((k+1))
done
END=$(awk -v n=$N -v s=$SEG -v f=$FADE 'BEGIN{printf "%.3f", n*(s-f)+f}')
F="$F[$prev]trim=start=$FADE:end=$END,setpts=PTS-STARTPTS[v]"
ffmpeg -y -v error $ARGS -filter_complex "$F" -map "[v]" -an -c:v libx264 -preset slow -crf 25 -movflags +faststart "$OUT"
ffmpeg -y -v error -i "$OUT" -frames:v 1 -q:v 3 "$POSTER"
echo "reel: $OUT $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT")s $(du -h "$OUT" | cut -f1)"
