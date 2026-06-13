import os
import subprocess
import imageio_ffmpeg

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
public_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public"))

videos_to_compress = [
    # (input_file, output_file, scale_height, crf_value, bitrate)
    ("Website_Video_02.webm", "Website_Video_02_opt.webm", 720, 38, "800k"),
    ("Website_01.webm", "Website_01_opt.webm", 720, 36, "800k"),
    ("Website_04.webm", "Website_04_opt.webm", 720, 35, "600k"),
    ("Website_09.webm", "Website_09_opt.webm", 720, 35, "600k"),
    ("Website_08.webm", "Website_08_opt.webm", 720, 35, "600k"),
    ("Website_05.webm", "Website_05_opt.webm", 720, 35, "600k"),
    ("Website_010.webm", "Website_010_opt.webm", 720, 35, "600k"),
    ("boating.webm", "boating_opt.webm", 720, 36, "600k"),
    ("trees.webm", "trees_opt.webm", 720, 36, "600k"),
]

# Compress the WebM files
for input_name, output_name, height, crf, bitrate in videos_to_compress:
    input_path = os.path.join(public_dir, input_name)
    output_path = os.path.join(public_dir, output_name)
    
    if not os.path.exists(input_path):
        if os.path.exists(output_path) and os.path.getsize(output_path) > 1024 * 1024:
            print(f"[RESUME] Found optimized {output_name} from previous run, swapping directly.")
            try:
                os.rename(output_path, input_path)
                print(f"  Swapped successfully.")
                continue
            except Exception as e:
                print(f"[ERROR] Failed to swap: {e}")
                continue
        else:
            print(f"Input file {input_path} does not exist, skipping.")
            continue
        
    # Check if the file is already optimized (e.g. if we compressed it in a previous run and replaced it)
    # If the file size is very small compared to normal raw videos (e.g., boating < 4MB, trees < 3MB),
    # or if we already ran the compression for it, we can skip it.
    # To be safe, we check if it is under a specific optimized size threshold:
    file_size_mb = os.path.getsize(input_path)/(1024*1024)
    is_already_optimized = False
    
    if input_name in ["Website_Video_02.webm", "Website_01.webm", "Website_04.webm", "Website_09.webm", "Website_08.webm"] and file_size_mb < 5.0:
        is_already_optimized = True
    elif input_name == "Website_05.webm" and file_size_mb < 2.0:
        is_already_optimized = True
    elif input_name == "Website_010.webm" and file_size_mb < 2.0:
        is_already_optimized = True
    elif input_name == "boating.webm" and file_size_mb < 5.0:
        is_already_optimized = True
    elif input_name == "trees.webm" and file_size_mb < 3.0:
        is_already_optimized = True
        
    if is_already_optimized:
        print(f"[SKIP] {input_name} is already optimized ({file_size_mb:.2f} MB), skipping compression.")
        continue

    print(f"Compressing {input_name} ({file_size_mb:.2f} MB) -> {output_name}...")
    
    cmd = [
        ffmpeg_exe,
        "-y",
        "-i", input_path,
        "-vf", f"scale=-2:{height}",
        "-c:v", "libvpx-vp9",
        "-crf", str(crf),
        "-b:v", bitrate,
        "-deadline", "good",
        "-cpu-used", "4",
        "-an",  # strip audio
        output_path
    ]
    
    try:
        subprocess.run(cmd, check=True)
        old_size = os.path.getsize(input_path)/(1024*1024)
        new_size = os.path.getsize(output_path)/(1024*1024)
        print(f"[SUCCESS] Successfully compressed {input_name}!")
        print(f"  Old Size: {old_size:.2f} MB")
        print(f"  New Size: {new_size:.2f} MB ({((old_size-new_size)/old_size)*100:.1f}% reduction)")
        
        # Replace the original with the optimized one
        os.remove(input_path)
        os.rename(output_path, input_path)
        print(f"  Replaced original {input_name} with optimized version.")
    except Exception as e:
        print(f"[ERROR] Failed to compress {input_name}: {e}")
