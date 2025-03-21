import BackgroundRemoval from '../components/BackgroundRemoval'

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Remove Image Backgrounds Instantly
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get perfect results in seconds with our AI-powered background removal tool
        </p>
      </section>

      {/* Background Removal Tool */}
      <section className="mb-16">
        <BackgroundRemoval />
      </section>

      {/* Pricing Section */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Simple, Transparent Pricing
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Tier */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-4">Free Download</h3>
            <div className="text-4xl font-bold mb-6">$0</div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                Standard quality images
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                Unlimited downloads
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                Basic support
              </li>
            </ul>
            <button className="w-full btn-secondary">
              Start Free
            </button>
          </div>

          {/* HD Tier */}
          <div className="bg-blue-600 text-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-4">HD Download</h3>
            <div className="text-4xl font-bold mb-6">1 Credit</div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <i className="fas fa-check mr-2"></i>
                High quality images
              </li>
              <li className="flex items-center">
                <i className="fas fa-check mr-2"></i>
                Commercial usage
              </li>
              <li className="flex items-center">
                <i className="fas fa-check mr-2"></i>
                Priority support
              </li>
            </ul>
            <button className="w-full bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Get Credits
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home