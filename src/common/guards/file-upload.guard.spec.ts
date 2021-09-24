import { FileUploadGuard } from './file-upload.guard';

describe('FileUploadGuard', () => {
  it('should be defined', () => {
    expect(new FileUploadGuard()).toBeDefined();
  });
});
