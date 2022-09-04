import { Request, Response, Router } from 'express';
import { bucketManager } from '../services'

const router = Router()

router.post('/has-solution', (req: Request, res: Response) => {
  const { X, Y, Z } = req.body
  const bManager = new bucketManager(X, Y, Z )

  res.send(bManager.hasSolution ? 'It has a solution!' : 'No solution this time.')
})

router.post('/steps', (req: Request, res: Response) => {
  const { X, Y, Z } = req.body
  const bManager = new bucketManager(X, Y, Z )

  res.json(bManager.getMinSteps())
})

export default router
