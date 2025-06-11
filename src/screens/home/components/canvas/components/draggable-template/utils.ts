import {useState, useMemo, useEffect} from 'react';
import {useWindowDimensions} from 'react-native';

export const CONTAINER_PADDING = 16;
export const CONTAINER_PADDING_FACTOR = 2;

const TEMPLATE_PADDING_FACTOR = 4;
const SCALE_DOWN_FACTOR = 0.9;

const normalizeHeightAndGetScale = (
  height: number,
  maxHeight: number,
): {height: number; scale: number} => {
  const heightLimit = maxHeight - TEMPLATE_PADDING_FACTOR * CONTAINER_PADDING;
  let scale = 1;
  while (height > heightLimit) {
    scale *= SCALE_DOWN_FACTOR;
    height *= SCALE_DOWN_FACTOR;
  }
  return {height, scale};
};

export const useTemplateSize = (
  originalWidth: number,
  originalHeight: number,
  maxHeight: number,
): [number, number] => {
  const {width: windowWidth} = useWindowDimensions();

  const [templateHeight, setTemplateHeight] = useState(0);
  const [heightScale, setHeightScale] = useState(1);

  const templateWidth = useMemo(() => {
    return windowWidth - TEMPLATE_PADDING_FACTOR * CONTAINER_PADDING;
  }, [windowWidth]);

  useEffect(() => {
    setTemplateHeight(0);
    const aspectRatio =
      originalWidth > 0 && originalHeight > 0
        ? originalWidth / originalHeight
        : 1;
    const calculatedHeight = Math.floor(templateWidth / aspectRatio);
    const {height, scale} = normalizeHeightAndGetScale(
      calculatedHeight,
      maxHeight,
    );
    setTemplateHeight(height);
    setHeightScale(scale);
  }, [maxHeight, originalHeight, originalWidth, templateWidth]);

  return [heightScale * templateWidth, templateHeight];
};
