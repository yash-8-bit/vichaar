import { NextResponse } from "next/server";
import cloudinary from "../lib/cloudinary";
import { response } from "./response.util";

export const upload = async ({
  file,
  type = "image",
}: {
  file: File;
  type?: "image";
}): Promise<{ success: Boolean; data: NextResponse | string }> => {
  try {
    if (file.size > 5000000) {
      return {
        success: false,
        data: response({
          message: "Maximum 5 MB File is allowed",
          status: 400,
        }),
      };
    }
    const arraybuffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: type,
            format: type === "image" ? "webp" : "auto",
          },
          (error, uploadResult) => {
            if (error) {
              return reject(error);
            }
            return resolve(uploadResult);
          }
        )
        .end(arraybuffer);
    });
    return { success: true, data: (uploadResult as any).secure_url };
  } catch (err) {
    return {
      success: false,
      data: response({
        message: "File Upload failed Try Again",
        status: 500,
      }),
    };
  }
};
