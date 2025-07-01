// meal-plans/components/MealPlanCard.tsx
import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, Star, Heart, Eye, ChefHat } from 'lucide-react'
import { motion } from 'framer-motion'
import { MealPlanCardProps } from '@/types/meal-plans'

// Extended props to include viewMode
interface EnhancedMealPlanCardProps extends MealPlanCardProps {
  viewMode?: 'grid' | 'list'
}

const MealPlanCard: React.FC<EnhancedMealPlanCardProps> = ({ 
  mealPlan, 
  onSeeMore, 
  viewMode = 'grid' 
}) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white border-l-4 border-l-orange-400">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              {/* Image */}
              <motion.div 
                className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <ChefHat className="text-white text-2xl" />
                <motion.div
                  className="absolute inset-0 bg-white opacity-20"
                  initial={{ x: '-100%' }}
                  animate={isHovered ? { x: '100%' } : { x: '-100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{mealPlan.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        {mealPlan.category}
                      </Badge>
                      <Badge variant="outline" className="border-orange-300 text-orange-600">
                        <Clock className="w-3 h-3 mr-1" />
                        {mealPlan.duration}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-orange-600">Rp.{mealPlan.price.toString()}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-3 line-clamp-2">{mealPlan.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {mealPlan.meals.length} meals
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                      4.8
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleLike}
                      className="p-2 rounded-full hover:bg-orange-50 transition-colors"
                    >
                      <Heart 
                        className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                      />
                    </motion.button>
                    <Button onClick={() => onSeeMore(mealPlan)} className="bg-orange-500 hover:bg-orange-600">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white group">
        {/* Image with Overlay */}
        <div className="relative h-48 bg-gradient-to-br from-orange-400 to-orange-600 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <ChefHat className="text-white text-3xl mb-2 mx-auto" />
              <span className="text-white text-xl font-semibold">{mealPlan.name}</span>
            </motion.div>
          </div>
          
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
          >
            <Heart 
              className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} 
            />
          </motion.button>

          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: '100%' } : { x: '-100%' }}
            transition={{ duration: 0.8 }}
          />
        </div>
        
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <motion.h3 
              className="text-xl font-bold text-gray-900"
              whileHover={{ color: '#ea580c' }}
            >
              {mealPlan.name}
            </motion.h3>
            <motion.span 
              className="text-2xl font-bold text-orange-600"
              whileHover={{ scale: 1.05 }}
            >
              Rp.{mealPlan.price.toString()}
            </motion.span>
          </div>
          
          <div className="mb-4 flex flex-wrap gap-2">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                {mealPlan.category}
              </Badge>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Badge variant="outline" className="border-orange-300 text-orange-600">
                <Clock className="w-3 h-3 mr-1" />
                {mealPlan.duration}
              </Badge>
            </motion.div>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-3">{mealPlan.description}</p>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2 font-medium">Key Features:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              {mealPlan.features.slice(0, 3).map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.span 
                    className="text-orange-500 mr-2"
                    whileHover={{ scale: 1.2 }}
                  >
                    ✓
                  </motion.span>
                  {feature}
                </motion.li>
              ))}
              {mealPlan.features.length > 3 && (
                <li className="text-orange-400 font-medium">
                  + {mealPlan.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {mealPlan.meals.length} meals
              </span>
              <span className="flex items-center">
                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                4.8
              </span>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => onSeeMore(mealPlan)}
                className="bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Eye className="w-4 h-4 mr-2" />
                See Details
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default MealPlanCard