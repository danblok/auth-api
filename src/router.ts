import { Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from './utils/prisma'

export const authRouter = Router()
export const dishRouter = Router()

authRouter.post(
  '/register',
  async (
    req: Request<
      Record<string, never>,
      Record<string, never>,
      { email: string; password: string; login: string }
    >,
    res: Response
  ) => {
    try {
      const { email, password, login } = req.body
      await prisma.user.create({
        data: {
          email: email,
          password: password,
          login: login,
        },
      })
      res.status(201).end()
    } catch (error: unknown) {
      res.status(400).end()
    }
  }
)

authRouter.post(
  '/login',
  async (
    req: Request<
      Record<string, never>,
      Record<string, never>,
      { email: string; password: string }
    >,
    res: Response
  ) => {
    try {
      const { email, password } = req.body
      const user = await prisma.user.findFirst({
        where: {
          email: {
            equals: email,
          },
        },
      })

      if (user === null) {
        return res.status(401).json({ error: "The user hasn't been found" })
      }

      if (user.password !== password) {
        return res.status(400).json({ error: 'An authentication error' })
      }

      const token = jwt.sign(
        { id: user.email, maxAge: '30 days' },
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        process.env.JWT_KEY!
      )

      res.status(200).json({ token })
    } catch (error) {
      res.status(400)
    }
  }
)

dishRouter.get('/dishes', async (req: Request, res: Response) => {
  try {
    const versions = await prisma.dish.findMany({
      select: {
        version: true,
      },
      distinct: ['version'],
    })

    res.status(200).json({ versions })
  } catch (error) {
    res.status(400).json({ error: 'An error occured' })
  }
})

dishRouter.get(
  '/dishes/:version',
  async (req: Request<{ version: string }>, res: Response) => {
    try {
      const { version } = req.params
      const dishes = await prisma.dish.findMany({
        where: {
          version: version,
        },
      })

      res.status(200).json({ dishes })
    } catch (error) {
      res.status(400).json({ error: 'An error occured' })
    }
  }
)
