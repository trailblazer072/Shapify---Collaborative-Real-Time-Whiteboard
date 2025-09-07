"use client"
import React from 'react';
import { ArrowRight, Play, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter()
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            Online Whiteboard 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 block font-normal">
              Made simple
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            Ideate, Collaborate, Share. Simply with Shapify.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-light hover:bg-blue-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2" onClick={()=>{
              router.push("/signin")
            }}>
              Start Drawing
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-light hover:border-blue-400 hover:text-blue-400 transition-all duration-200 flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>

          <div className="relative mx-auto max-w-5xl">
            <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
              <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-400 ml-4 font-light">Shapify - Dev Architecture</div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-gray-300 text-lg font-light">Interactive Demo Preview</p>
                  <p className="text-gray-400 text-sm mt-2 font-light">Spreadsheet + Drawing Interface</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}