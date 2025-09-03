import { UploadThingError } from "uploadthing/server";
import { createUploadthing } from "uploadthing/next";
const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "1GB", maxFileCount: 40 } })
    .middleware(async ({ req }) => {
      const authToken = req.cookies.get("authorization");
      console.log("auth token from middleware",authToken);
      // This code runs on your server before upload
    //   const user = "await auth(req);";
        const user = { id: "demo-user" };
        console.log("user from middleware" , user);
      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("--file url--",file);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    return { 
    uploadedBy: metadata.userId,
    url: file.ufsUrl
};
    }),
};


