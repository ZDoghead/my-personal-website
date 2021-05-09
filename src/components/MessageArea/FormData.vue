<template>
  <!-- 在此处监听事件，处理在输入框中，回车时会提交表单的问题 -->
  <form @submit.prevent="handleSubmit" class="form-data-container" ref="form">
    <div class="form-item">
      <label>
        <input
          class="nick"
          maxlength="10"
          type="text"
          placeholder="用户昵称"
          v-model="formData.nickname"
        />
        <span class="nick-tip">{{ formData.nickname.length }}/10</span>
      </label>
    </div>
    <div class="form-item">
      <div class="err">{{ error.nickname }}</div>
    </div>
    <div class="form-item">
      <label>
        <textarea
          maxlength="300"
          class="content"
          placeholder="输入内容"
          v-model="formData.content"
        ></textarea>
        <span class="area-tip">{{ formData.content.length }}/300</span>
      </label>
    </div>
    <div class="form-item">
      <div class="err">{{ error.content }}</div>
    </div>
    <div class="form-item">
      <button :disabled="isSubmiting" class="submit">
        {{ isSubmiting ? "提交中..." : "提交" }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nickname: "",
        content: "",
      },
      error: {
        nickname: "",
        content: "",
      },
      isSubmiting: false, // 是否在提交中
    };
  },
  methods: {
    handleSubmit() {
      // 验证表单信息
      this.error.nickname = this.formData.nickname ? "" : "请填写昵称";
      this.error.content = this.formData.content ? "" : "输入内容不能为空";
      if (this.error.nickname || this.error.content) {
        return;
      }
      this.isSubmiting = true;

      this.$emit("submit", this.formData, (successMsg) => {
        // 等待评论提交完成后执行
        this.isSubmiting = false;
        this.formData.nickname = "";
        this.formData.content = "";
        this.$showMessage({
          content: successMsg,
          duration: 1500,
          type: "success",
          container: this.$refs.form,
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
label {
  display: inline-block;
  position: relative;
}
.nick {
  padding: 13px 0;
  text-indent: 1em;
  width: 300px;
  outline: none;
  border: 2px solid @gray;
  border-radius: 5px;
  font-size: 17px;
  &:focus {
    border-color: @primary;
  }
  &::placeholder {
    font-weight: bold;
  }
}
.nick-tip {
  position: absolute;
  right: 4px;
  bottom: 3px;
  font-size: 12px;
  color: @gray;
}
.content {
  resize: none;
  width: 800px;
  height: 200px;
  padding: 10px 15px;
  outline: none;
  border: 2px solid @gray;
  border-radius: 5px;
  font-size: 17px;
  &:focus {
    border-color: @primary;
  }
  &::placeholder {
    font-weight: bold;
  }
}
.area-tip {
  position: absolute;
  right: 5px;
  bottom: 7px;
  font-size: 12px;
  color: @gray;
}
.err {
  height: 20px;
  margin: 3px 0;
  font-size: 14px;
  color: red;
}
.submit {
  width: 110px;
  height: 40px;
  background-color: @primary;
  border: none;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 30px;
  transition: 0.3s;
  &:hover {
    background-color: darken(@primary, 5%);
  }
  &:disabled {
    background-color: lighten(@primary, 15%);
    cursor: not-allowed;
  }
}
</style>