#!/bin/bash

# Usage: ./scale_all.sh /path/to/images

DIR="$1"

if [ -z "$DIR" ]; then
  echo "Usage: $0 <directory>"
  exit 1
fi

extensions=("jpg" "jpeg" "png" "tiff")

for ext in "${extensions[@]}"; do
  for INPUT in "$DIR"/*."$ext"; do
    [ -e "$INPUT" ] || continue

    # Skip already created files
    if [[ "$INPUT" =~ _2200\. || "$INPUT" =~ _1600\. || "$INPUT" =~ _900\. ]]; then
      continue
    fi

    dirpath="$(dirname "$INPUT")"
    filename="$(basename "$INPUT" | sed 's/\.[^.]*$//')"

    for width in 2200 1600 900; do

      if [ "$width" -eq 900 ]; then
        # Portrait → 10:16
        target_w=900
        target_h=$((900 * 16 / 10))       # = 1440
      else
        # Landscape → 16:10
        target_w=$width
        target_h=$((width * 10 / 16))     # 2200→1375, 1600→1000
      fi

      OUTPUT="${dirpath}/${filename}_${width}.webp"

      if [ -f "$OUTPUT" ]; then
        echo "Skipping existing file: $OUTPUT"
        continue
      fi

      # Scale to fill (overshoot) then crop center
      ffmpeg -i "$INPUT" -vf \
        "scale=w=${target_w}:h=${target_h}:force_original_aspect_ratio=increase,\
crop=${target_w}:${target_h}" \
        -c:v libwebp -qscale 80 "$OUTPUT"

      echo "Created: $OUTPUT (${target_w}x${target_h})"
    done
  done
done

echo "Done!"
