import {createAsyncThunk} from '@reduxjs/toolkit';

import {MemeTemplate} from '~/types/meme';

const IMGFLIP_API_URL = 'https://api.imgflip.com';

interface ImgflipResponse {
  success: boolean;
  data: {
    memes: MemeTemplate[];
  };
}

export const fetchTemplates = createAsyncThunk(
  'meme/fetchTemplates',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch(`${IMGFLIP_API_URL}/get_memes`);
      if (!response.ok) {
        throw new Error('Failed to fetch meme');
      }
      const jsonResponse = (await response.json()) as ImgflipResponse;
      return jsonResponse.data.memes;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
