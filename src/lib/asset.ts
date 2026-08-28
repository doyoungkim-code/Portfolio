/** public/ 자산 경로를 base(/Portfolio/)에 맞춰 해석한다 */
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
