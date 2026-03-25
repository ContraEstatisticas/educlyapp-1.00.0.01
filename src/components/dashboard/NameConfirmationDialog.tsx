import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";

import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NameConfirmationDialogProps {
  open: boolean;
  savedName: string;
  userId: string;
  onCompleted: (nextName: string) => void;
}

const normalizeEditableName = (value: string) => value.trim().replace(/\s+/g, " ");

export const NameConfirmationDialog = ({
  open,
  savedName,
  userId,
  onCompleted,
}: NameConfirmationDialogProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [draftName, setDraftName] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setDraftName("");
    setValidationError(null);
  }, [open, savedName]);

  const persistName = async (nextName: string) => {
    setIsSaving(true);
    setValidationError(null);

    try {
      const normalizedName = normalizeEditableName(nextName);
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: normalizedName,
          name_confirmation_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (profileError) throw profileError;

      const { error: authError } = await supabase.auth.updateUser({
        data: { full_name: normalizedName },
      });

      if (authError) {
        console.error("[NameConfirmationDialog] Failed to sync auth metadata:", authError);
      }

      toast({
        title: t("nameConfirmation.successTitle"),
        description: t("nameConfirmation.successDescription"),
      });

      onCompleted(normalizedName);
    } catch (error) {
      console.error("[NameConfirmationDialog] Failed to save name:", error);
      toast({
        title: t("nameConfirmation.errorTitle"),
        description: t("nameConfirmation.errorDescription"),
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeepSavedName = async () => {
    await persistName(savedName);
  };

  const handleSaveNewName = async () => {
    const normalizedName = normalizeEditableName(draftName);

    if (normalizedName.length < 2) {
      setValidationError(t("nameConfirmation.validationError"));
      return;
    }

    await persistName(normalizedName);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-md overflow-hidden rounded-3xl border-border bg-card p-0 shadow-2xl [&>button]:hidden"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/12 via-background to-orange-500/10 p-6">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-orange-500 to-primary" />

          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <UserRound className="h-6 w-6" />
          </div>

          <DialogHeader className="space-y-3 text-left">
            <DialogTitle className="text-2xl font-bold text-foreground">
              {t("nameConfirmation.title")}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
              {t("nameConfirmation.description")}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 rounded-2xl border border-primary/20 bg-background/80 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {t("nameConfirmation.savedNameLabel")}
            </p>
            <p className="mt-2 text-xl font-semibold text-foreground">{savedName}</p>
          </div>

          <div className="mt-5 space-y-2">
            <label htmlFor="name-confirmation-input" className="text-sm font-medium text-foreground">
              {t("nameConfirmation.inputLabel")}
            </label>
            <Input
              id="name-confirmation-input"
              value={draftName}
              onChange={(event) => {
                setDraftName(event.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder={t("nameConfirmation.inputPlaceholder")}
              autoComplete="name"
              disabled={isSaving}
              maxLength={80}
            />
            <p className="text-xs text-muted-foreground">{t("nameConfirmation.helperText")}</p>
            {validationError ? (
              <p className="text-sm font-medium text-destructive">{validationError}</p>
            ) : null}
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="border-border"
              onClick={handleKeepSavedName}
              disabled={isSaving}
            >
              {t("nameConfirmation.keepButton")}
            </Button>
            <Button type="button" onClick={handleSaveNewName} disabled={isSaving}>
              {isSaving ? t("nameConfirmation.savingButton") : t("nameConfirmation.saveButton")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
