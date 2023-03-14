<template>
  <n-message-provider>
    <NavBar />
    <div h-40 />
    <div
      class="px-20vw rounded-t-3 relative h-full bg-#F4F8FD"
    >
      <div class="absolute -top-5vw left-10vw w-10vw h-10vw bg-blue rounded">
        <span w-full h-full i-carbon:airport-01 />
      </div>
      <div class="absolute -top-4vw left-22vw  text-4xl flex">
        <span text-white>
          ChatGPT
        </span>
        <n-button type="info" class="ml-2 rounded bg-#3A50FF">
          去官网使用
        </n-button>
        <n-button type="info" class="ml-2 rounded bg-#3A50FF">
          去扫码使用
        </n-button>
      </div>
      <div p-4>
        <div text-2xl mb-2>
          关于 Chat GPT
        </div>
        <div break-words text="#5B6681 sm" style="textIndent: 2rem">
          ChatGPT是美国人工智能研究实验室OpenAI新推出的一种人工智能技术驱动的自然语言处理工具，使用Transformer神经网络架构，也是GPT-3.5架构，这是一种用于处理序列数据的模型，拥有语言理解和文本生成能力，尤其是它会通过连接大量的语料库来训练模型，这些语料库包含了真实世界中的对话，使得ChatGPT具备上知天文下知地理，还能根据聊天的上下文进行互动的能力，做到与真正人类几乎无异的聊天场景进行交流。ChatGPT不单是聊天机器人，还能进行撰写邮件、视频脚本、文案、翻译、代码等任务。
        </div>

        <div mt-4 bg-white w-full p-4 rounded-lg>
          <n-config-provider :theme-overrides="themeOverrides">
            <n-input
              :value="textValue"
              border="~ #3A50FF"
              type="textarea"
              :on-input="handleChange"
              :autosize="{
                minRows: 3,
              }"
            />
          </n-config-provider>
          <div class="pt-2 text-#3A50FF flex items-center">
            <img w-4 h-4 :src="copyImg" @click="clipboard">
            <span cursor-pointer pl-1 mr-2 @click="clipboard">复制</span>
            <img w-4 h-4 :src="enterImg">
            <span cursor-pointer pl-1>去ChatGPT使用</span>
          </div>
        </div>
      </div>
    </div>
  </n-message-provider>
</template>

<script setup lang='ts'>
import copyImg from '~/assets/copy.png'
import enterImg from '~/assets/enter.png'
import naiveui from '~/utils/naiveui'

const themeOverrides = {
  Input: {
    textColor: '#303544',
  },
}
const textValue = ref('商业计划书是公司、企业或项目单位为了达到招商融资和其它发展目标，根据一定的格式和内容要求而编辑整理的一个向受众全面展示公司和项目状况、未来发展潜力的书面材料。商业计划书是一份全方位的项目计划，其主要意图是递交给投资商，以便于他们能对企业或项商业计划书是公司、企业或项目单位为了达到招商融资和其它发展目标，根据一定的格式和内容要求而编辑整理的一个向受众全面展示公司和项目状况、未来发展潜力的书面材料。商业计划书是一份全方位的项目计划，其主要意图是递交给投资商，以便于他们能对企业或项商业计划书是公司、企业或项目单位为了达到招商融资和其它发展目标，根据一定的格式和内容要求而编辑整理的一个向受众全面展示公司和项目状况、未来发展潜力的书面材料。商业计划书是一份全方位的项目计划，其主要意图是递交给投资商，以便于他们能对企业或项商业计划书是公司、企业或项目单位为了达到招商融资和其它发展目标，根据一定的格式和内容要求而编辑整理的一个向受众全面展示公司和项目状况、未来发展潜力的书面材料。商业计划书是一份全方位的项目计划，其主要意图是递交给投资商，以便于他们能对企业或项商业计划书是公司、企业或项目单位为了达到招商融资和其它发展目标，根据一定的格式和内容要求而编辑整理的一个向受众全面展示公司和项目状况、未来发展潜力的书面材料。商业计划书是一份全方位的项目计划，其主要意图是递交给投资商，以便于他们能对企业或项商业计划书是公司、企业或项目单位为了达到招商融资和其它发展目标，根据一定的格式和内容要求而编辑整理的一个向受众全面展示公司和项目状况、未来发展潜力的书面材料。')

const handleChange = (value: string) => {
  textValue.value = value
}

const clipboard = () => {
  if (navigator.clipboard) {
  // clipboard api 复制
    navigator.clipboard.writeText(textValue.value)
  }
  else {
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    // 隐藏此输入框
    textarea.style.position = 'fixed'
    textarea.style.clip = 'rect(0 0 0 0)'
    textarea.style.top = '10px'
    // 赋值
    textarea.value = textValue.value
    // 选中
    textarea.select()
    // 复制
    document.execCommand('copy', true)
    // 移除输入框
    document.body.removeChild(textarea)
  }
  naiveui.message.success('复制成功！')
}
</script>
