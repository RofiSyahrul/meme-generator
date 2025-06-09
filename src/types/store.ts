export interface MemeTemplate {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
}

export interface MemeElement {
  id: string;
  type: 'text' | 'image';
  content: string;
  position: {
    x: number;
    y: number;
  };
  scale: number;
  rotation: number;
  style?: {
    fontSize?: number;
    color?: string;
    fontFamily?: string;
    textAlign?: 'left' | 'center' | 'right';
    opacity?: number;
    blur?: number;
  };
}

export interface MemeState {
  templates: MemeTemplate[];
  selectedTemplate: MemeTemplate | null;
  elements: MemeElement[];
  selectedElement: MemeElement | null;
  loading: boolean;
}

export interface RootState {
  meme: MemeState;
}
