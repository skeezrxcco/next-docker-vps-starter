import React from 'react'
import { getData } from '../actions'

export default async function UsersCard() {
  const users = await getData()
  if (!users) return null 
  return users.map((user) => (
    <article key={user.id} className="border p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
      <time className="text-sm text-gray-500">
        {user.createdAt.toLocaleDateString()}
      </time>
      {/*  NEW*/}
    </article>
  ))
}
