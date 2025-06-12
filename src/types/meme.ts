export interface MemeTemplate {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
}

export interface MemeElementCommonStyle {
  opacity: number;
  backgroundColor: string;
}

export interface MemeElementTextStyle extends MemeElementCommonStyle {
  color: string;
  fontFamily: string;
  fontSize: number;
  textAlign: 'left' | 'center' | 'right';
}

export interface MemeElementImageStyle extends MemeElementCommonStyle {}

interface MemeElementBase {
  id: string;
  position: {
    x: number;
    y: number;
  };
  scale: number;
  rotation: number;
}

interface MemeElementText extends MemeElementBase {
  type: 'text';
  /** Text content */
  content: string;
  style: MemeElementTextStyle;
}

interface MemeElementImage extends MemeElementBase {
  type: 'image';
  /** Image URI */
  content: string;
  style: MemeElementImageStyle;
}

export type MemeElement = MemeElementText | MemeElementImage;

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
