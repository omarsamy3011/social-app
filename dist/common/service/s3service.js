"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3service = exports.S3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const env_service_1 = require("../../config/env.service");
const multer_enum_1 = require("../enums/multer.enum");
const fs_1 = require("fs");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
class S3Service {
    client;
    constructor() {
        this.client = new client_s3_1.S3Client({
            region: 'us-east-1',
            credentials: {
                accessKeyId: env_service_1.env.s3_accessKey,
                secretAccessKey: env_service_1.env.s3_secretKey,
            }
        });
    }
    async uploadFile({ memoryStorage = multer_enum_1.MulterStorageEnums.memoryStorage, Bucket = env_service_1.env.s3_BucketName, path = 'general', file, Acl = client_s3_1.ObjectCannedACL.private, contentType }) {
        const key = `socialApp/${path}/${Math.round(Date.now() / 1000)}-${file.originalname}`;
        const result = await this.client.send(new client_s3_1.PutObjectCommand({
            Bucket,
            Key: key,
            Body: memoryStorage == multer_enum_1.MulterStorageEnums.memoryStorage ? file.buffer : (0, fs_1.createReadStream)(file.path),
            ACL: Acl,
            ContentType: contentType
        }));
        return key;
    }
    async uploadBigFile({ memoryStorage = multer_enum_1.MulterStorageEnums.memoryStorage, Bucket = env_service_1.env.s3_BucketName, path = 'general', file, Acl = client_s3_1.ObjectCannedACL.private, contentType, partSize = 5 }) {
        const key = `socialApp/${path}/${Math.round(Date.now() / 1000)}-${file.originalname}`;
        const result = new lib_storage_1.Upload({
            client: this.client,
            params: {
                Bucket,
                ACL: Acl,
                Key: key,
                Body: memoryStorage == multer_enum_1.MulterStorageEnums.memoryStorage ? file.buffer : (0, fs_1.createReadStream)(file.path),
                ContentType: contentType
            },
            partSize: partSize * 1024 * 1024
        });
        result.on("httpUploadProgress", (progress) => {
            console.log(`${progress.loaded / progress.total * 100}%`);
        });
        return await result.done();
    }
    async getFileFromBucket({ Bucket = env_service_1.env.s3_BucketName, key }) {
        const file = await new client_s3_1.GetObjectCommand({
            Bucket,
            Key: key
        });
        return await this.client.send(file);
    }
    async GetPreSignURL({ Bucket = env_service_1.env.s3_BucketName, path = "general", ContentType, Key, Expires = 60 * 2, Originalname }) {
        const key = `socialMedia/${path}/${Math.round(Math.random() * 1e9)}-${Originalname}`;
        const result = new client_s3_1.PutObjectCommand({
            Bucket,
            Key: key,
            ContentType
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.client, result, { expiresIn: Expires });
        return { url, key };
    }
    async deleteAsset({ Bucket = env_service_1.env.s3_BucketName, Key, }) {
        const result = await new client_s3_1.DeleteObjectCommand({
            Bucket,
            Key
        });
        return this.client.send(result);
    }
}
exports.S3Service = S3Service;
exports.s3service = new S3Service();
