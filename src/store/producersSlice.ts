import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { api } from '../services/api'

export interface Producer {
  id: number
  cpfOrCnpj: string
  producerName: string
  farmName: string
  city: string
  state: string
  totalArea: number
  agriculturalArea: number
  vegetationArea: number
  crops: string[]
  created_at: string
}

interface ProducersState {
  producers: Producer[]
  orderedProducers: Producer[]
  isLoading: boolean
}

const initialState: ProducersState = {
  producers: [],
  orderedProducers: [],
  isLoading: true,
}

export const loadProducers = createAsyncThunk(
  'producers/load',
  async (query?: string | undefined) => {
    try {
      const response = await api.get('/producers', {
        params: {
          q: query,
        },
      })
      return { producers: response.data }
    } catch (error) {
      console.error('Error fetching producers:', error)
      throw error
    }
  },
)

export const producersSlice = createSlice({
  name: 'producers',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Producer[]>) => {
      state.producers.push(...action.payload)
    },
    setOrderedProducers: (state, action) => {
      state.orderedProducers = action.payload.producers
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadProducers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      loadProducers.fulfilled,
      (state, action: { payload: { producers: Producer[] } }) => {
        const producers = action.payload.producers
        state.producers = producers
        state.isLoading = false
        if (producers && producers.length > 0) {
          const orderedProducers = [...producers].sort((a, b) => {
            return producers.indexOf(b) - producers.indexOf(a)
          })
          state.orderedProducers = orderedProducers
        } else {
          state.orderedProducers = []
        }
      },
    )
  },
})

export const { add, setOrderedProducers } = producersSlice.actions

export default producersSlice.reducer
