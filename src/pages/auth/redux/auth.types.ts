export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
  RATHER_NOT_TO_SAY: "RATHER_NOT_TO_SAY",
} as const

export type Gender = (typeof Gender)[keyof typeof Gender]

export interface IRole {
  id: number
  name: string
  codename: string
}

export interface ITokens {
  refresh: string
  access: string
}

export interface IAuthState {
  tokens: ITokens | null
  isAuthenticated?: boolean
  isSuperUser?: boolean
  profile: IUserProfile | null
}

export interface IUserProfile {
  id: string
  authProvider: string
  dateJoined: string
  email: string
  username: string
  fullName: string
  personalId: string | null
  gender: Gender
  headline: string
  isActive: boolean
  isEmailVerified: boolean
  isPhoneVerified: boolean
  linkedinLink: string | null
  phoneNo: string
  permissions?: string[] | null
  websiteLink: string | null
}
