"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Grid,
  List,
  SortAsc,
  SortDesc,
  Route,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MealPlanCard from "./components/MealPlanCard";
import MealPlanModal from "./components/MealPlanModal";
import { MealPlanWithMeals } from "@/types/meal-plans";
import { Navbar } from "@/components/navbar/navbar";

const MealPlansPage: React.FC = () => {
  const [mealPlans, setMealPlans] = useState<MealPlanWithMeals[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMealPlan, setSelectedMealPlan] =
    useState<MealPlanWithMeals | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "price" | "duration">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch meal plans
  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await fetch("/api/meal-plans");
        if (response.ok) {
          const data = await response.json();
          setMealPlans(data);
        }
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlans();
  }, []);

  const handleSeeMore = (mealPlan: MealPlanWithMeals) => {
    setSelectedMealPlan(mealPlan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMealPlan(null);
  };

  const categories = [
    "All",
    ...Array.from(new Set(mealPlans.map((plan) => plan.category))),
  ];

  const filteredMealPlans = mealPlans
    .filter((plan) => {
      const matchesCategory = filter === "All" || plan.category === filter;
      const matchesSearch =
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = Number(a.price) - Number(b.price);
          break;
        case "duration":
          comparison = a.duration.localeCompare(b.duration);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const toggleSort = (field: "name" | "price" | "duration") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleBackToMainPage = () => {
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="animate-spin rounded-full h-32 w-32 border-b-4 border-orange-500 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="mt-6 text-orange-600 text-lg font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading delicious meal plans...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
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
              Our Meal Plans
            </h1>
            <p className="text-xl text-orange-100">
              Choose the perfect meal plan for your lifestyle and goals
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search meal plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg border-2 border-orange-200 focus:border-orange-400 rounded-xl"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>

            <div className="flex bg-orange-100 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-orange-500 text-white"
                    : "text-orange-600 hover:bg-orange-200"
                }
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-orange-500 text-white"
                    : "text-orange-600 hover:bg-orange-200"
                }
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              {(["name", "price", "duration"] as const).map((field) => (
                <Button
                  key={field}
                  variant={sortBy === field ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSort(field)}
                  className={
                    sortBy === field
                      ? "bg-orange-500 text-white"
                      : "border-orange-300 text-orange-600 hover:bg-orange-50"
                  }
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {sortBy === field &&
                    (sortOrder === "asc" ? (
                      <SortAsc className="ml-1 h-3 w-3" />
                    ) : (
                      <SortDesc className="ml-1 h-3 w-3" />
                    ))}
                </Button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-orange-200"
              >
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <motion.div
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={filter === category ? "default" : "outline"}
                        onClick={() => setFilter(category)}
                        className={
                          filter === category
                            ? "bg-orange-500 text-white shadow-lg"
                            : "border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400"
                        }
                      >
                        {category}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <AnimatePresence>
          {filteredMealPlans.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="text-6xl mb-4">🍽️</div>
              <p className="text-orange-400 text-xl font-medium">
                No meal plans found
              </p>
              <p className="text-orange-300 mt-2">
                Try adjusting your search or filters
              </p>
            </motion.div>
          ) : (
            <motion.div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }
              layout
            >
              {filteredMealPlans.map((mealPlan, index) => (
                <motion.div
                  key={mealPlan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  layout
                >
                  <MealPlanCard
                    mealPlan={mealPlan}
                    onSeeMore={handleSeeMore}
                    viewMode={viewMode}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Button
        onClick={() => handleBackToMainPage()}
        className="bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full mb-6 justify-center items-center mx-auto flex px-6 py-3"
      >
        Back
      </Button>

      <MealPlanModal
        mealPlan={selectedMealPlan}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MealPlansPage;
