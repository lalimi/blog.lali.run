import * as React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseClasses = 'rounded-lg shadow-sm'
    const variants = {
      default: 'bg-white',
      outline: 'border border-gray-200 bg-white'
    }
    
    return React.createElement('div', {
      ref,
      className: `${baseClasses} ${variants[variant]} ${className || ''}`,
      ...props
    })
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    React.createElement('div', {
      ref,
      className: `flex flex-col space-y-1.5 p-6 ${className || ''}`,
      ...props
    })
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    React.createElement('h3', {
      ref,
      className: `text-lg font-semibold leading-none tracking-tight ${className || ''}`,
      ...props
    })
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    React.createElement('p', {
      ref,
      className: `text-sm text-gray-600 ${className || ''}`,
      ...props
    })
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    React.createElement('div', {
      ref,
      className: `p-6 pt-0 ${className || ''}`,
      ...props
    })
  )
)
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardDescription, CardContent }