import { MealPlan, Meal } from '@prisma/client'

export type MealPlanWithMeals = MealPlan & {
  meals: Meal[]
}

export interface MealPlanModalProps {
  mealPlan: MealPlanWithMeals | null
  isOpen: boolean
  onClose: () => void
}

export interface MealPlanCardProps {
  mealPlan: MealPlanWithMeals
  onSeeMore: (mealPlan: MealPlanWithMeals) => void
}