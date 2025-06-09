import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MemeElement, MemeTemplate} from '@/types/store';

interface MemeState {
  templates: MemeTemplate[];
  selectedTemplate: MemeTemplate | null;
  elements: MemeElement[];
  selectedElement: MemeElement | null;
}

const initialState: MemeState = {
  templates: [],
  selectedTemplate: null,
  elements: [],
  selectedElement: null,
};

const memeSlice = createSlice({
  name: 'meme',
  initialState,
  reducers: {
    setTemplates: (state, action: PayloadAction<MemeTemplate[]>) => {
      state.templates = action.payload;
    },
    setSelectedTemplate: (state, action: PayloadAction<MemeTemplate>) => {
      state.selectedTemplate = action.payload;
    },
    addElement: (state, action: PayloadAction<MemeElement>) => {
      state.elements.push(action.payload);
    },
    updateElement: (
      state,
      action: PayloadAction<{id: string; updates: Partial<MemeElement>}>,
    ) => {
      const element = state.elements.find(el => el.id === action.payload.id);
      if (element) {
        Object.assign(element, action.payload.updates);
      }
    },
    setSelectedElement: (state, action: PayloadAction<MemeElement | null>) => {
      state.selectedElement = action.payload;
    },
  },
});

export const {
  setTemplates,
  setSelectedTemplate,
  addElement,
  updateElement,
  setSelectedElement,
} = memeSlice.actions;

export default memeSlice.reducer;
