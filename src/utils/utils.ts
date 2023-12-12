import { Producer } from '../store/producersSlice'

interface MaskOptions {
  quantity: () => number
  areaTotal: () => number
}

export const calculateTotal = (
  producers: Producer[],
  type: 'quantity' | 'areaTotal',
): number => {
  const typeHandlers: MaskOptions = {
    quantity: () =>
      producers.filter((producer) => producer.totalArea !== undefined).length,
    areaTotal: () =>
      producers.reduce(
        (total, producer) => total + (producer.totalArea || 0),
        0,
      ),
  }

  return typeHandlers[type]?.() || 0
}
export const maskCPF = (value: string): string => {
  // Remove caracteres não numéricos
  const cpfNumerico = value.replace(/\D/g, '')
  // Limita o número de caracteres ao máximo de um CPF (11 dígitos)
  const cpfAjustado = cpfNumerico.slice(0, 11)
  // Aplica a máscara do CPF
  const cpfFormatado = cpfAjustado.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4',
  )
  return cpfFormatado
}

export const maskCNPJ = (value: string): string => {
  // Remove caracteres não numéricos
  const cnpjNumerico = value.replace(/\D/g, '')
  // Limita o número de caracteres ao máximo de um CNPJ (14 dígitos)
  const cnpjAjustado = cnpjNumerico.slice(0, 14)
  // Aplica a máscara do CNPJ
  const cnpjFormatado = cnpjAjustado.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5',
  )
  return cnpjFormatado
}
export const isValidCpfOrCnpj = (value: string): boolean => {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
  return (
    (cpfRegex.test(value) || cnpjRegex.test(value)) &&
    (value.length === 14 || value.length === 18)
  )
}

export const formatCpfOrCnpj = (value: string): string => {
  // Remove caracteres não numéricos
  const numericValue = value.replace(/\D/g, '')
  // Determina se é um CPF ou CNPJ
  const isCnpj = numericValue.length > 11
  // Aplica a máscara adequada
  return isCnpj ? maskCNPJ(numericValue) : maskCPF(numericValue)
}
