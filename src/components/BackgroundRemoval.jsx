import { useState } from 'react'
import { useAuth } from './AuthContext'
import ImageUploader from './ImageUploader'

function BackgroundRemoval() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [processedImage, setProcessedImage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const { user, useCredit, addToHistory } = useAuth()

  const simulateImageProcessing = async (image) => {
    // Simulate API call to remove background
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo, we'll just return the same image
        // In real implementation, this would be the processed image URL
        resolve(URL.createObjectURL(image))
      }, 2000)
    })
  }

  const handleImageSelect = (file) => {
    setSelectedImage(file)
    setProcessedImage(null)
    setError(null)
  }

  const handleRemoveBackground = async () => {
    try {
      setIsProcessing(true)
      setError(null)
      
      const processedImageUrl = await simulateImageProcessing(selectedImage)
      setProcessedImage(processedImageUrl)
      
      // Add to history
      addToHistory({
        originalName: selectedImage.name,
        processedUrl: processedImageUrl
      })
    } catch (err) {
      setError('Failed to process image. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = async (isHD) => {
    if (isHD && !user) {
      setError('Please login to download HD images')
      return
    }

    if (isHD && !useCredit()) {
      setError('Not enough credits for HD download')
      return
    }

    // Simulate download by opening image in new tab
    window.open(processedImage, '_blank')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-4">
          Remove Image Background
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Upload an image and we'll remove the background instantly
        </p>
        
        <ImageUploader onImageSelect={handleImageSelect} />
      </div>

      {selectedImage && !processedImage && (
        <div className="text-center">
          <button
            onClick={handleRemoveBackground}
            disabled={isProcessing}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Processing...
              </>
            ) : (
              'Remove Background'
            )}
          </button>
        </div>
      )}

      {processedImage && (
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Result</h3>
            <div className="flex justify-center mb-6">
              <img
                src={processedImage}
                alt="Processed"
                className="max-h-64 rounded-lg"
              />
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleDownload(false)}
                className="btn-secondary"
              >
                Download Free
              </button>
              <button
                onClick={() => handleDownload(true)}
                className="btn-primary"
              >
                Download HD
                <span className="ml-2 text-sm">
                  (1 Credit)
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}
    </div>
  )
}

export default BackgroundRemoval