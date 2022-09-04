import { gcd, processOutput } from '../utils'
import { Solution, Step } from '../types'

/**
 * @class
 * @classdesc Manage different operations with Buckets: Fill, Dumb, Transfer
 */
export default class BucketManager {
  private X: number
  private Y: number
  private Z: number

  constructor(bucketA: number, bucketB: number, amountWanted: number) {
    this.X = bucketA
    this.Y = bucketB
    this.Z = amountWanted
  }

  /**
   * Execute the necessary steps to get "Z" gallons of water
   *
   * @param X Capacity of bucket from which water is poured
   * @param Y Capacity of bucket to which water is poured
   * @param Z Amount to be measured
   * @returns {Step[]}
   */
  performSteps = (X: number, Y: number, Z: number): Step[] => {
    // Initialize current amount of water in source and destination buckets
    let from = X
    let to = 0

    // Initialize array object with fill from bucket X to Y
    let steps = [{ from, to, detail: (a: string, _b: string) => `Fill bucket ${a}` }]

    // Break the loop when either of the two buckets has Z litre water
    while (from != Z && to != Z) {
      // Find the maximum amount that can be poured
      let temp = Math.min(from, Y - to)

      // Pour "temp" liters from "from" to "to"
      to += temp
      from -= temp

      steps.push({ from, to, detail: (a: string, b: string) => `Transfer bucket ${a} to bucket ${b}` })

      // Break the loop in current interation
      if (from == Z || to == Z) break

      // If first bucket becomes empty, fill it
      if (from == 0) {
        from = X
        steps.push({ from, to, detail: (a: string, _b: string) => `Fill bucket ${a}` })
      }

      // If second bucket becomes full, empty it
      if (to == Y) {
        to = 0
        steps.push({ from, to, detail: (a: string, _b: string) => `Dumb bucket ${a}` })
      }
    }
    return steps
  }

  get hasSolution():  boolean {
    const { X, Y, Z } = this

    // Calculate M, N values to use of guard clauses checking for "No Solution"
    let M = X, N = Y
    if (Y > X) {
      N = X
      M = Y
    }

    // If Z greater than n we cant measure the water
    if (Z > M) return false

    // If gcd of n and m does not divide Z then a solution is not possible
    if (Z % gcd(M, N) != 0) return false

    return true
  }

  /**
   * Returns count of minimum steps needed to measute the amount wanted
   *
   * @return {Solution}
   */
  getMinSteps = (): Solution => {
    const { X, Y, Z } = this

    if (!this.hasSolution) {
      return 'No Solution'
    }

    /* Return the most efficient way to measure the amount wanted by:
      1- Start filling bucket X
      2- Start filling bucket Y
    */
    const Xfirst = this.performSteps(X, Y, Z)
    const Yfirst = this.performSteps(Y, X, Z)

    return Xfirst.length < Yfirst.length ? processOutput(Xfirst) : processOutput(Yfirst, true)
  }
}
