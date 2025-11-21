"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "loading" | "success" | "error" | "invalid";

export function ConfirmSubscription() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function confirmSubscription() {
      if (!token) {
        setStatus("invalid");
        setMessage("Token de confirmation manquant.");
        return;
      }

      try {
        const response = await fetch("/api/newsletter/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message || "Inscription confirmée avec succès !");
        } else {
          setStatus("error");
          setMessage(
            data.error || "Impossible de confirmer l'inscription."
          );
        }
      } catch (error) {
        setStatus("error");
        setMessage("Une erreur est survenue. Réessaye plus tard.");
      }
    }

    confirmSubscription();
  }, [token]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Loading */}
      {status === "loading" && (
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[var(--terracotta)] animate-spin mx-auto mb-4" />
          <h1 className="font-serif text-2xl font-bold mb-2">
            Confirmation en cours...
          </h1>
          <p className="text-[var(--gris-moyen)]">
            Merci de patienter quelques instants.
          </p>
        </div>
      )}

      {/* Success */}
      {status === "success" && (
        <div className="text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="font-serif text-3xl font-bold mb-3">
            Bienvenue dans la famille ! 🎉
          </h1>
          <p className="text-[var(--gris-moyen)] mb-6 text-lg">
            {message}
          </p>
          <div className="bg-[var(--creme-light)] rounded-lg p-6 mb-6 text-left">
            <h2 className="font-semibold text-lg mb-3">
              Ce que tu vas recevoir :
            </h2>
            <ul className="space-y-2 text-[var(--gris-moyen)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--terracotta)] mt-1">✓</span>
                <span>
                  <strong>Chaque semaine :</strong> Mes meilleures recettes
                  testées et approuvées
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--terracotta)] mt-1">✓</span>
                <span>
                  <strong>Des astuces de chef :</strong> Les techniques des
                  pros à la maison
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--terracotta)] mt-1">✓</span>
                <span>
                  <strong>Contenus exclusifs :</strong> Coulisses, nouveautés
                  en avant-première
                </span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="premium" size="lg" className="flex-1" asChild>
              <Link href="/recettes">Découvrir les recettes</Link>
            </Button>
            <Button variant="outline" size="lg" className="flex-1" asChild>
              <Link href="/">Retour à l'accueil</Link>
            </Button>
          </div>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="font-serif text-2xl font-bold mb-2">
            Erreur de confirmation
          </h1>
          <p className="text-[var(--gris-moyen)] mb-6">{message}</p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left text-sm">
            <p className="font-semibold mb-2">Raisons possibles :</p>
            <ul className="space-y-1 text-[var(--gris-moyen)] list-disc list-inside">
              <li>Le lien a expiré (valide 24h)</li>
              <li>L'inscription a déjà été confirmée</li>
              <li>Le lien est invalide</li>
            </ul>
          </div>
          <Button variant="premium" size="lg" className="w-full" asChild>
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>
      )}

      {/* Invalid Token */}
      {status === "invalid" && (
        <div className="text-center">
          <XCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="font-serif text-2xl font-bold mb-2">
            Lien invalide
          </h1>
          <p className="text-[var(--gris-moyen)] mb-6">{message}</p>
          <Button variant="premium" size="lg" className="w-full" asChild>
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
