"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  TrendingUp,
  Users,
  RefreshCw,
  ArrowLeft,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar/navbar";

export default function AdminDashboard() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [data, setData] = useState<{
    newSubscriptions: number;
    mrr: number;
    reactivations: number;
    totalActive: number;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      setLoading(true);
      fetch(`/api/admin/subscription-metrics?start=${startDate}&end=${endDate}`)
        .then((res) => res.json())
        .then((res) => {
          // handle error gracefully
          if (res?.error) {
            console.error("API error:", res.error);
            setData(null);
          } else {
            setData(res);
          }
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [startDate, endDate]);

  const MetricCard = ({
    title,
    value,
    icon: Icon,
    gradient,
    delay = 0,
  }: {
    title: string;
    value: string | number;
    icon: any;
    gradient: string;
    delay?: number;
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        <div className={`${gradient} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-orange-100 text-sm font-medium mb-2">
                {title}
              </p>
              <p className="text-3xl font-bold">{value}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Icon className="h-8 w-8" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

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
            <h1 className="text-5xl font-bold text-white mb-4 mt-20">
              Admin Dashboard
            </h1>
            <p className="text-xl text-orange-100">
              Monitor SEA Catering subscription metrics and performance
            </p>
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
        {/* Date Range Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <Calendar className="h-6 w-6 text-orange-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">
              Select Date Range
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Start Date
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-orange-200 focus:border-orange-400 rounded-xl transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                End Date
              </label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-orange-200 focus:border-orange-400 rounded-xl transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-12 text-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <motion.div
                className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <motion.p
                className="mt-4 text-orange-600 text-lg font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Loading metrics...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Metrics Display */}
        <AnimatePresence>
          {data && !loading && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MetricCard
                title="New Subscriptions"
                value={data.newSubscriptions}
                icon={TrendingUp}
                gradient="bg-gradient-to-r from-green-500 to-green-600"
                delay={0.1}
              />

              <MetricCard
                title="Monthly Recurring Revenue"
                value={`Rp ${data.mrr.toLocaleString("id-ID")}`}
                icon={BarChart3}
                gradient="bg-gradient-to-r from-orange-500 to-orange-600"
                delay={0.2}
              />

              <MetricCard
                title="Reactivations"
                value={data.reactivations}
                icon={RefreshCw}
                gradient="bg-gradient-to-r from-blue-500 to-blue-600"
                delay={0.3}
              />

              <MetricCard
                title="Total Active Subscriptions"
                value={data.totalActive}
                icon={Users}
                gradient="bg-gradient-to-r from-purple-500 to-purple-600"
                delay={0.4}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {!data && !loading && (startDate === "" || endDate === "") && (
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-12 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <h3 className="text-2xl font-bold text-orange-600 mb-4">
                Select Date Range
              </h3>
              <p className="text-orange-400 text-lg">
                Choose a start and end date to view subscription metrics and
                analytics.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-8 py-3 text-lg font-medium"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Main Dashboard
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
