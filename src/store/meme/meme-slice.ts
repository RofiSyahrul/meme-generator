import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import type {
  MemeElement,
  MemeElementCommonStyle,
  MemeElementImageStyle,
  MemeElementTextStyle,
  MemeTemplate,
} from '~/types/meme';

import {fetchTemplates} from './meme-service';
import {WritableDraft} from 'immer';

interface MemeState {
  templates: MemeTemplate[];
  selectedTemplate: MemeTemplate | null;
  elementMap: Record<string, MemeElement>;
  selectedElement: MemeElement | null;
  draggingElementId: string | null;
  templateHeight: number;
  templateWidth: number;
  loading: boolean;
  error: string | null;
}

const initialState: MemeState = {
  templates: [],
  selectedTemplate: null,
  elementMap: {},
  selectedElement: null,
  draggingElementId: null,
  templateHeight: 0,
  templateWidth: 0,
  loading: true,
  error: null,
};

type ElementStyleField = keyof (MemeElementTextStyle & MemeElementImageStyle);

type UpdateElementStylePayload<K extends ElementStyleField> = {
  id: string;
  name: K;
  value: MemeElementTextStyle[K];
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
      state.selectedElement = action.payload;
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
    removeElement: (state, action: PayloadAction<string>) => {
      delete state.elementMap[action.payload];
      if (state.selectedElement?.id === action.payload) {
        state.selectedElement = null;
      }
      if (state.draggingElementId === action.payload) {
        state.draggingElementId = null;
      }
    },
    duplicateElement: (state, action: PayloadAction<string>) => {
      const element = state.elementMap[action.payload];
      if (element) {
        const newElement: MemeElement = {
          ...element,
          id: Date.now().toString(),
          position: {
            x: element.position.x + 20,
            y: element.position.y + 20,
          },
        };
        state.elementMap[newElement.id] = newElement;
      }
    },
    updateCommonElementStyle: <K extends keyof MemeElementCommonStyle>(
      state: WritableDraft<MemeState>,
      action: PayloadAction<UpdateElementStylePayload<K>>,
    ) => {
      const element = state.elementMap[action.payload.id];
      if (element) {
        element.style[action.payload.name] = action.payload.value;
      }
      if (state.selectedElement?.id === action.payload.id) {
        state.selectedElement.style[action.payload.name] = action.payload.value;
      }
    },
    updateTextElementStyle: <K extends keyof MemeElementTextStyle>(
      state: WritableDraft<MemeState>,
      action: PayloadAction<UpdateElementStylePayload<K>>,
    ) => {
      const element = state.elementMap[action.payload.id];
      if (element?.type === 'text') {
        element.style[action.payload.name] = action.payload.value;
      }
      if (
        state.selectedElement?.type === 'text' &&
        state.selectedElement.id === action.payload.id
      ) {
        state.selectedElement.style[action.payload.name] = action.payload.value;
      }
    },
    setDraggingElementId: (state, action: PayloadAction<string | null>) => {
      state.draggingElementId = action.payload;
    },
    setTemplateSize: (
      state,
      action: PayloadAction<{height: number; width: number}>,
    ) => {
      const {height, width} = action.payload;
      if (state.templateHeight !== height) {
        state.templateHeight = height;
      }
      if (state.templateWidth !== width) {
        state.templateWidth = width;
      }
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
  removeElement,
  duplicateElement,
  setDraggingElementId,
  setTemplateSize,
} = memeSlice.actions;

export const updateTextElementStyle = <K extends keyof MemeElementTextStyle>(
  payload: UpdateElementStylePayload<K>,
) => {
  return memeSlice.actions.updateTextElementStyle(payload);
};

export const updateCommonElementStyle = <
  K extends keyof MemeElementCommonStyle,
>(
  payload: UpdateElementStylePayload<K>,
) => {
  return memeSlice.actions.updateCommonElementStyle(payload);
};

export default memeSlice;
