import { Heart, Store, Truck } from "lucide-react";
import Image from "next/image";

function Heroes() {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="space-y-6">
          <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <Store className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold">Food Donors</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Restaurants, stores, and individuals with surplus food
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold">NGOs & Food Banks</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Organizations helping distribute food to those in need
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
              <Truck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold">Volunteer Drivers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Heroes who make food redistribution possible
              </p>
            </div>
          </div>
        </div>
        <div className="relative h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Food Distribution"
            className="rounded-lg object-cover w-full h-full"
            width={800}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}

export default Heroes;
