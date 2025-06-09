const IMGFLIP_API_URL = 'https://api.imgflip.com';

export interface MemeTemplate {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

interface ImgflipResponse {
  success: boolean;
  data: {
    memes: MemeTemplate[];
  };
}

export const getMemeTemplates = async (): Promise<MemeTemplate[]> => {
  try {
    const response = await fetch(`${IMGFLIP_API_URL}/get_memes`);
    const jsonResponse = (await response.json()) as ImgflipResponse;
    return jsonResponse.data.memes;
  } catch (error) {
    console.error('Error fetching meme templates:', error);
    return [];
  }
};
