'use client'
import DialogCategory from '@/components/DialogCategory'
import DialogDeleteCategory from '@/components/DialogDeleteCategory'
import DialogDeleteProduct from '@/components/DialogDeleteProduct'
import DialogNewCategory from '@/components/DialogNewCategory'
import DialogProduct from '@/components/DialogProduct'
import Table from '@/components/Table'
import useStore from '@/store/useStore'
import { Button } from '@mui/material'
import { CloudinaryUploadWidget } from 'react-cloudinary-uploader'



export default function PagePanel() {
  const setStateDialogCategory = useStore((state) => state.setStateDialogCategory)
  const setStateDialogProduct = useStore((state) => state.setStateDialogProduct)

  const pictureUploaderOptions = {
    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif'], // allowed file formats
    resourceType: 'image', // resource type, either 'image' or 'video'
    cropping: true, // cropping is enabled
    croppingAspectRatio: 1, // square aspect ratio
    croppingShowDimensions: true, // show cropping dimensions
    croppingValidateDimensions: true, // validate image dimensions after cropping
    maxFileSize: 10000000, // max file size in bytes (10 MB)
    folder: 'images', // Cloudinary folder to upload to
    sources: ['local'] // upload sources, either 'local', 'url', 'camera' or 'google_drive'
  }

  const handleUploadSuccess = (info) => {
    console.log('Upload success:', info)
  }

  const handleUploadFailure = (error) => {
    console.error('Upload error:', error)
  }

  return (
    <>
      <div className='tw-flex tw-flex-col tw-gap-4 tw-p-2'>
        <div className='tw-flex tw-gap-2'>
          <CloudinaryUploadWidget
          
            cloudName='dlltfgm4b'
            uploadPreset='yp5ecxto'
            options={pictureUploaderOptions}
            onUploadSuccess={handleUploadSuccess}
            onUploadFailure={handleUploadFailure}>
            <button
              style={{
                color: 'white',
                border: 'none',
                width: '120px',
                backgroundColor: '#bbb',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              className='custom-class'>
              Upload Picture
            </button>
          </CloudinaryUploadWidget>
          <Button
            onClick={() => setStateDialogCategory(true)}
            variant='contained'
            disableElevation
            size='small'
            className='!tw-capitalize'>
            Categorías
          </Button>
          <Button
            onClick={() => setStateDialogProduct(true)}
            variant='contained'
            disableElevation
            size='small'
            className='!tw-capitalize'>
            Nuevo Producto
          </Button>
          <Button variant='contained' disableElevation size='small' className='!tw-capitalize'>
            Config WhatsApp
          </Button>
        </div>
        <Table />
        {/* <div>
      </div> */}
      </div>
      <DialogCategory />
      <DialogNewCategory />
      <DialogDeleteCategory />
      <DialogDeleteProduct />
      <DialogProduct />
    </>
  )
}
