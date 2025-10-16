import Link from 'next/link';

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: {
    text: string;
    href: string;
  };
  featured?: boolean;
}

interface PricingTableProps {
  plans: Plan[];
}

export function PricingTable({ plans }: PricingTableProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative rounded-2xl p-8 ${
            plan.featured
              ? 'bg-blue-600 text-white shadow-xl scale-105'
              : 'bg-white border border-gray-200 shadow-sm'
          }`}
        >
          {plan.featured && (
            <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium px-4 py-1 rounded-full">
              Most Popular
            </span>
          )}

          <div className="text-center mb-8">
            <h3 className={`text-2xl font-bold mb-2 ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
              {plan.name}
            </h3>
            <p className={`text-sm mb-4 ${plan.featured ? 'text-blue-100' : 'text-gray-600'}`}>
              {plan.description}
            </p>
            <div className="flex items-baseline justify-center">
              <span className={`text-5xl font-bold ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                {plan.price}
              </span>
              {plan.period && (
                <span className={`ml-2 ${plan.featured ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.period}
                </span>
              )}
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                    plan.featured ? 'text-blue-100' : 'text-green-500'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className={plan.featured ? 'text-white' : 'text-gray-700'}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href={plan.cta.href}
            className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
              plan.featured
                ? 'bg-white text-blue-600 hover:bg-blue-50'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {plan.cta.text}
          </Link>
        </div>
      ))}
    </div>
  );
}