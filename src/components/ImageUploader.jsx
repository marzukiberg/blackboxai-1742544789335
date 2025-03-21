import { useState, useRef } from 'react'

function ImageUploader({ onImageSelect }) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const validateFile = (file) => {
    if (!file.type.startsWith('image/')) {
      throw new Error('Please upload an image file')
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size must be less than 5MB')
    }
  }

  const handleFile = async (file) => {
    try {
      setError(null)
      validateFile(file)
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)
      
      // Pass the file to parent component
      onImageSelect(file)
    } catch (err) {
      setError(err.message)
      setPreview(null)
    }
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      await handleFile(file)
    }
  }

  const handleFileInput = async (e) => {
    const file = e.target.files[0]
    if (file) {
      await handleFile(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`drag-drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept="image/*"
          className="hidden"
        />
        
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg"
            />
            <p className="mt-2 text-sm text-gray-500">
              Click or drag another image to replace
            </p>
          </div>
        ) : (
          <div>
            <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
            <p className="text-lg mb-2">
              Drag and drop your image here or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports: JPG, PNG, WEBP (max 5MB)
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}
    </div>
  )
}

export default ImageUploader