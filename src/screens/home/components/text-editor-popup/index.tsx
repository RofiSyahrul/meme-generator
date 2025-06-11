import {useState, useEffect, useCallback} from 'react';

import {Button} from '~/components/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/dialog';
import {Input} from '~/components/input';
import {Text} from '~/components/text';
import {useAppDispatch, useAppSelector} from '~/store/hooks';
import {setSelectedElement, updateElement} from '~/store/meme/meme-slice';

export const TextEditorPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');

  const element = useAppSelector(state => state.meme.selectedElement);
  const isVisible = element?.type === 'text';

  useEffect(() => {
    setText(element?.content ?? '');
  }, [element?.content]);

  const handleClose = useCallback(() => {
    dispatch(setSelectedElement(null));
  }, [dispatch]);

  const handleOpenChange = useCallback(
    (value: boolean) => {
      if (!value) {
        handleClose();
      }
    },
    [handleClose],
  );

  const handleSave = useCallback(() => {
    if (element) {
      dispatch(
        updateElement({
          id: element.id,
          updates: {
            content: text,
          },
        }),
      );
    }
    handleClose();
  }, [dispatch, element, handleClose, text]);

  const handleCancel = useCallback(() => {
    setText(element?.content || '');
    handleClose();
  }, [element?.content, handleClose]);

  return (
    <Dialog open={isVisible} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Text</DialogTitle>
        </DialogHeader>
        <Input onChangeText={setText} value={text} />
        <DialogFooter>
          <Button variant="destructive" onPress={handleCancel}>
            <Text>Cancel</Text>
          </Button>
          <Button onPress={handleSave}>
            <Text>Save</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
