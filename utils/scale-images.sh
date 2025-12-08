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

    # Skip files that were already generated (contain _2000, _1400, _800)
    if [[ "$INPUT" =~ _2000\. || "$INPUT" =~ _1400\. || "$INPUT" =~ _800\. ]]; then
      continue
    fi

    dirpath="$(dirname "$INPUT")"
    filename="$(basename "$INPUT" | sed 's/\.[^.]*$//')"

    for width in 2000 1400 800; do
      OUTPUT="${dirpath}/${filename}_${width}.webp"

      if [ -f "$OUTPUT" ]; then
        echo "Skipping existing file: $OUTPUT"
        continue
      fi

      ffmpeg -i "$INPUT" -vf "scale=${width}:-1" -c:v libwebp -qscale 80 "$OUTPUT"
      echo "Created: $OUTPUT"
    done

  done
done

echo "Done!"
