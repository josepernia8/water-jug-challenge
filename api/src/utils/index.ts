import { Step, Solution } from '../types'

// Greatest Commun Divisor Utility
export const gcd = (x: number, y: number): number => (y == 0) ? x : gcd(y, x % y)

export const processOutput = (steps: Step[], reverse: boolean = false): Solution => {
  return steps.map(({ from, to, detail }) => {
    const a = reverse ? { label: 'Bucket Y', value: to } : { label: 'Bucket X', value: from }
    const b = reverse ? { label: 'Bucket X', value: from } : { label: 'Bucket Y', value: to }

    return {
      [a.label]: a.value,
      [b.label]: b.value,
      'Explanation': detail(a.label, b.label)
    }
  })
}
