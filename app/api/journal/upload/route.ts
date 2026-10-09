import { issueSignedToken } from "@vercel/blob";
import { handleUploadPresigned, type HandleUploadPresignedBody } from "@vercel/blob/client";
import { isAdmin } from "@/lib/admin";

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadPresignedBody;
  try {
    const result = await handleUploadPresigned({
      body,
      request,
      getSignedToken: async (pathname) => {
        if (!(await isAdmin())) throw new Error("Not allowed");
        const limits = {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
          maximumSizeInBytes: 40 * 1024 * 1024,
        };
        const token = await issueSignedToken({ pathname, operations: ["put"], ...limits });
        return { token, urlOptions: { ...limits, addRandomSuffix: true } };
      },
    });
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}
