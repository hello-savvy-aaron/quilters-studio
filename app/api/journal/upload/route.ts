import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAdmin } from "@/lib/admin";

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await isAdmin())) throw new Error("Not allowed");
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
          maximumSizeInBytes: 40 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
    });
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}
