# FineTune

A **modern, offline local media player** built for the web. FineTune allows users to upload, manage, and play **audio and video files directly in the browser** with a clean, professional UI and smooth playback experience.

The app is designed with a focus on **performance, simplicity, and aesthetics**, while keeping everything fully local — no server uploads, no external storage.

---

## Features

- Local File Upload
  Upload audio and video files directly from your device.

- Audio & Video Playback
  Play supported media files seamlessly using the built-in player.

- Loop Playback
  Enable loop mode to repeat the currently playing file.

- Play Next Feature
  Automatically plays the next file in the list after the current one finishes.

- Storage Management
  Enforces per-file and total storage constraints.

---

## How It Works

- Files are stored **locally in the browser** (no cloud, no backend).
- Storage limits are enforced at upload time to prevent overflow.
- Playback is handled via the HTML5 Audio/Video APIs.

---

## Storage

| Storage Aspect        | Details                                      |
| --------------------- | -------------------------------------------- |
| Maximum file size     | 120 MB per file                              |
| Maximum total storage | 150 MB                                       |
| Storage mechanism     | Browser-based persistent storage (IndexedDB) |

---

## Tech Stack

- **Next.js / React** - Application framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Modern styling
- **Framer Motion** - Animations
- **Lucide Icons** - Clean iconography
- **IndexedDB** - Local persistent storage

---

## Project Goals

- Provide a **fully local media player** experience
- Avoid server-side dependencies
- Maintain a **clean, professional UI**
- Enforce strict storage limits

---

## License

This project is for personal and educational use. You are free to modify and extend it for your own projects.
