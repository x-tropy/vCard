'use client';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useState } from 'react';
import { TabPanelTitle } from 'lib/components/Misc';
import { Input } from 'lib/components/ui/input';
import { Upload } from 'lucide-react';
import { Button } from 'lib/components/ui/button';
import { Send } from 'lucide-react';
import { updateAvatar } from 'lib/db';
import { Feedback } from 'lib/components/Misc';

export default function MyEditor({ currentAvatar, user_id }) {
  currentAvatar = currentAvatar || '/default_avatar.png';
  const [src, setSrc] = useState(null);
  const [serverResponse, setServerResponse] = useState(null);
  const [crop, setCrop] = useState({
    x: 25,
    y: 25,
    height: 150,
    width: 150,
    unit: 'px',
  });
  const [croppedImage, setCroppedImage] = useState(null);
  const cropAreaWidth = 300;

  async function hanldeOnChange(crop) {
    setCrop(crop);
    const base64Avatar = await getCroppedPart(src, cropAreaWidth, crop.x, crop.y, crop.width, crop.height);
    setCroppedImage(base64Avatar);
  }

  return (
    <div className="space-y-6">
      <TabPanelTitle
        title="Avatar"
        description="You can drag around and scale it, see how it looks in different shapes."
      />
      <div className="space-y-6">
        {/* Display current avatar */}
        <div className="flex flex-row space-x-4">
          <img className="h-28 w-28 rounded-full shadow-md border border-spacing-2" src={currentAvatar} />
          <img className="h-28 w-28 rounded-md shadow-md border border-spacing-2" src={currentAvatar} />
        </div>
        <label
          htmlFor="fileInput"
          className="flex flex-row items-center justify-center rounded-md border p-3 text-sm cursor-pointer hover:bg-slate-50">
          <Upload className="mr-2 h-4 w-4" />
          <span>Upload your avatar</span>
        </label>
        <Input
          className="hidden"
          id="fileInput"
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              setSrc(reader.result);
            });
            reader.readAsDataURL(file);
          }}
        />
      </div>
      {src && (
        <div className="space-y-6">
          <div className="flex flex-row space-x-4">
            <ReactCrop crop={crop} aspect={1 / 1} minHeight={40} keepSelection={true} onChange={hanldeOnChange}>
              <img src={src} width={cropAreaWidth} />
            </ReactCrop>
            {/* <pre>{JSON.stringify(crop, null, 2)}</pre> */}
            <div className="flex flex-col space-y-4">
              <div>Drag it around to see the preview:</div>
              <img className="h-28 w-28 rounded-md shadow-md border border-spacing-2" src={croppedImage} />
              <img className="h-28 w-28 rounded-full shadow-md border border-spacing-2" src={croppedImage} />
            </div>
          </div>
          <Button
            onClick={async () => {
              const result = await updateAvatar({
                user_id,
                avatar: croppedImage,
              });
              setServerResponse(result);
            }}>
            <Send className="mr-2 h-4 w-4" />
            Save changes
          </Button>
          {serverResponse && <Feedback {...serverResponse} />}
        </div>
      )}
    </div>
  );
}

async function getCroppedPart(imageSrc, cropAreaWidth, cropX, cropY, cropWidth, cropHeight) {
  // Create a temporary canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Create an image element
  const image = new Image();

  // Set the image source
  image.src = imageSrc;

  const scale = image.width / cropAreaWidth;

  // Wait for the image to load
  await new Promise((resolve) => {
    image.onload = resolve;
  });

  // Set the canvas size to match the crop size
  canvas.width = cropWidth;
  canvas.height = cropHeight;

  // Draw the cropped part of the image onto the canvas
  ctx.drawImage(
    image,
    cropX * scale,
    cropY * scale,
    cropWidth * scale,
    cropHeight * scale,
    0,
    0,
    cropWidth,
    cropHeight
  );

  // Get the data URL of the cropped image
  const croppedImageDataUrl = canvas.toDataURL('image/png');

  // Use the cropped image data as needed
  // console.log('Cropped Image Data URL:', croppedImageDataUrl);
  return croppedImageDataUrl;
}
