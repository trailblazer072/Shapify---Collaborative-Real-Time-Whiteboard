import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Data Analyst, TechCorp',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Shapify revolutionized how we present data insights. The ability to create visual diagrams directly from our spreadsheet data is a game-changer.',
    rating: 5
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Project Manager, StartupXYZ',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'Finally, a tool that bridges the gap between data analysis and visual communication. Our stakeholder presentations have never been clearer.',
    rating: 5
  },
  {
    name: 'Emma Thompson',
    role: 'Business Consultant, Global Solutions',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    quote: 'The real-time collaboration features are incredible. Our remote team can work together seamlessly on complex financial models and process maps.',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">
            Loved by Teams Worldwide
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Join thousands of professionals who've transformed their workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:shadow-lg transition-all duration-300 relative"
            >
              <div className="absolute top-4 right-4">
                <Quote className="w-8 h-8 text-gray-700" />
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed italic font-light">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center space-x-3">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400 font-light">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 max-w-4xl mx-auto border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-light text-blue-400 mb-2">50K+</div>
                <div className="text-gray-400 font-light">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-light text-cyan-400 mb-2">1M+</div>
                <div className="text-gray-400 font-light">Documents Created</div>
              </div>
              <div>
                <div className="text-3xl font-light text-green-400 mb-2">99.9%</div>
                <div className="text-gray-400 font-light">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}