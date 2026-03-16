export const normalizeNumber = (value?: string | number) => {
  return value === '' || value === undefined ? 0 : Number(value)
}