import instance from "../customizeAPI";

export interface UploadResponse {
  code: number;
  message: string;
  data: {
    url: string;
  };
}

export const uploadImage = async (file: File): Promise<string> => {
  try {
    console.log('Converting file to base64:', file.name, 'Size:', file.size, 'Type:', file.type);
    
    // Convert file to base64 data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target?.result as string;
        if (base64Data) {
          console.log('File converted to base64 successfully');
          resolve(base64Data);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw new Error(error instanceof Error ? error.message : 'Không thể xử lý hình ảnh');
  }
};
