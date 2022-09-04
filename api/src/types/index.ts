export interface Step {
  from: number
  to: number
  detail: (a: string, b: string) => string
}

interface SuccessSolution {
  [key: string]: string | number
  Explanation: string
}

type FailSolution = 'No Solution'

export type Solution = SuccessSolution[] | FailSolution
