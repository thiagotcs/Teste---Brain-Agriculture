import { Producer } from '../store/producersSlice'

export const calculateTotal = (
  producers: Producer[],
  type: 'quantity' | 'areaTotal',
): number => {
  const typeHandlers = {
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
