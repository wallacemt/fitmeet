import fs from "fs"
import path from "path"
import { uploadImage } from "../services/s3Service"

export const uploadImages = async () => {
    try {
        const imagesDir = path.join(__dirname, "../images");
        const files = fs.readdirSync(imagesDir);
        await Promise.all(
            files.map(async (file) => {
                const filePath = path.join(imagesDir, file);
                const fileBuffer = fs.readFileSync(filePath);
                const fileData = {
                    originalname: file,
                    buffer: fileBuffer,
                    mimetype: "image/jpeg",
                } as Express.Multer.File;
                await uploadImage(fileData, true);
            })
        );
    } catch (error) {
        console.error("Erro no upload das imagens:", error);
    }
};

