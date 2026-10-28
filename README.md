# Pai Pai's Birthday Surprise 🎀

A responsive, cute nine-page birthday website made with React, Vite, Tailwind CSS and editable content.

## Run it
1. Install Node.js (LTS) if you don't already have it: https://nodejs.org/
2. Extract this folder.
3. Open a terminal in this folder and run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL printed in the terminal (usually `http://localhost:5173`).

To make a production build: `npm run build`.

## Edit the website
- **All text and button labels:** `src/content.js`
- **Colours, spacing, animations and responsive styling:** `src/styles.css` and `tailwind.config.js`
- **Page layout and interactions:** `src/App.jsx`
- **Your own photos:** put image files in `public/images/`, then update `photoGallery` in `src/content.js` to use paths such as `/images/photo-1.jpg`.
- **Your birthday video/audio:** put the file in `public/media/`, then set `birthdayMedia.src` in `src/content.js` (example: `/media/birthday-video.mp4`). Set `birthdayMedia.type` to `video` or `audio`.
- **Cat sticker:** the default cat is drawn with emoji/CSS so it works offline. Replace it in `src/App.jsx` with your own image if you want.

## Page flow
1. Gift intro → 2. Surprise question
2. “Yes!” → 5. Gift menu; “No” → 3. Why did you click no?
3. Try again → 2
5. Cake → 4 → Blow → 7. Birthday greeting
5. Photos → 6. Photo gallery
5. Letter → 8. Birthday wish
5. Present → 9. Audio/video greeting
6, 7, 8, 9 have a Back button to return to the gift menu.

The text, button labels, gifts, image paths and greeting are examples—personalise them before sharing. For photos/media, use content you have permission to share.
