import { defineStore } from 'pinia'
import type { CardInfo } from '~/components/card/type'
import { CardType } from '~/components/card/type'
import type { TagInfo } from '~/utils/type'
import { searchCollectedCards } from '~/api/collect'
import { getPromptTags } from '~/api/prompt'
import { getToolTags } from '~/api/tool'
/*
    once you get the user's collected data from backend, it will cache them in the store,
    next time you will get them from store first.
*/
export const useCollectStore = defineStore('collect', () => {
  const wholeCollectedPrompts = ref<CardInfo[] | null>(null)
  const wholeCollectedTools = ref<CardInfo[] | null>(null)

  // get all collected prompts or toos cards from network or store
  async function getWholeCollectedCard(userId: string, cardType: CardType = CardType.prompt) {
    switch (cardType) {
      case CardType.prompt:
        if (wholeCollectedPrompts.value) {
          return wholeCollectedPrompts.value
        }
        wholeCollectedPrompts.value = await searchCollectedCards(userId, cardType, 0) || []
        return wholeCollectedPrompts.value

      case CardType.tool:
        if (wholeCollectedTools.value) {
          return wholeCollectedTools.value
        }
        wholeCollectedTools.value = await searchCollectedCards(userId, cardType, 0) || []
        return wholeCollectedTools.value
    }
  }

  // refresh the collected prompts or toos cards
  async function refreshWholeCollectedCard(userId: string, cardType: CardType = CardType.prompt) {
    switch (cardType) {
      case CardType.prompt:
        wholeCollectedPrompts.value = await searchCollectedCards(userId, cardType, 0) || []
        break
      case CardType.tool:
        wholeCollectedTools.value = await searchCollectedCards(userId, cardType, 0) || []
        break
    }
  }
  const wholePromptsTags = ref<TagInfo[] | null>(null)
  const wholeToolTags = ref<TagInfo[] | null>(null)

  // get all prompts or toos cards tags from network or store
  async function getWholeCardsTags(cardType: CardType = CardType.prompt) {
    switch (cardType) {
      case CardType.prompt:
        if (wholePromptsTags.value) {
          return wholePromptsTags.value
        }
        wholePromptsTags.value = await getPromptTags() || []
        return wholePromptsTags.value

      case CardType.tool:
        if (wholeToolTags.value) {
          return wholeToolTags.value
        }
        wholeToolTags.value = await getToolTags() || []
        return wholeToolTags.value
    }
  }

  // refresh the prompts or toos cards tags
  async function refreshWholeCardsTags(userId: string, cardType: CardType = CardType.prompt) {
    switch (cardType) {
      case CardType.prompt:
        wholePromptsTags.value = await getPromptTags() || []
        break
      case CardType.tool:
        wholeToolTags.value = await getToolTags() || []
        break
    }
  }

  return {
    wholeCollectedPrompts,
    wholeCollectedTools,
    getWholeCollectedCard,
    refreshWholeCollectedCard,
    getWholeCardsTags,
    refreshWholeCardsTags,
  }
})
