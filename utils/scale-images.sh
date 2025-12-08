#!/bin/bash

# Usage: ./scale_all.sh /path/to/images

DIR="$1"

if [ -z "$DIR" ]; then
  echo "Usage: $0 <directory>"
  exit 1
fi

# Only treat these as input formats (no webp!)
extensions=("jpg" "jpeg" "png" "tiff")

for ext in "${extensions[@]}"; do
  for INPUT in "$DIR"/*."$ext"; do
    [ -e "$INPUT" ] || continue

    # Skip files that were already generated (contain _2200, _1600, _900)
    if [[ "$INPUT" =~ _2200\. || "$INPUT" =~ _1600\. || "$INPUT" =~ _900\. ]]; then
      continue
    fi

    dirpath="$(dirname "$INPUT")"
    filename="$(basename "$INPUT" | sed 's/\.[^.]*$//')"

    for width in 2200 1600 900; do

      if [ "$width" -eq 900 ]; then
        # Portrait — aspect ratio 10:16
        height=$(( width * 16 / 10 ))
      else
        # Landscape — aspect ratio 16:10
        height=$(( width * 10 / 16 ))
      fi

      OUTPUT="${dirpath}/${filename}_${width}.webp"

      if [ -f "$OUTPUT" ]; then
        echo "Skipping existing file: $OUTPUT"
        continue
      fi

      ffmpeg -i "$INPUT" -vf "scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2" \
        -c:v libwebp -qscale 80 "$OUTPUT"

      echo "Created: $OUTPUT (${width}x${height})"
    done

  done
done

echo "Done!"
