import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // normal
    ['cursor', 'cursor-pointer select-none'],
    ['web-only', 'hidden sm:block'], // 移动端不展示
    ['mobile-only', 'block sm:hidden'], // 移动端不展示
    // Flex flex + align-items + justify-content + flex-direction
    ['flex-col', 'flex flex-col'],
    ['flex-wrap', 'flex flex-wrap'],
    ['flex-center', 'flex items-center'],
    ['flex-start', 'flex items-start'],
    ['flex-start-end', 'flex-start justify-end'],
    ['flex-center-row', 'flex-center flex-row'],
    ['flex-center-between', 'flex-center justify-between'],
    ['flex-center-end', 'flex-center justify-end'],
    ['flex-start-between', 'flex-start justify-between'],
    ['flex-center-center', 'flex-center justify-center'],
    ['flex-center-around', 'flex-center justify-around'],
    ['flex-center-between-col', 'flex-center-between flex-col'],
    ['flex-start-between-col', 'flex-start-between flex-col'],
    ['flex-center-between-row', 'flex-center-between flex-row'],
    ['flex-center-center-col', 'flex-center-center flex-col'],

    ['fix-bottom', 'fixed left-0 right-0 bottom-0'],

    // sidebar
    ['side-icon', 'wh-15 sm:wh-20 sm:mb-2 rounded-lg cursor flex-center-center-col color-#9C9CA9 hover:color-#FFFFFF'],

    // layout
    ['layout-left', 'pl-4 sm:pl-10'],
    ['layout-right', 'pr-3 sm:pr-10'],
    ['layout-bottom', 'mb-19 sm:mb-4'],
    ['layout-right-bottom', 'layout-right layout-bottom'],

    // title
    ['title-tags', 'flex-center sm:h-8 mb-2.5 text-4 sm:mb-6 sm:text-5'],
    ['title-tag', 'title-brief px-3 py-2 sm:px-6 sm:py-4 rounded-5 bg-transparent hover:color-#FFFFFF hover:bg-#2B2C3E'],

    // tool
    ['tool-layout', 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2.5 sm:gap-6'],

    // prompt
    ['prompt-layout', 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-6'],

    // card
    ['card-more', 'w-10 sm:w-20 mr-2.5 sm:mr-6 rounded-2xl flex-shrink-0 cursor bg-#2B2C3E hover:bg-#393A52'],
    ['card-tool', 'card-more w-30 h-47 sm:w-50 sm:h-76'],

    ['card-detail', 'h-20 rounded-lg sm:h-37 sm:rounded-2xl cursor bg-#2B2C3E hover:bg-#393A52'],

    ['card-tag', 'h-4 px-1 text-3 rounded sm:h-7 sm:px-2 mr-2 sm:text-sm sm:rounded-lg text-#FFFFFF bg-#1F1E2C group-hover-bg-#3D3F58'],

    ['title-brief', 'text-3 sm:text-sm text-#9C9CA9'],

    // adaptor 只匹配都是数字的情况 字母手动列举
    [/^(.*)-([\d\.]+)-([\d\.]+)$/, ([, k, n, s]) => `${k}-${n} sm:${k}-${s}`],
    ['text-3-sm', 'text-3 sm:text-sm'],
    ['text-3-xl', 'text-3 sm:text-xl'],
    ['w-full-auto', 'w-full sm:w-auto'],
    ['max-w-30-full', 'max-w-30 sm:max-w-full'],
  ],

  rules: [
    [/^wh-(.*)$/, ([, d]) => {
      // 先考虑这两个场景
      switch (d) {
        case 'full': d = '100%'
          break
        case 'screen': d = '100vw'
          break
      }
      if (d === 'full')
        d = '100%'
      if (isNaN(Number(d)))
        return { width: d, height: d }
      else
        return { width: `${Number(d) / 4}rem`, height: `${Number(d) / 4}rem` }
    }],

    // 三角形
    [/^tri-(.*?)-(.*?)-(.*)$/, ([, p, d, c]) => {
      let borderColor = ''
      switch (p) {
        case 't': borderColor = `${c} transparent transparent transparent`
          break
        case 'r': borderColor = `transparent ${c} transparent transparent`
          break
        case 'b': borderColor = `transparent transparent ${c} transparent`
          break
        case 'l': borderColor = `transparent transparent transparent ${c}`
          break
      }
      return {
        'width': 0,
        'height': 0,
        'border': `${Number(d) / 4}rem solid`,
        'border-color': borderColor,
      }
    }],
  ],

  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
    //   scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
      },
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
