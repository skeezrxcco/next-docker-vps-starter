import 'server-only'
import { prisma } from '@/lib/prisma'
import { cache } from 'react'
export const getData = cache(async () => { return await prisma.user.findMany() })