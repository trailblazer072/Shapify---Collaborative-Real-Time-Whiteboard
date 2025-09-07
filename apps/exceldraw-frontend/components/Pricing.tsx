import React from 'react';
import { Check, Zap, Crown, Building } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    icon: Zap,
    price: 0,
    period: 'forever',
    description: 'Perfect for individuals and small projects',
    features: [
      'Up to 3 documents',
      'Basic spreadsheet functions',
      'Simple drawing tools',
      'Export to PDF/Excel',
      'Community support'
    ],
    cta: 'Start Free',
    popular: false
  },
  {
    name: 'Pro',
    icon: Crown,
    price: 12,
    period: 'per user/month',
    description: 'For professional teams and advanced workflows',
    features: [
      'Unlimited documents',
      'Advanced functions & formulas',
      'Professional drawing tools',
      'Real-time collaboration',
      'All export formats',
      'Priority support',
      'Custom templates',
      'Version history'
    ],
    cta: 'Start 14-Day Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    icon: Building,
    price: 'Custom',
    period: 'per user/month',
    description: 'For large organizations with custom needs',
    features: [
      'Everything in Pro',
      'SSO integration',
      'Advanced security controls',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantees',
      'On-premise deployment',
      'Custom training'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Choose the plan that fits your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-xl border-2 p-8 relative hover:shadow-lg transition-all duration-300 ${
                plan.popular 
                  ? 'bg-gray-800 border-blue-500 shadow-lg scale-105' 
                  : 'bg-gray-800 border-gray-700 hover:border-blue-400'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-1 rounded-full text-sm font-light">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-400' 
                    : 'bg-gradient-to-br from-gray-700 to-gray-600'
                }`}>
                  <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-gray-300'}`} />
                </div>
                
                <h3 className="text-2xl font-medium text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-light text-white">
                    {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                  </span>
                  <span className="text-gray-400 ml-1 font-light">/{plan.period}</span>
                </div>
                <p className="text-gray-400 font-light">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 font-light">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-4 rounded-lg font-light transition-colors ${
                plan.popular
                  ? 'bg-blue-600 text-white hover:bg-blue-500'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4 font-light">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 font-light">
            <span>✓ Cancel anytime</span>
            <span>✓ 30-day money-back guarantee</span>
            <span>✓ Free migration assistance</span>
          </div>
        </div>
      </div>
    </section>
  );
}