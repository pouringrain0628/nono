import { provide, config } from "midway";
import * as qiniu from 'qiniu';

interface QiniuConfig {
  bucket: string;
  accessKey: string;
  secretKey: string;
}

@provide()
export class QiniuService {
  @config('qiniu')
  qiniuConfig!: QiniuConfig;

  getUpToken() {
    const { accessKey, secretKey } = this.qiniuConfig;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    // 自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
    const options = {
      scope: this.qiniuConfig.bucket,
      expires: 60 * 60 * 240,
      // returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    return putPolicy.uploadToken(mac);
  }
}
