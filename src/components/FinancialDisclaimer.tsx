'use client'

interface DisclaimerProps {
  type?: 'calculator' | 'investment' | 'tax' | 'general'
}

export default function FinancialDisclaimer({ type = 'general' }: DisclaimerProps) {
  const disclaimers = {
    calculator: {
      title: '📊 Calculator Disclaimer',
      content: [
        'The calculations provided are estimates based on the information you enter and standard financial formulas.',
        'Results should be used for educational and planning purposes only, not as professional financial advice.',
        'Actual results may vary based on individual circumstances, market conditions, and changes in regulations.',
        'For personalized financial advice, please consult with a qualified financial advisor.'
      ]
    },
    investment: {
      title: '⚠️ Investment Disclaimer',
      content: [
        'Investment information is provided for educational purposes only and does not constitute investment advice.',
        'Past performance is not indicative of future results. All investments carry risk, including possible loss of principal.',
        'Before making investment decisions, consider your financial situation, goals, and risk tolerance.',
        'Consult with a licensed financial advisor or investment professional for personalized investment guidance.',
        'Finance Hub is not a registered investment advisor and does not provide investment advisory services.'
      ]
    },
    tax: {
      title: '💼 Tax Disclaimer',
      content: [
        'Tax information provided is general in nature and based on current tax laws, which are subject to change.',
        'Individual tax situations vary significantly. This information should not be considered tax advice.',
        'Tax laws differ by jurisdiction. Consult with a qualified tax professional (CPA or EA) for advice specific to your situation.',
        'Finance Hub does not provide tax preparation or tax advisory services.'
      ]
    },
    general: {
      title: '⚖️ General Financial Disclaimer',
      content: [
        'Content on Finance Hub is for informational and educational purposes only.',
        'We are not licensed financial advisors, investment advisors, tax professionals, or attorneys.',
        'Information provided does not constitute professional financial, investment, tax, or legal advice.',
        'Before making financial decisions, consult with appropriate licensed professionals.',
        'While our content is reviewed by certified professionals, individual circumstances vary significantly.'
      ]
    }
  }

  const disclaimer = disclaimers[type]

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
      <div className="flex items-start gap-3">
        <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-200 mb-3">
            {disclaimer.title}
          </h3>
          <div className="space-y-2 text-sm text-yellow-800 dark:text-yellow-300">
            {disclaimer.content.map((text, idx) => (
              <p key={idx} className="flex items-start gap-2">
                <span className="text-yellow-600 dark:text-yellow-500 mt-0.5">•</span>
                <span>{text}</span>
              </p>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-yellow-300 dark:border-yellow-700">
            <p className="text-xs text-yellow-700 dark:text-yellow-400 font-medium">
              Content reviewed by certified financial professionals. Last updated: January 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
