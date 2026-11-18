/**
 * Get a photo ready to upload, in the browser: iPhone HEIC photos become JPEG (browsers other than
 * Safari can't show HEIC on a web page), and big photos are shrunk so they upload quickly on a phone
 * connection. The photo is turned the right way up from its camera orientation.
 */

/** Long edge, in pixels. Plenty for the site's largest photo on a high-resolution screen. */
const MAX_EDGE = 2400;
const QUALITY = 0.85;
/** JPEG/PNG/WebP files smaller than this, and already within MAX_EDGE, are uploaded as they are. */
const KEEP_UNDER_BYTES = 1.5 * 1024 * 1024;

export function isHeic(file: File) {
  return /^image\/hei[cf]/.test(file.type) || /\.(heic|heif)$/i.test(file.name);
}

export function isPhoto(file: File) {
  return file.type.startsWith("image/") || isHeic(file);
}

export async function preparePhoto(file: File): Promise<File> {
  // Keep animated GIFs as they are.
  if (file.type === "image/gif") return file;

  const bitmap = await decode(file);
  try {
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    if (!isHeic(file) && scale === 1 && file.size < KEEP_UNDER_BYTES) return file;

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No canvas");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", QUALITY));
    // Let the phone free the memory right away; full-size photos are large.
    canvas.width = canvas.height = 0;
    if (!blob) throw new Error("Couldn't make a JPEG");

    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg" });
  } finally {
    bitmap.close();
  }
}

async function decode(file: File): Promise<ImageBitmap> {
  try {
    // Safari decodes HEIC itself, so on an iPhone this is all it takes.
    return await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch (error) {
    if (!isHeic(file)) throw error;
    // Chrome, Firefox, Edge: load the HEIC decoder (about 3 MB) only now that it's needed.
    const { heicTo } = await import("heic-to");
    return heicTo({ blob: file, type: "bitmap", options: { imageOrientation: "from-image" } });
  }
}
