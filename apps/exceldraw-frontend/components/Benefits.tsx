import React from 'react';
import { TrendingUp, Clock, Target, Shield } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Boost Productivity by 60%',
    description: 'Eliminate context switching between multiple tools. Everything you need is in one integrated workspace.',
    stat: '60%',
    statLabel: 'Productivity Increase'
  },
  {
    icon: Clock,
    title: 'Save Hours Every Week',
    description: 'Streamline your workflow with smart templates and automation features that handle repetitive tasks.',
    stat: '15hrs',
    statLabel: 'Weekly Time Saved'
  },
  {
    icon: Target,
    title: 'Improve Decision Making',
    description: 'Visualize complex data relationships with interactive diagrams that make insights crystal clear.',
    stat: '40%',
    statLabel: 'Faster Decisions'
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    description: 'Bank-level encryption, SOC 2 compliance, and granular permissions keep your data safe.',
    stat: '99.9%',
    statLabel: 'Uptime SLA'
  }
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">
            Why Teams Choose Shapify
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            See the measurable impact on your team's productivity and decision-making
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-3 font-light">
                    {benefit.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-medium text-blue-400">{benefit.stat}</span>
                    <span className="text-sm text-gray-500 font-light">{benefit.statLabel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:pl-8">
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-medium text-white mb-6">Perfect For</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300 font-light">Business Analysts & Consultants</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300 font-light">Project Managers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300 font-light">Data Scientists</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300 font-light">Operations Teams</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-300 font-light">Financial Planners</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-300 font-light">Product Managers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}