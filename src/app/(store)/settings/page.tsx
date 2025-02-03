"use client";
import { ModeToggle } from "@/app/components/theme";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";


function Settings() {
  const { isSignedIn, user } = useUser();
  

  return (
    <div className="pl-20 flex justify-center items-center min-h-screen ">
      {/* Settings Card */}
      <div className="w-full border max-w-lg p-8  rounded-2xl shadow-lg">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-6">
          Settings
        </h2>

        {/* Profile Section */}
        <div className="flex items-center justify-between mb-6">
          {!isSignedIn && (
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                Sign In
              </button>
            </SignInButton>
          )}

          {isSignedIn && (
            <div className="flex items-center space-x-4 ">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "3rem",
                      height: "3rem",
                    },
                  },
                }}
              />
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Admin</p>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-700 dark:text-gray-300">Theme</span>
          <ModeToggle />
        </div>

        {/* Notifications */}
        <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-700 dark:text-gray-300">Push Notifications</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Language Selector */}
        <div className="flex justify-between items-center py-4">
          <span className="text-gray-700 dark:text-gray-300">Language</span>
          <select className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Settings;