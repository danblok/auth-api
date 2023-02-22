import dotenv from 'dotenv'
import express, { Express } from 'express'
import { authRouter, dishRouter } from './router'
import { prisma } from './utils/prisma'

dotenv.config()

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = Number(process.env.PORT) || 3001

app.use('/auth', authRouter)
app.use('/', dishRouter)

export async function start() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`)
    })
  } catch (error: unknown) {
    await prisma.$disconnect()
  }
}
