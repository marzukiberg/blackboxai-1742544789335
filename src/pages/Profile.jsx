import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'

function Profile() {
  const { user, credits, history } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* User Info Section */}
      <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Account Information</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-2">Email</p>
            <p className="font-semibold">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Available Credits</p>
            <p className="text-2xl font-bold text-blue-600">{credits}</p>
          </div>
        </div>
      </section>

      {/* Credits Section */}
      <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Purchase Credits</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[10, 25, 50].map((amount) => (
            <div
              key={amount}
              className="border rounded-lg p-6 text-center hover:border-blue-500 cursor-pointer transition-colors"
            >
              <div className="text-3xl font-bold mb-2">{amount}</div>
              <p className="text-gray-600 mb-4">Credits</p>
              <button className="w-full btn-primary">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* History Section */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Processing History</h2>
        {history.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            No processing history yet
          </p>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold">{item.originalName}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => window.open(item.processedUrl, '_blank')}
                  className="text-blue-600 hover:underline"
                >
                  View Result
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Profile