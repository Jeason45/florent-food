import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * API pour gérer le paramètre d'envoi automatique de newsletter aux nouveaux abonnés
 *
 * Ce paramètre est stocké dans la table Newsletter avec un enregistrement spécial
 * ou on peut utiliser un simple fichier JSON / variable globale pour la phase de test
 */

// Variable globale pour stocker le setting (en mémoire - sera réinitialisé au redémarrage)
// En production, on utiliserait une table Settings ou un fichier persistant
let autoSendEnabled = true;

export async function GET() {
  try {
    // Essayer de lire depuis la base de données (table Newsletter avec un ID spécial)
    const setting = await prisma.newsletter.findFirst({
      where: {
        subject: '__SETTING_AUTO_SEND_ENABLED__'
      }
    });

    if (setting) {
      const content = setting.content as { enabled?: boolean } | null;
      autoSendEnabled = content?.enabled ?? true;
    }

    return NextResponse.json({
      success: true,
      autoSendEnabled
    });
  } catch (error) {
    console.error('Error getting newsletter auto-send setting:', error);
    return NextResponse.json({
      success: true,
      autoSendEnabled // Retourner la valeur en mémoire en cas d'erreur
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { enabled } = await request.json();

    if (typeof enabled !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'Le paramètre "enabled" doit être un booléen' },
        { status: 400 }
      );
    }

    autoSendEnabled = enabled;

    // Sauvegarder en base de données pour persistance
    const existingSetting = await prisma.newsletter.findFirst({
      where: {
        subject: '__SETTING_AUTO_SEND_ENABLED__'
      }
    });

    if (existingSetting) {
      await prisma.newsletter.update({
        where: { id: existingSetting.id },
        data: {
          content: { enabled }
        }
      });
    } else {
      await prisma.newsletter.create({
        data: {
          subject: '__SETTING_AUTO_SEND_ENABLED__',
          content: { enabled },
          type: 'REGULAR',
          status: 'DRAFT', // DRAFT pour ne pas apparaître dans les listes
        }
      });
    }

    console.log(`✅ Newsletter auto-send setting updated: ${enabled ? 'ACTIVÉ' : 'DÉSACTIVÉ'}`);

    return NextResponse.json({
      success: true,
      autoSendEnabled: enabled,
      message: enabled
        ? 'Envoi automatique activé - Les nouveaux abonnés recevront la newsletter en cours'
        : 'Envoi automatique désactivé - Les nouveaux abonnés ne recevront PAS la newsletter en cours'
    });
  } catch (error) {
    console.error('Error updating newsletter auto-send setting:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour du paramètre' },
      { status: 500 }
    );
  }
}

// Export pour utilisation dans d'autres fichiers
export { autoSendEnabled };
