import { ClassmatesLogo } from "./components/classmates-logo"
import { LoginForm } from "./components/login-form"
import { TestimonialPanel } from "./components/testimonial-panel"

export default function LoginPage() {
  const year = new Date().getFullYear()

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: Sign-in form */}
      <div className="flex px-6 py-10 sm:px-12 lg:px-20">
        <div className="mx-auto flex min-h-full w-full max-w-sm flex-col">
          {/* Logo */}
          <ClassmatesLogo />

          {/* Center Content */}
          <div className="flex flex-1 flex-col justify-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Welcome back
              </h1>

              <p className="text-sm text-muted-foreground">
                Sign in to take attendance and check on your classes.
              </p>
            </div>

            <div className="mt-8">
              <LoginForm />
            </div>
          </div>

          {/* Footer */}
          <p className="mt-8 text-xs text-muted-foreground">
            © {year} Classmates. KayoBadger
          </p>
        </div>
      </div>

      {/* Right: Testimonial */}
      <div className="hidden w-full bg-muted lg:block">
        <TestimonialPanel />
      </div>
    </div>
  )
}
