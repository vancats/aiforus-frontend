function snakeToCamelCase(key: string): string {
  return key.replace(/(_\w)/g, match => match[1].toUpperCase())
}

export function convertObjectKeysToCamelCase<T>(obj: T): T {
  const convertedObj: any = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeKey = key as string
      const camelKey = snakeToCamelCase(snakeKey)
      const value = obj[key]

      if (value !== null && typeof value === 'object') {
        convertedObj[camelKey] = convertObjectKeysToCamelCase(value)
      }
      else {
        convertedObj[camelKey] = value
      }
    }
  }

  return convertedObj as T
}
