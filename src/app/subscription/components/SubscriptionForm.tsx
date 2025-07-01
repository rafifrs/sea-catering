"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  MealPlan,
  Meal,
  SubscriptionFormData,
  MEAL_PRICES,
  DAYS_OF_WEEK,
  MEAL_CATEGORIES,
} from "../../../types/subscription";
import {
  calculateCustomPrice,
  calculatePackagePrice,
  formatPriceWithoutSymbol,
  validateDeliveryDays,
  validateMealSelection,
  getDefaultMealSelection,
} from "../../../utils/subscription";

export default function SubscriptionForm() {
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<SubscriptionFormData>({
    name: "",
    phone: "",
    planCategory: "",
    subscriptionType: "custom",
    days: [],
    selectedMeals: {
      breakfast: "",
      lunch: "",
      dinner: "",
    },
    allergies: "",
  });

  useEffect(() => {
    fetchMealPlans();
  }, []);

  useEffect(() => {
    if (session?.user?.name) {
      setFormData((prev) => ({ ...prev, name: session?.user?.name || "" }));
    }
  }, [session]);

  const fetchMealPlans = async () => {
    setLoading(true);
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

  const getSelectedPlan = () => {
    return mealPlans.find(
      (plan) =>
        plan.category.toLowerCase() === formData.planCategory.toLowerCase()
    );
  };

  const getMealsByType = (type: string) => {
    const selectedPlan = getSelectedPlan();
    return (
      selectedPlan?.meals.filter(
        (meal) => meal.mealType.toLowerCase() === type.toLowerCase()
      ) || []
    );
  };

  const calculatePrice = () => {
    const selectedPlan = getSelectedPlan();
    if (formData.subscriptionType === "package" && selectedPlan) {
      return calculatePackagePrice(selectedPlan.price);
    } else {
      return calculateCustomPrice(formData.days);
    }
  };

  const handleInputChange = (field: keyof SubscriptionFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const handleMealSelection = (
    mealType: "breakfast" | "lunch" | "dinner",
    mealId: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      selectedMeals: {
        ...prev.selectedMeals,
        [mealType]: mealId,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!session?.user?.id) {
      alert("Please login to subscribe");
      return;
    }

    setSubmitting(true);
    try {
      const selectedPlan = getSelectedPlan();
      const subscriptionData = {
        planName: selectedPlan?.name || `Custom ${formData.planCategory} Plan`,
        mealTypes: ["Breakfast", "Lunch", "Dinner"],
        deliveryDays: formData.days,
        totalPrice: calculatePrice(),
        allergies: formData.allergies || null,
        userId: session.user.id,
      };

      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscriptionData),
      });

      if (response.ok) {
        alert("Subscription created successfully!");
        setStep(1);
        setFormData({
          name: "",
          phone: "",
          planCategory: "",
          subscriptionType: "custom",
          days: [],
          selectedMeals: { breakfast: "", lunch: "", dinner: "" },
          allergies: "",
        });
      } else {
        throw new Error("Failed to create subscription");
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      alert("Error creating subscription. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const phoneIsValid = /^08\d{8,11}$/.test(formData.phone);
  const canProceedToStep2 = formData.name.trim() && phoneIsValid;

  const canProceedToStep3 = formData.planCategory;
  const canProceedToStep4 =
    formData.subscriptionType === "package" ||
    (validateDeliveryDays(formData.days) &&
      validateMealSelection(formData.selectedMeals, formData.subscriptionType));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  step >= num ? "bg-orange-500" : "bg-gray-300"
                }`}
              >
                {num}
              </div>
              {num < 4 && (
                <div
                  className={`h-1 w-24 mx-4 ${
                    step > num ? "bg-orange-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center text-gray-600">
          Step {step} of 4:{" "}
          {step === 1
            ? "Personal Information"
            : step === 2
            ? "Select Plan Category"
            : step === 3
            ? "Customize Your Plan"
            : "Review & Confirm"}
        </div>
      </div>

      {/* Step 1: Personal Information */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">
            Personal Information
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your phone number"
            />
          </div>

          <button
            onClick={nextStep}
            disabled={!canProceedToStep2}
            className={`w-full py-3 rounded-lg font-medium ${
              canProceedToStep2
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Select Plan Category */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">
            Select Your Plan Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MEAL_CATEGORIES.map((category) => {
              const plan = mealPlans.find(
                (p) => p.category.toLowerCase() === category.toLowerCase()
              );
              return (
                <div
                  key={category}
                  onClick={() => handleInputChange("planCategory", category)}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.planCategory === category
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2 capitalize">
                    {category}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {plan?.description || "Perfect for your lifestyle"}
                  </p>
                  <p className="text-orange-600 font-bold">
                    Rp {formatPriceWithoutSymbol(plan?.price || 0)}/week
                  </p>
                  {plan?.features && (
                    <ul className="mt-4 text-sm text-gray-600">
                      {plan.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center mb-1">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={prevStep}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!canProceedToStep3}
              className={`flex-1 py-3 rounded-lg font-medium ${
                canProceedToStep3
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Customize Plan */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">
            Customize Your Plan
          </h2>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Choose Your Option
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => handleInputChange("subscriptionType", "custom")}
                className={`p-4 border-2 rounded-lg cursor-pointer ${
                  formData.subscriptionType === "custom"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200"
                }`}
              >
                <h4 className="font-bold text-gray-800">Custom Plan</h4>
                <p className="text-sm text-gray-600">
                  Choose your own meals for each type
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Days */}
          {formData.subscriptionType === "custom" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Select Delivery Days
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {DAYS_OF_WEEK.map((day) => (
                  <label
                    key={day}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.days.includes(day)}
                      onChange={() => handleDayToggle(day)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">{day}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Custom Meal Selection */}
          {formData.subscriptionType === "custom" && (
            <div className="space-y-6">
              {["breakfast", "lunch", "dinner"].map((mealType) => (
                <div key={mealType}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 capitalize">
                    Select {mealType} (Rp{" "}
                    {formatPriceWithoutSymbol(
                      MEAL_PRICES[mealType as keyof typeof MEAL_PRICES]
                    )}
                    )
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getMealsByType(mealType).map((meal) => (
                      <div
                        key={meal.id}
                        onClick={() =>
                          handleMealSelection(
                            mealType as "breakfast" | "lunch" | "dinner",
                            meal.id
                          )
                        }
                        className={`p-4 border-2 rounded-lg cursor-pointer ${
                          formData.selectedMeals[
                            mealType as keyof typeof formData.selectedMeals
                          ] === meal.id
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200"
                        }`}
                      >
                        <h4 className="font-bold text-gray-800">{meal.name}</h4>
                        <p className="text-sm text-gray-600">
                          {meal.description}
                        </p>
                        {meal.calories && (
                          <p className="text-sm text-orange-600 mt-2">
                            {meal.calories} calories
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Allergies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allergies or Dietary Restrictions (Optional)
            </label>
            <textarea
              value={formData.allergies}
              onChange={(e) => handleInputChange("allergies", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              rows={3}
              placeholder="Let us know about any allergies or dietary restrictions..."
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={prevStep}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!canProceedToStep4}
              className={`flex-1 py-3 rounded-lg font-medium ${
                canProceedToStep4
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Review & Confirm */}
      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">
            Review Your Subscription
          </h2>

          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-800">
                  Personal Information
                </h3>
                <p className="text-gray-600">Name: {formData.name}</p>
                <p className="text-gray-600">Phone: {formData.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Plan Details</h3>
                <p className="text-gray-600 capitalize">
                  Category: {formData.planCategory}
                </p>
                <p className="text-gray-600 capitalize">
                  Type: {formData.subscriptionType} Plan
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">Delivery Schedule</h3>
              {formData.subscriptionType === "package" ? (
                <>
                  <p className="text-gray-600">
                    Days: Monday, Tuesday, Wednesday, Thursday, Friday,
                    Saturday, Sunday
                  </p>
                  <p className="text-gray-600">Total Days per Week: 7</p>
                </>
              ) : (
                <>
                  <p className="text-gray-600">
                    Days: {formData.days.join(", ")}
                  </p>
                  <p className="text-gray-600">
                    Total Days per Week: {formData.days.length}
                  </p>
                </>
              )}
            </div>

            {formData.allergies && (
              <div>
                <h3 className="font-semibold text-gray-800">
                  Allergies/Restrictions
                </h3>
                <p className="text-gray-600">{formData.allergies}</p>
              </div>
            )}

            <div className="border-t pt-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                Price Breakdown
              </h3>
              {formData.subscriptionType === "package" ? (
                <p className="text-gray-600 flex justify-between">
                  <span>{formData.planCategory} Plan (Package)</span>
                  <span>
                    Rp {formatPriceWithoutSymbol(getSelectedPlan()?.price || 0)}
                  </span>
                </p>
              ) : (
                <>
                  {formData.days.map((day) => (
                    <div key={day} className="text-gray-600">
                      <span className="font-medium">{day}</span>
                      <ul className="ml-4 list-disc">
                        {["breakfast", "lunch", "dinner"].map((mealType) => {
                          const mealId =
                            formData.selectedMeals[
                              mealType as keyof typeof formData.selectedMeals
                            ];
                          if (!mealId) return null;
                          const meal = getMealsByType(mealType).find(
                            (m) => m.id === mealId
                          );
                          return (
                            <li key={mealId}>
                              {meal?.name || "Meal"} - Rp{" "}
                              {formatPriceWithoutSymbol(
                                MEAL_PRICES[
                                  mealType as keyof typeof MEAL_PRICES
                                ]
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </>
              )}
              <div className="flex justify-between text-xl font-bold pt-2 border-t mt-2">
                <span>Total Weekly Price:</span>
                <span className="text-orange-600">
                  Rp {formatPriceWithoutSymbol(calculatePrice())}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={prevStep}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`flex-1 py-3 rounded-lg font-medium ${
                submitting
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              {submitting ? "Creating Subscription..." : "Confirm Subscription"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
