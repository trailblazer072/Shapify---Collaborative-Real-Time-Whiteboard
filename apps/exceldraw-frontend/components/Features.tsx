import React from 'react';
import { Grid3x3, PenTool, BarChart3, Users, Download, Zap, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Grid3x3,
    title: 'Powerful Spreadsheet Engine',
    description: 'Full-featured spreadsheet with formulas, functions, and data manipulation capabilities that rivals traditional tools.'
  },
  {
    icon: PenTool,
    title: 'Integrated Drawing Tools',
    description: 'Create diagrams, flowcharts, and annotations directly on your spreadsheet data with professional drawing tools.'
  },
  {
    icon: BarChart3,
    title: 'Dynamic Data Visualization',
    description: 'Transform your data into stunning charts and interactive visualizations with automatic updates as data changes.'
  },
  {
    icon: Users,
    title: 'Real-time Collaboration',
    description: 'Work together in real-time with your team. See changes instantly and collaborate seamlessly on complex projects.'
  },
  {
    icon: Download,
    title: 'Universal Export',
    description: 'Export to Excel, PDF, SVG, PNG, or share interactive links. Your work is portable and accessible everywhere.'
  },
  {
    icon: Zap,
    title: 'Smart Automation',
    description: 'Automate repetitive tasks with smart templates, data connections, and workflow triggers to boost productivity.'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">
            Everything You Need in One Platform
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Discover the perfect blend of analytical power and visual creativity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-blue-500 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-cyan-900 rounded-lg flex items-center justify-center mb-6 group-hover:from-blue-700 group-hover:to-cyan-700 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-light hover:bg-blue-500 transition-colors inline-flex items-center gap-2">
            Start Drawing
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}