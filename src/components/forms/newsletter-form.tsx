"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Email invalide")
    .toLowerCase()
    .trim(),
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom est trop long")
    .trim()
    .optional(),
  source: z.string().optional(),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  source?: string;
  variant?: "inline" | "modal" | "footer";
  onSuccess?: () => void;
  className?: string;
}

export function NewsletterForm({
  source = "website",
  variant = "inline",
  onSuccess,
  className = "",
}: NewsletterFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      source,
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue");
      }

      setStatus("success");
      reset();

      if (onSuccess) {
        setTimeout(onSuccess, 2000);
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible de s'inscrire. Réessaye plus tard."
      );
    }
  };

  // Variant footer (simple, horizontal)
  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={`space-y-3 ${className}`}>
        {status === "success" ? (
          <div className="flex items-center gap-2 text-white bg-green-500/20 border border-green-500/30 rounded-lg px-4 py-3">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">
              Merci ! Vérifie ton email pour confirmer ton inscription.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="ton@email.com"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[var(--terracotta)]"
                {...register("email")}
                disabled={status === "loading"}
              />
              <Button
                type="submit"
                variant="premium"
                size="lg"
                className="sm:w-auto"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Inscription...
                  </>
                ) : (
                  "M'inscrire"
                )}
              </Button>
            </div>
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <p>{errorMessage}</p>
              </div>
            )}
          </>
        )}
      </form>
    );
  }

  // Variant modal (vertical, avec prénom)
  if (variant === "modal") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
        {status === "success" ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold mb-2">
              Bienvenue dans la famille ! 🎉
            </h3>
            <p className="text-[var(--gris-moyen)] mb-4">
              Vérifie ton email (et tes spams) pour confirmer ton inscription.
            </p>
            <p className="text-sm text-[var(--gris-moyen)]">
              Tu vas recevoir mes meilleures recettes chaque semaine !
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Ton prénom"
                  className="w-full"
                  {...register("firstName")}
                  disabled={status === "loading"}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="ton@email.com"
                  className="w-full"
                  {...register("email")}
                  disabled={status === "loading"}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Inscription en cours...
                </>
              ) : (
                "M'inscrire gratuitement"
              )}
            </Button>

            {status === "error" && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}

            <p className="text-xs text-center text-[var(--gris-moyen)]">
              Désinscription possible à tout moment. Zéro spam, promis !
            </p>
          </>
        )}
      </form>
    );
  }

  // Variant inline (par défaut)
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
      {status === "success" ? (
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-green-900">
              Inscription confirmée ! 🎉
            </p>
            <p className="text-sm text-green-700 mt-1">
              Vérifie ton email pour valider ton inscription.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="ton@email.com"
              className="flex-1"
              {...register("email")}
              disabled={status === "loading"}
            />
            <Button
              type="submit"
              variant="premium"
              size="lg"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Inscription...
                </>
              ) : (
                "Rejoindre"
              )}
            </Button>
          </div>

          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )}

          <p className="text-xs text-[var(--gris-moyen)]">
            En t'inscrivant, tu acceptes de recevoir nos emails. Désinscription
            possible à tout moment.
          </p>
        </>
      )}
    </form>
  );
}
