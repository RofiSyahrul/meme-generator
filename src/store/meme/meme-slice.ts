import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import type {MemeElement, MemeTemplate} from '~/types/meme';

import {fetchTemplates} from './meme-service';

interface MemeState {
  templates: MemeTemplate[];
  selectedTemplate: MemeTemplate | null;
  elementMap: Record<string, MemeElement>;
  selectedElement: MemeElement | null;
  loading: boolean;
  error: string | null;
}

const initialState: MemeState = {
  templates: [],
  selectedTemplate: null,
  elementMap: {},
  selectedElement: null,
  loading: true,
  error: null,
};

const memeSlice = createSlice({
  name: 'meme',
  initialState,
  reducers: {
    setSelectedTemplate: (state, action: PayloadAction<MemeTemplate>) => {
      state.selectedTemplate = action.payload;
    },
    addElement: (state, action: PayloadAction<MemeElement>) => {
      state.elementMap[action.payload.id] = action.payload;
    },
    updateElement: (
      state,
      action: PayloadAction<{
        id: string;
        updates: Partial<Omit<MemeElement, 'id'>>;
      }>,
    ) => {
      const element = state.elementMap[action.payload.id];
      if (element) {
        Object.assign(element, action.payload.updates);
      }
    },
    setSelectedElement: (state, action: PayloadAction<MemeElement | null>) => {
      state.selectedElement = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTemplates.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedTemplate,
  addElement,
  updateElement,
  setSelectedElement,
} = memeSlice.actions;

export default memeSlice;
