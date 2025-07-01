export interface Meal {
    id: string;
    name: string;
    description: string;
    calories?: number;
    protein?: number;
    carbs?: number;
    fats?: number;
    mealType: string;
    mealPlanId: string;
  }
  
  export interface MealPlan {
    id: string;
    name: string;
    price: number;
    description: string;
    duration: string;
    category: string;
    features: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    meals: Meal[];
  }
  
  export interface Subscription {
    id: string;
    planName: string;
    mealTypes: string[];
    deliveryDays: string[];
    totalPrice: number;
    allergies?: string;
    status: 'ACTIVE' | 'PAUSED' | 'CANCELLED';
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  }
  
  export interface SubscriptionFormData {
    name: string;
    phone: string;
    planCategory: string;
    subscriptionType: 'package' | 'custom';
    days: string[];
    selectedMeals: {
      breakfast: string;
      lunch: string;
      dinner: string;
    };
    allergies: string;
  }
  
  export interface CreateSubscriptionRequest {
    planName: string;
    mealTypes: string[];
    deliveryDays: string[];
    totalPrice: number;
    allergies?: string;
    userId: string;
  }
  
  export const MEAL_PRICES = {
    breakfast: 30000,
    lunch: 40000,
    dinner: 35000,
  } as const;
  
  export const DAYS_OF_WEEK = [
    'Monday',
    'Tuesday', 
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ] as const;
  
  export const SUBSCRIPTION_STATUS = {
    ACTIVE: 'ACTIVE',
    PAUSED: 'PAUSED',
    CANCELLED: 'CANCELLED'
  } as const;
  
  export const MEAL_CATEGORIES = [
    'balanced',
    'muscle gain', 
    'weight loss'
  ] as const;