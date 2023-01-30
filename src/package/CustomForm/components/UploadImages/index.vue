<template>
  <div>
    <el-upload
      ref="uploadFile"
      action=""
      :accept="accept"
      list-type="picture-card"
      :before-upload="beforeAvatarUpload"
      :http-request="httpRequest"
      :data="Data"
      :limit="limit"
      :file-list="fileList"
      :disabled="disabled"
      :class="{ hide: hideUploadBtn }"
      :on-change="handleEditChange"
      :on-remove="handleRemove"
      :on-preview="handlePictureCardPreview"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      :visible.sync="dialogVisible"
      append-to-body
    >
      <img
        width="100%"
        :src="dialogImageUrl"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import CryptoJS from 'crypto-js'

export default {
  name: "UploadImages",
  model: {
    prop: "value",
  },
  props: {
    // 配合v-model 加载初始值
    value: {
      // type: [Array, String],
      required: true,
    },
    limit: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: "image/jpeg,image/png",
    },
    handleUpload: {
      type: Function,
      default: function(data) {
        return axios({
          method: "post",
          url: "./api/v1/file/upload/generate",
          data: data,
        });
      },
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      banner_list: [],
      dialogVisible: false,
      Data: {},
      fileList: [],
      hideUploadBtn: false,
      fileUploadGenerate: this.handleUpload(),
    };
  },
  watch: {
    // 赋值
    value: {
      handler: function(newValue) {
        if (this.limit === 1) {
          // newValue 类型字符串 or undefined
          if (typeof newValue === "undefined") {
            this.banner_list = [];
          } else if (typeof newValue === "string") {
            this.banner_list = !newValue ? [] : [{ url: newValue }];
          }
        } else {
          if (typeof newValue === "undefined") {
            this.banner_list = [];
          } else if (typeof newValue === "string") {
            this.banner_list = !newValue ? [] : [{ url: newValue }];
          } else {
            // newValue 类型数组 or undefined
            this.banner_list = !newValue
              ? []
              : newValue.map((url) => {
                return { url: url };
              });
          }
        }
        this.fileList = JSON.parse(JSON.stringify(this.banner_list));
        this.hideUploadBtn = this.fileList.length >= this.limit;
      },
      immediate: true,
    },
  },
  methods: {
    // 上传图片前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      if (!isJPG && !isPNG) {
        this.$message.error("图片只能是 JPG/PNG 格式!");
        return false;
      }
      return true;
    },
    sha256File(file) {
      return new Promise(function(resolve) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const data = event.target.result;
          const encrypted = CryptoJS.SHA256(data);
          resolve(CryptoJS.enc.Hex.stringify(encrypted));
        };
        reader.readAsBinaryString(file);
      });
    },
    async getFilterData(file) {
      try {
        const fileName = await this.sha256File(file);
        const extension = file.name.substring(file.name.lastIndexOf("."));
        const combineName = fileName + extension;
        const param = {
          name: combineName,
        };

        const initRes = await this.fileUploadGenerate(param);
        if (initRes.success) {
          const secondRes = await axios.request({
            method: "PUT",
            url: initRes.data.uploadUrl,
            withCredentials: false,
            headers: initRes.headers,
            validateStatus: function(status) {
              return status >= 200;
            },
            maxRedirects: 0,
            responseType: "text",
            data: file,
          });
          console.log("secondRes", secondRes);
          if (secondRes.status < 300) {
            return initRes;
          } else {
            throw Error(secondRes);
          }
        } else {
          throw Error(initRes);
        }
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    // 从后台获取第一步所需的数据
    httpRequest(File) {
      this.getFilterData(File.file)
        .then((res) => {
          if (res.success) {
            this.Data = res.data;
            // 主要是要其中的url
            const obj = {
              url: this.Data.fileUrl,
            };

            this.banner_list.push(obj);
            this.fileList = JSON.parse(JSON.stringify(this.banner_list));

            if (this.limit === 1) {
              this.$emit("input", this.banner_list[0].url);
            } else {
              this.$emit(
                "input",
                this.banner_list.map((item) => item.url)
              );
            }
            return true;
          } else {
            const idx = this.$refs.uploadFile.uploadFiles.findIndex(
              (item) => item.uid === File.file.uid
            );
            this.$refs.uploadFile.uploadFiles.splice(idx, 1);
            this.hideUploadBtn = this.fileList.length >= this.limit;
            return false;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 改变
    handleEditChange(file, fileList) {
      console.log("fileList ", fileList);
      this.hideUploadBtn = fileList.length >= this.limit;
    },
    // 删除
    handleRemove(file, fileList) {
      this.banner_list = JSON.parse(JSON.stringify(fileList));
      this.fileList = fileList;
      if (this.limit === 1) {
        this.$emit("input", "");
      } else {
        this.$emit(
          "input",
          this.fileList.map((item) => item.url)
        );
      }
      this.hideUploadBtn = fileList.length >= this.limit;
    },
    // 预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss">
.hide {
  .el-upload--picture-card {
    display: none !important;
  }
}

.el-upload-list__item {
  transition: none !important;
}
</style>
