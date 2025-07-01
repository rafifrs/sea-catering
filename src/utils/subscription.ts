import { MEAL_PRICES } from '../types/subscription';

export function calculateCustomPrice(days: string[]): number {
  const dailyPrice = MEAL_PRICES.breakfast + MEAL_PRICES.lunch + MEAL_PRICES.dinner;
  return dailyPrice * days.length;
}

export function calculatePackagePrice(packagePrice: number): number {
  return packagePrice;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceWithoutSymbol(price: number): string {
  return price.toLocaleString('id-ID');
}

export function validateDeliveryDays(days: string[]): boolean {
  const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days.length > 0 && days.every(day => validDays.includes(day));
}

export function validateMealSelection(
    selectedMeals: { breakfast: string; lunch: string; dinner: string },
    type: string
): boolean {
    if (type === 'package') return true;
    return Object.values(selectedMeals).some(mealId => mealId !== '');
}

export function getDefaultMealSelection(meals: any[], mealType: string): string {
  const mealsOfType = meals.filter(meal => 
    meal.mealType.toLowerCase() === mealType.toLowerCase()
  );
  return mealsOfType.length > 0 ? mealsOfType[0].id : '';
}

export function groupMealsByType(meals: any[]) {
  return meals.reduce((acc, meal) => {
    const type = meal.mealType.toLowerCase();
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(meal);
    return acc;
  }, {} as Record<string, any[]>);
}