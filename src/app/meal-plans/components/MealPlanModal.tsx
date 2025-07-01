import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  X,
  Clock,
  Users,
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Utensils,
  Zap,
  Award,
  ChefHat,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MealPlanModalProps } from "@/types/meal-plans";
import { Meal } from "@prisma/client";
import Link from "next/link";

const MealPlanModal: React.FC<MealPlanModalProps> = ({
  mealPlan,
  isOpen,
  onClose,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedMealType, setSelectedMealType] = useState<string>("");

  useEffect(() => {
    if (isOpen && mealPlan) {
      const mealTypes = Object.keys(groupedMeals);
      if (mealTypes.length > 0) {
        setSelectedMealType(mealTypes[0]);
      }
    }
  }, [isOpen, mealPlan]);

  if (!isOpen || !mealPlan) return null;

  const groupedMeals = mealPlan.meals.reduce((acc, meal) => {
    if (!acc[meal.mealType]) {
      acc[meal.mealType] = [];
    }
    acc[meal.mealType].push(meal);
    return acc;
  }, {} as Record<string, Meal[]>);

  const handleShare = () => {
    navigator
      .share?.({
        title: mealPlan.name,
        text: mealPlan.description,
        url: window.location.href,
      })
      .catch(() => {
        navigator.clipboard.writeText(window.location.href);
      });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
            >
              <X className="h-6 w-6" />
            </motion.button>

            <div className="flex items-start justify-between pr-16">
              <div className="flex-1">
                <motion.h2
                  className="text-4xl font-bold mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {mealPlan.name}
                </motion.h2>
                <motion.div
                  className="flex items-center gap-4 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Clock className="w-3 h-3 mr-1" />
                    {mealPlan.duration}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Users className="w-3 h-3 mr-1" />
                    {mealPlan.meals.length} meals
                  </Badge>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-300 text-yellow-300" />
                    <span className="font-medium">4.8 (124 reviews)</span>
                  </div>
                </motion.div>
                <motion.p
                  className="text-orange-100 text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {mealPlan.description}
                </motion.p>
              </div>

              <motion.div
                className="text-right"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-3xl font-bold mb-2">
                  Rp.{mealPlan.price.toString()}
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isLiked ? "fill-red-300 text-red-300" : "text-white"
                      }`}
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto max-h-[calc(95vh-200px)]">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-orange-50 p-1 rounded-xl">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-600 font-medium"
                >
                  <Award className="w-4 h-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="meals"
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-600 font-medium"
                >
                  <Utensils className="w-4 h-4 mr-2" />
                  Meals
                </TabsTrigger>
                <TabsTrigger
                  value="nutrition"
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-600 font-medium"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Nutrition
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <motion.div
                  className="grid md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-orange-50">
                      <CardTitle className="text-orange-800 flex items-center">
                        <Award className="w-5 h-5 mr-2" />
                        Plan Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">
                          Duration:
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-700"
                        >
                          {mealPlan.duration}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">
                          Category:
                        </span>
                        <Badge
                          variant="outline"
                          className="border-orange-300 text-orange-600"
                        >
                          {mealPlan.category}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">
                          Total Meals:
                        </span>
                        <span className="font-semibold text-orange-600">
                          {mealPlan.meals.length}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-orange-50">
                      <CardTitle className="text-orange-800 flex items-center">
                        <Star className="w-5 h-5 mr-2" />
                        Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <ul className="space-y-2">
                        {mealPlan.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                          >
                            <motion.span
                              className="text-orange-500 mr-3 text-lg"
                              whileHover={{ scale: 1.2 }}
                            >
                              ✓
                            </motion.span>
                            <span className="text-gray-700">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Meals Tab */}
              <TabsContent value="meals" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Meal Type Selector */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {Object.keys(groupedMeals).map((mealType) => (
                      <motion.button
                        key={mealType}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedMealType(mealType)}
                        className={`px-4 py-2 rounded-full font-medium transition-all ${
                          selectedMealType === mealType
                            ? "bg-orange-500 text-white shadow-lg"
                            : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                        }`}
                      >
                        {mealType} ({groupedMeals[mealType].length})
                      </motion.button>
                    ))}
                  </div>

                  {/* Selected Meal Type */}
                  <AnimatePresence mode="wait">
                    {selectedMealType && (
                      <motion.div
                        key={selectedMealType}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <h4 className="text-xl font-semibold text-gray-800 border-b border-orange-200 pb-2">
                          <ChefHat className="inline w-5 h-5 mr-2 text-orange-500" />
                          {selectedMealType}
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {groupedMeals[selectedMealType]?.map(
                            (meal, index) => (
                              <motion.div
                                key={meal.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:shadow-lg transition-all hover:scale-105">
                                  <CardContent className="p-5">
                                    <h5 className="font-semibold text-gray-900 mb-2 text-lg">
                                      {meal.name}
                                    </h5>
                                    <p className="text-sm text-gray-600 mb-4">
                                      {meal.description}
                                    </p>
                                    {(meal.calories ||
                                      meal.protein ||
                                      meal.carbs ||
                                      meal.fats) && (
                                      <div className="grid grid-cols-2 gap-3 text-xs">
                                        {meal.calories && (
                                          <div className="flex items-center justify-between bg-white/60 p-2 rounded-lg">
                                            <span className="text-gray-600">
                                              Calories:
                                            </span>
                                            <span className="font-semibold text-orange-600">
                                              {meal.calories}
                                            </span>
                                          </div>
                                        )}
                                        {meal.protein && (
                                          <div className="flex items-center justify-between bg-white/60 p-2 rounded-lg">
                                            <span className="text-gray-600">
                                              Protein:
                                            </span>
                                            <span className="font-semibold text-orange-600">
                                              {meal.protein.toString()}g
                                            </span>
                                          </div>
                                        )}
                                        {meal.carbs && (
                                          <div className="flex items-center justify-between bg-white/60 p-2 rounded-lg">
                                            <span className="text-gray-600">
                                              Carbs:
                                            </span>
                                            <span className="font-semibold text-orange-600">
                                              {meal.carbs.toString()}g
                                            </span>
                                          </div>
                                        )}
                                        {meal.fats && (
                                          <div className="flex items-center justify-between bg-white/60 p-2 rounded-lg">
                                            <span className="text-gray-600">
                                              Fats:
                                            </span>
                                            <span className="font-semibold text-orange-600">
                                              {meal.fats.toString()}g
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </motion.div>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </TabsContent>

              {/* Nutrition Tab */}
              <TabsContent value="nutrition" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center py-12"
                >
                  <Zap className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Nutrition Information
                  </h3>
                  <p className="text-gray-600">
                    Detailed nutrition facts and analysis coming soon!
                  </p>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <motion.div
            className="flex justify-between items-center gap-4 p-8 bg-gray-50 border-t"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-left">
              <div className="text-2xl font-bold text-orange-600">
                Rp.{mealPlan.price.toString()}
              </div>
              <div className="text-sm text-gray-500">per week</div>
            </div>
            <div className="flex gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  Close
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() =>
                    (window.location.href = `/subscription?planId=${mealPlan.id}`)
                  }
                  className="bg-orange-500 hover:bg-orange-600 shadow-lg"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Select This Plan
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MealPlanModal;
