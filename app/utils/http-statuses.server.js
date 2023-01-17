import { json } from "@remix-run/node"

export function succeedResponse(data) {
  return json(data, { status: 200 })
}

export function createdResponse(data) {
  return json(data, { status: 201 })
}

export function badRequest(data) {
  return json(data, { status: 400 })
}

export function internalServerError(data) {
  return json(data, { status: 500 })
}

export function notImplemented(data) {
  return json(data, { status: 501 })
}
