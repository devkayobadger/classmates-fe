import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { notifier } from "@/lib/utils/notifier"
import { updateProfileRequest } from "@/pages/auth/redux/auth.api"
import { setProfile } from "@/pages/auth/redux/auth.slice"
import type { IUserProfile } from "@/pages/auth/redux/auth.types"

interface EditProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditProfileDialog({ open, onOpenChange }: EditProfileDialogProps) {
  const profile = useAppSelector((state) => state.auth.profile)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile name and personal ID. Changes are saved to
            your account.
          </DialogDescription>
        </DialogHeader>

        {profile ? (
          // Remounted each time the dialog opens (via `key`) so its form
          // state always starts fresh from the latest saved profile,
          // without needing an effect to re-sync it.
          <EditProfileForm
            key={open ? "open" : "closed"}
            profile={profile}
            onDone={() => onOpenChange(false)}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

interface EditProfileFormProps {
  profile: IUserProfile
  onDone: () => void
}

function EditProfileForm({ profile, onDone }: EditProfileFormProps) {
  const dispatch = useAppDispatch()

  const [fullName, setFullName] = useState(profile.fullName)
  const [personalId, setPersonalId] = useState(profile.personalId ?? "")
  const [isSaving, setIsSaving] = useState(false)

  const canSubmit = fullName.trim().length > 0 && !isSaving

  async function handleSubmit() {
    if (!canSubmit) return

    setIsSaving(true)

    try {
      // Persists to PostgreSQL for the authenticated user (PATCH /auth/me)
      const updated = await updateProfileRequest({
        name: fullName.trim(),
        personalId: personalId.trim().length > 0 ? personalId.trim() : null,
      })

      // Keep the store (and therefore every screen that reads the
      // profile, including the Dashboard greeting) in sync immediately.
      dispatch(
        setProfile({
          ...profile,
          fullName: updated.name,
          personalId: updated.personalId,
        })
      )

      notifier.success("Profile updated successfully.")
      onDone()
    } catch {
      notifier.error("Couldn't update your profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="profile-full-name">Profile Name</Label>
          <Input
            id="profile-full-name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Prakash Sharma"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile-personal-id">Personal ID</Label>
          <Input
            id="profile-personal-id"
            value={personalId}
            onChange={(e) => setPersonalId(e.target.value)}
            placeholder="e.g. TU-2024-0198"
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onDone} disabled={isSaving}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!canSubmit}>
          {isSaving ? "Saving..." : "Save changes"}
        </Button>
      </DialogFooter>
    </>
  )
}
