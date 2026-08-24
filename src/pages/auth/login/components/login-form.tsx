"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

import { loginSchema, type LoginFormValues } from "../redux/login-schema"
import { useAppDispatch } from "@/lib/redux/hooks"
import { useNavigate } from "react-router-dom"
import { loginSuccess, setProfile } from "../../redux/auth.slice"
import { Gender } from "../../redux/auth.types"
import { fetchMe, loginRequest } from "../../redux/auth.api"
import { notifier } from "@/lib/utils/notifier"

export function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      keepSignedIn: true,
    },
  })

  async function onSubmit(values: LoginFormValues) {
    try {
      // Real login against the Express backend (POST /api/v1/auth/login)
      const tokens = await loginRequest({
        email: values.email,
        password: values.password,
      })

      dispatch(
        loginSuccess({
          tokens: {
            access: tokens.accessToken,
            refresh: tokens.refreshToken,
          },
          isAuthenticated: true,
          isSuperUser: true,
          profile: null,
          keepSignedIn: values.keepSignedIn,
        })
      )

      // Fetch the real logged-in user (GET /api/v1/auth/me)
      const user = await fetchMe()

      dispatch(
        setProfile({
          id: user.id,
          authProvider: "LOCAL",
          dateJoined: user.createdAt,
          email: user.email,
          username: user.email,
          fullName: user.name,
          personalId: user.personalId,
          gender: Gender.RATHER_NOT_TO_SAY,
          headline: "",
          isActive: true,
          isEmailVerified: true,
          isPhoneVerified: false,
          linkedinLink: null,
          phoneNo: "",
          permissions: ["*"],
          websiteLink: null,
        })
      )

      navigate("/dashboard")
    } catch (error) {
      notifier.error("Invalid email or password.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@trinity.edu.np"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <a
            href="#"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••••••"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2.5 py-1">
        <Controller
          name="keepSignedIn"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="keepSignedIn"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
            />
          )}
        />
        <Label
          htmlFor="keepSignedIn"
          className="font-normal text-muted-foreground"
        >
          Keep me signed in on this device
        </Label>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>

      {/*<div className="flex items-center gap-3 py-2">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      <Button type="button" variant="outline" size="lg" className="w-full">
        Continue with college SSO
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        New to Classmates?{" "}
        <a href="#" className="font-medium text-primary hover:underline">
          Ask your department admin for access
        </a>
      </p>*/}
    </form>
  )
}
