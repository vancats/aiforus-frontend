import type { DataTableColumn } from 'naive-ui'
import type { Action } from './type'
import type { TagInfo } from '~/utils/type'
import type { CardInfo } from '~/components/card/type'

// 接口参数标准化
export const convertObjectKeysToCamelCase = <T>(obj: T): T => {
  const convertedObj: any = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = snakeToCamelCase(key)
      const value = obj[key]

      if (value !== null && typeof value === 'object') {
        convertedObj[newKey] = convertObjectKeysToCamelCase(value)
      }

      else {
        convertedObj[newKey] = value
      }
    }
  }
  return convertedObj as T

  function snakeToCamelCase(key: string): string {
    return key.replace(/(_\w)/g, match => match[1].toUpperCase())
  }
}
export const convertObjectKeysToSnakeCase = <T>(obj: T): T => {
  const convertedObj: any = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = camelToSnakeCase(key)
      const value = obj[key]

      if (value !== null && typeof value === 'object') {
        convertedObj[newKey] = convertObjectKeysToSnakeCase(obj[key])
      }
      else {
        convertedObj[newKey] = obj[key]
      }
    }
  }
  return convertedObj as T

  function camelToSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`)
  }
}

// 表格相关
export const createColumn = <T>(key: string, title: string, render?: (row: T) => VNode) => ({
  key,
  title,
  render,
}) as DataTableColumn<T>

export const createOptionalColumn
= <T>(key: string, title: string, params?: Partial<DataTableColumn<T>>) => ({
  title,
  key,
  ...params,
}) as DataTableColumn<T>

export const createAction = ({ row, action, title, style = 'text-blue cursor' }: Action) => {
  return h('span',
    {
      className: style,
      onClick: () => action(row),
    },
    { default: () => title },
  )
}

// 缓存相关
const localPrefix = 'aiforus_'
export const setLocalItem = (key: string, value: string) => {
  localStorage.setItem(localPrefix + key, value)
}
export const getLocalItem = (key: string) => {
  return localStorage.getItem(localPrefix + key)
}
export const removeLocalItem = (key: string) => {
  localStorage.removeItem(localPrefix + key)
}
export const clearLocalItem = () => {
  localStorage.clear()
}

// 标签相关
export function getActualTag(cards: CardInfo[], tagList: TagInfo[]) {
  const set: Set<number> = new Set()
  cards.forEach(prompt => {
    prompt.tagList.forEach(tag => set.add(tag.id))
  })
  return handleAllTag(tagList.filter(tag => set.has(tag.id)))
}

export function handleAllTag(tags: TagInfo[] | undefined) {
  if (tags?.length) {
    const all = { id: 0, name: '全部' }
    return [all, ...tags]
  }
  else {
    return []
  }
}
