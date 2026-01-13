import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const createBid = createAsyncThunk(
  'bids/createBid',
  async ({ gigId, message, price }, { rejectWithValue }) => {
    try {
      const response = await api.post('/bids', { gigId, message, price });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create bid');
    }
  }
);

export const fetchBidsByGig = createAsyncThunk(
  'bids/fetchBidsByGig',
  async (gigId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/bids/gig/${gigId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bids');
    }
  }
);

export const fetchMyBids = createAsyncThunk(
  'bids/fetchMyBids',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/bids/my');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bids');
    }
  }
);

export const hireFreelancer = createAsyncThunk(
  'bids/hireFreelancer',
  async (bidId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/bids/${bidId}/hire`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to hire freelancer');
    }
  }
);

export const withdrawBid = createAsyncThunk(
  'bids/withdrawBid',
  async (bidId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/bids/${bidId}/withdraw`);
      return { bidId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to withdraw bid');
    }
  }
);

const bidSlice = createSlice({
  name: 'bids',
  initialState: {
    bids: [],
    myBids: [],
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearBids: (state) => {
      state.bids = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBid.fulfilled, (state, action) => {
        state.loading = false;
        state.myBids.unshift(action.payload);
      })
      .addCase(createBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBidsByGig.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBidsByGig.fulfilled, (state, action) => {
        state.loading = false;
        state.bids = action.payload;
      })
      .addCase(fetchBidsByGig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyBids.fulfilled, (state, action) => {
        state.myBids = action.payload;
      })
      .addCase(hireFreelancer.fulfilled, (state, action) => {
        const updatedBid = action.payload;
        state.bids = state.bids.map(bid =>
          bid._id === updatedBid._id ? updatedBid : bid
        );
      })
      .addCase(withdrawBid.fulfilled, (state, action) => {
        const { bidId } = action.payload;
        state.myBids = state.myBids.filter(bid => bid._id !== bidId);
      });
  }
});

export const { clearError, clearBids } = bidSlice.actions;
export default bidSlice.reducer;
