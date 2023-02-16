interface interFaceNextFocusInput {
  maxLength: number
  value: any
  name: string
}

const nextFocusInput = (e: interFaceNextFocusInput) => {
  const { maxLength, value, name } = e
  const [fieldName, fieldIndex] = name.split('_')
  if (maxLength === value.length) {
    const nextSibling = document.querySelector(`input[name=${fieldName}_${+fieldIndex + 1}]`) as HTMLElement
    if (nextSibling !== null) {
      nextSibling.focus()
    }
  }
}

export default nextFocusInput
