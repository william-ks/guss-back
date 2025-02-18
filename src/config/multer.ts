import multer from "multer";

const storage = multer.memoryStorage();
const handleFile = multer({ storage: storage });

export { handleFile };
