import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { deleteFile } from '../../utils/file';

const s3 = new AWS.S3({
  region: 'us-east-1',
});

@Injectable()
export class UploadFileService {
  async uploadFile(file: any, bucket: string) {
    const { originalname: name, size, location: url } = file;
    const originalPath = path.resolve(__dirname, '..', '..', '..', 'tmp', file);
    const id = v4();
    const fileContent = await fs.promises.readFile(originalPath);

    const params = {
      Bucket: bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType: file.mimetype,
      ContentDisposition: `inline; filename="${name}"`,
      ContentLength: size,
    };
    await s3.upload(params).promise();

    await deleteFile(originalPath);

    return { id, name, url };
  }

  async deleteFile(file: string, bucket: string): Promise<void> {
    await s3
      .deleteObject({
        Bucket: bucket,
        Key: file,
      })
      .promise();
  }
}
