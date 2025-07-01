"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, Utensils, MapPin, Pause, X, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar/navbar"

interface Subscription {
  id: string
  planName: string
  mealTypes: string[]
  deliveryDays: string[]
  totalPrice: number
  status: string
  createdAt: string
  pauseStartDate?: string
  pauseEndDate?: string
  reactivatedAt?: string
}

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
      case "paused":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg"
      case "cancelled":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg"
    }
  }

  return (
    <motion.span
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all ${getStatusStyles(status)}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {status.toUpperCase()}
    </motion.span>
  )
}

export default function UserDashboard() {
  const { data: session } = useSession()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const res = await fetch("/api/subscriptions")
      if (res.ok) {
        const data = await res.json()
        setSubscriptions(data)
      }
      setLoading(false)
    }

    fetchSubscriptions()
  }, [])

  const handlePause = async (id: string) => {
    const start = prompt("Enter pause start date (YYYY-MM-DD)")
    const end = prompt("Enter pause end date (YYYY-MM-DD)")
    if (!start || !end) return

    await fetch(`/api/subscriptions/${id}/pause`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pauseStartDate: start, pauseEndDate: end }),
    })
    location.reload()
  }

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this subscription?")) return
    await fetch(`/api/subscriptions/${id}/cancel`, { method: "POST" })
    location.reload()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div
            className="animate-spin rounded-full h-32 w-32 border-b-4 border-orange-500 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.p
            className="mt-6 text-orange-600 text-lg font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Loading your subscriptions...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Hero Header */}
      <motion.div
        className="bg-gradient-to-r from-orange-600 to-orange-500 shadow-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-white mb-4 mt-20">Your Subscriptions</h1>
            <p className="text-xl text-orange-100">Manage your SEA Catering meal subscriptions</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {/* Empty State */}
        <AnimatePresence>
          {subscriptions.length === 0 && (
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-12 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="text-6xl mb-6">🍽️</div>
              <h3 className="text-2xl font-bold text-orange-600 mb-4">No subscriptions found</h3>
              <p className="text-orange-400 text-lg">Start your culinary journey with SEA Catering today!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subscriptions Grid */}
        <AnimatePresence>
          {subscriptions.length > 0 && (
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8" layout>
              {subscriptions.map((sub, index) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  layout
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{sub.planName}</h2>
                        <StatusBadge status={sub.status} />
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold">Rp {sub.totalPrice.toLocaleString()}</p>
                        <p className="text-orange-100 text-sm">per month</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Details Grid */}
                    <div className="space-y-6">
                      {/* Meal Types */}
                      <div>
                        <div className="flex items-center mb-3">
                          <Utensils className="h-5 w-5 text-orange-500 mr-2" />
                          <h4 className="font-semibold text-gray-800">Meal Types</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {sub.mealTypes.map((meal, index) => (
                            <motion.span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border border-orange-300"
                              whileHover={{ scale: 1.05 }}
                            >
                              {meal}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Days */}
                      <div>
                        <div className="flex items-center mb-3">
                          <MapPin className="h-5 w-5 text-orange-500 mr-2" />
                          <h4 className="font-semibold text-gray-800">Delivery Days</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {sub.deliveryDays.map((day, index) => (
                            <motion.span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300"
                              whileHover={{ scale: 1.05 }}
                            >
                              {day}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Subscription Details */}
                      <div>
                        <div className="flex items-center mb-3">
                          <Calendar className="h-5 w-5 text-orange-500 mr-2" />
                          <h4 className="font-semibold text-gray-800">Subscription Details</h4>
                        </div>
                        <div className="space-y-2">
                          <p className="text-gray-600 flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="font-medium">Started:</span>
                            <span className="ml-2">{format(new Date(sub.createdAt), "dd MMM yyyy")}</span>
                          </p>
                          {sub.pauseStartDate && (
                            <p className="text-yellow-600 flex items-center">
                              <Pause className="h-4 w-4 mr-2" />
                              <span className="font-medium">Paused:</span>
                              <span className="ml-2">
                                {sub.pauseStartDate} to {sub.pauseEndDate}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                        <Button
                          onClick={() => handlePause(sub.id)}
                          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-3"
                        >
                          <Pause className="mr-2 h-4 w-4" />
                          Pause Subscription
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                        <Button
                          onClick={() => handleCancel(sub.id)}
                          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-3"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel Subscription
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-8 py-3 text-lg font-medium"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Dashboard
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
