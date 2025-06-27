import Image from "next/image";
import { Navbar } from "@/components/navbar/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChefHat, Leaf, Phone, Star, Truck, UserCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const testimonialData = async () => {
  const testimonials = await prisma.testimonial.findMany({
    select: {
      customerName: true,
      rating: true,
      reviewMessage: true,
    },
  });
  return testimonials;
}

export default async function Home() {
  const testimonials = await testimonialData();
  return (
    <div className="relative min-h-screen">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `
      }} />
      
      <Navbar />
      
      <div className="relative bg-gradient-to-br from-[#fb9333] via-orange-500 to-amber-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative flex items-center justify-center pt-28 pb-20 px-4">
          <div className="mr-0 md:mr-48 mb-8 md:mb-0">
            <Image
              src="/hero.png"
              alt="Healthy Food"
              width={500}
              height={500}
              className="object-cover"
              priority
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
              SEA Catering
            </h1>
            <p className="mt-6 text-xl md:text-2xl font-semibold max-w-2xl text-white/95 drop-shadow">
              "Healthy Meals, Anytime, Anywhere"
            </p>
            <Link href="/subscription">
              <Button size="lg" className="mt-8 bg-white hover:bg-gray-100 font-bold text-lg px-10 py-6 rounded-full text-[#fb9333] shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Subscribe Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Welcome to Your{' '}
                <span className="text-orange-400 relative">
                  Healthy Lifestyle
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,8 Q50,0 100,8" stroke="#fb9333" strokeWidth="2" fill="none" opacity="0.7"/>
                  </svg>
                </span>{' '}
                Partner
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed font-medium mt-8 max-w-xl">
                SEA Catering is here to revolutionize how you eat. We provide a fully
                customizable healthy meal service with hassle-free delivery right to
                your doorstep, anywhere in Indonesia. Forget meal prep, and start
                enjoying delicious, nutritious food tailored just for you.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  Get Started Today
                </button>
                <button className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
                  View Menu
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-200 to-orange-300 rounded-3xl blur-2xl opacity-30"></div>
                <Image
                  src="/hero2.png"
                  alt="Delicious and healthy meal from SEA Catering"
                  width={450}
                  height={450}
                  className="relative rounded-2xl shadow-2xl object-cover w-full h-auto transform hover:scale-105 transition-transform duration-500 border-4 border-white"
                />
                <div className="absolute -top-4 -right-4 bg-orange-400 text-white px-4 py-2 rounded-full text-2xl font-bold shadow-lg">
                  Fresh Daily
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    
      <section className="px-4 bg-gradient-to-r from-slate-50 to-gray-100 flex justify-center items-center">
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-[#fb9333] to-orange-600">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              We make healthy eating simple, convenient, and delicious.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-white hover:bg-gray-50">
              <CardHeader>
                <div className="mx-auto bg-gradient-to-r from-[#fb9333] to-orange-600 p-4 rounded-full w-fit shadow-lg">
                  <ChefHat className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="mt-6 text-2xl font-bold text-gray-900">
                  Total Customization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  You are in control. Choose your diet plan, select your meals,
                  and tell us about your allergies. We'll craft the perfect meal
                  for you.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-white hover:bg-gray-50">
              <CardHeader>
                <div className="mx-auto bg-gradient-to-r from-[#fb9333] to-orange-600 p-4 rounded-full w-fit shadow-lg">
                  <Truck className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="mt-6 text-2xl font-bold text-gray-900">
                  Nationwide Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  From Sabang to Merauke, we deliver your healthy meals to major
                  cities across Indonesia, ensuring freshness and timeliness.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-3 border-0 bg-white hover:bg-gray-50">
              <CardHeader>
                <div className="mx-auto bg-gradient-to-r from-[#fb9333] to-orange-600 p-4 rounded-full w-fit shadow-lg">
                  <Leaf className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="mt-6 text-2xl font-bold text-gray-900">
                  Detailed Nutrition Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Knowledge is power. Every meal comes with detailed nutritional
                  information to help you track your intake and achieve your
                  health goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="review" className="py-20 px-4 bg-gradient-to-r from-gray-50 to-slate-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Others Think About Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Listen to our happy and healthy customers.
            </p>
          </div>
          <div className="relative w-full overflow-hidden">
            <div className="flex w-max animate-scroll">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <Card key={index} className="flex-shrink-0 w-[380px] mx-4 p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border-0">
                  <div className="bg-gradient-to-r from-[#fb9333] to-orange-600 p-4 rounded-full shadow-md">
                    <UserCircle2 className="h-16 w-16 text-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">{testimonial.customerName}</h3>
                  <div className="flex mt-3 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "{testimonial.reviewMessage}"
                  </blockquote>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-gradient-to-r from-[#fb9333] via-orange-500 to-amber-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
            Have Questions?
          </h2>
          <p className="text-xl mb-8 text-white/95 drop-shadow">
            Our manager is ready to assist you with any inquiries.
          </p>
          <div className="inline-flex items-center gap-6 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-xl border border-white/30">
            <div className="bg-white/20 p-3 rounded-full">
              <Phone className="h-8 w-8" />
            </div>
            <div className="text-left">
              <span className="block text-lg font-medium text-white/90">Manager: Brian</span>
              <a href="tel:08123456789" className="block text-2xl font-bold hover:underline hover:text-white/80 transition-colors">
                08123456789
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}