import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { uploadImageFile } from "@/lib/uploads";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const files = formData.getAll("files").filter((f): f is File => f instanceof File);

  if (!files.length) {
    const single = formData.get("file");
    if (single instanceof File) files.push(single);
  }

  if (!files.length) {
    return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
  }

  if (files.length > 20) {
    return NextResponse.json(
      { error: "Upload up to 20 images at a time." },
      { status: 400 },
    );
  }

  try {
    const urls: string[] = [];
    for (const file of files) {
      urls.push(await uploadImageFile(file));
    }
    return NextResponse.json({ urls });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
