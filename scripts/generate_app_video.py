#!/usr/bin/env python3
import os
import subprocess
import re

FFMPEG = "/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-x86_64-v7.1"
ARTIFACT_DIR = "/Users/mishra/.gemini/antigravity-ide/brain/76ab9175-92ed-4a57-a94b-528f4f63a967"
PUBLIC_DIR = "/Users/mishra/Documents/projects-Ai/stack/resume_creator/public"

# Slide Images
slides = [
    os.path.join(ARTIFACT_DIR, "basic_feature_step1_1788330270809.png"),
    os.path.join(ARTIFACT_DIR, "basic_feature_step2_1788330286838.png"),
    os.path.join(ARTIFACT_DIR, "basic_feature_step3_1788330301600.png"),
    os.path.join(ARTIFACT_DIR, "basic_feature_step4_1788330319791.png")
]

# Soft, Gentle, Natural Conversational Scripts
narrations = [
    "Step one. Simply enter your personal details, select one of five ATS friendly templates, and customize your accent colors and font pairings.",
    "Step two. Easily add your work experience, education, and skills. Use clear bullet points to highlight your key achievements.",
    "Step three. Paste any job description to view your live ATS score, discover missing keywords, and polish your resume in one click.",
    "Step four. Instantly download your resume as a clean, vector PDF for free. Start creating your resume today at resume dot gnanamai dot com."
]

def get_audio_duration(file_path):
    cmd = [FFMPEG, "-i", file_path]
    res = subprocess.run(cmd, stderr=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
    match = re.search(r"Duration:\s*(\d+):(\d+):(\d+\.\d+)", res.stderr)
    if match:
        hours, mins, secs = match.groups()
        return float(hours) * 3600 + float(mins) * 60 + float(secs)
    return 9.0

print("🎙️ Generating Soft, Gentle & Natural Voiceover Audio Clips...")
segment_files = []

for i, text in enumerate(narrations):
    aiff_path = f"/tmp/soft_step_{i+1}.aiff"
    m4a_path = f"/tmp/soft_step_{i+1}.m4a"
    seg_mp4 = f"/tmp/soft_seg_{i+1}.mp4"
    
    # 1. Generate Voiceover via say with relaxed 145 WPM rate for soft, gentle, natural voice
    subprocess.run([
        "say", "-v", "Samantha", "-r", "145", "-o", aiff_path, text
    ], check=True)
    
    # 2. Convert AIFF to soft 48kHz stereo AAC audio in FFmpeg
    # Equalization: boost 250Hz by +2dB for warmth, soften 4.5kHz by -3dB for non-harsh high frequencies
    soft_audio_filter = "equalizer=f=250:width_type=h:width=150:g=2,equalizer=f=4500:width_type=h:width=1000:g=-3,volume=0.9"
    
    subprocess.run([
        FFMPEG, "-y", "-i", aiff_path,
        "-af", soft_audio_filter,
        "-ar", "48000", "-ac", "2", "-c:a", "aac", "-b:a", "256k", m4a_path
    ], check=True)
    
    # Get exact duration of audio clip
    duration = get_audio_duration(m4a_path)
    padding_duration = duration + 0.8  # Soft pause at end of each section
    
    # 3. Create MP4 video segment with audio fade in/out and yuv420p video stream
    fade_out_start = max(0, padding_duration - 0.4)
    video_audio_filter = f"{soft_audio_filter},afade=t=in:ss=0:d=0.2,afade=t=out:st={fade_out_start}:d=0.35"
    
    subprocess.run([
        FFMPEG, "-y",
        "-loop", "1", "-i", slides[i],
        "-i", m4a_path,
        "-t", str(padding_duration),
        "-c:v", "libx264", "-tune", "stillimage", "-preset", "medium", "-crf", "18",
        "-af", video_audio_filter,
        "-c:a", "aac", "-b:a", "256k", "-ar", "48000",
        "-pix_fmt", "yuv420p", seg_mp4
    ], check=True)
    
    segment_files.append(seg_mp4)
    print(f"✅ Soft Voice Segment {i+1} rendered ({padding_duration:.1f}s): {seg_mp4}")

# Concat list file
concat_list_path = "/tmp/soft_concat_list.txt"
with open(concat_list_path, "w") as f:
    for seg in segment_files:
        f.write(f"file '{seg}'\n")

# Output paths
output_mp4_artifact = os.path.join(ARTIFACT_DIR, "app_promo_video.mp4")
output_mp4_public = os.path.join(PUBLIC_DIR, "app_promo_video.mp4")

print("🎬 Rendering Final HD MP4 Movie Video with Soft & Natural Audio...")
subprocess.run([
    FFMPEG, "-y", "-f", "concat", "-safe", "0",
    "-i", concat_list_path,
    "-c", "copy", output_mp4_artifact
], check=True)

subprocess.run(["cp", output_mp4_artifact, output_mp4_public], check=True)

print(f"🎉 Soft Natural Voiceover Movie Video generated successfully!\n- Artifact: {output_mp4_artifact}\n- Public Web: {output_mp4_public}")
