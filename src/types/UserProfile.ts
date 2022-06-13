export type UserProfile = {
  clientID: string
  created_at: Date
  email: string
  email_verified: boolean
  given_name: string
  identities: Identity[]
  locale: string
  name: string
  nickname: string
  picture: string
  updated_at: Date
  user_id: string
  user_metadata: Metadata
  app_metadata: Metadata
  sub: string
}

export type Metadata = {}

export type Identity = {
  provider: string
  user_id: string
  connection: string
  isSocial: boolean
}
