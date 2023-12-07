import { describe, expect, it } from 'vitest'
import { producersSlice, loadProducers } from './producersSlice'

describe('Producers Slice', () => {
  it('should handle the asynchronous action of loading producers', async () => {
    globalThis.api = {
      get: async () => ({ data: [{ id: 1, name: 'Producer 1' }] }),
    }

    const initialState = producersSlice.getInitialState()

    const finalState = await producersSlice.reducer(
      initialState,
      loadProducers(),
    )

    expect(finalState.isLoading).not.toBe(false)
    expect(finalState.producers).not.toEqual([{ id: 1, name: 'Producer 1' }])
  })
})
