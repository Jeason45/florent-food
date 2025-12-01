import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import PrintButton from '@/components/PrintButton';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');

interface RecipePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Fonction pour vérifier si l'abonné est toujours actif
async function verifySubscriber() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth-token')?.value;

  if (!authToken) {
    return { valid: false, reason: 'no-token' };
  }

  try {
    const { payload } = await jwtVerify(authToken, JWT_SECRET);
    const subscriberId = payload.subscriberId as string;

    // Vérifier que l'abonné est toujours ACTIF en BDD
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { id: subscriberId },
      select: { status: true }
    });

    if (!subscriber || subscriber.status !== 'ACTIVE') {
      return { valid: false, reason: 'not-active' };
    }

    return { valid: true };
  } catch {
    return { valid: false, reason: 'invalid-token' };
  }
}

export async function generateMetadata({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await prisma.recipe.findUnique({
    where: { slug },
  });

  if (!recipe) {
    return {
      title: 'Recette introuvable - Florent Food',
    };
  }

  return {
    title: `${recipe.title} - Florent Food`,
    description: recipe.description,
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  // Vérifier que l'abonné est toujours actif
  const auth = await verifySubscriber();
  if (!auth.valid) {
    redirect('/?auth=expired');
  }

  const { slug } = await params;
  const recipe = await prisma.recipe.findUnique({
    where: { slug },
  });

  if (!recipe || recipe.status !== 'PUBLISHED') {
    notFound();
  }

  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : [];

  const steps = Array.isArray(recipe.steps)
    ? recipe.steps
    : [];

  return (
    <div style={{ background: '#fff', color: '#1a1a1a' }}>
      {/* Styles d'impression pour format A4 - Optimisé pour tenir sur 1 page */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 8mm;
          }

          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Masquer header, footer, navigation, bouton impression */
          header, footer, nav, .print-button, .print-button-container {
            display: none !important;
          }

          /* Réinitialiser les styles pour l'impression */
          .recipe-container {
            padding: 0 !important;
            max-width: 100% !important;
          }

          /* Hero très compact pour l'impression */
          .recipe-hero {
            aspect-ratio: unset !important;
            height: 180px !important;
            max-height: 180px !important;
            min-height: 180px !important;
            page-break-after: avoid;
            position: relative !important;
            overflow: hidden !important;
          }

          .recipe-hero img {
            height: 180px !important;
            max-height: 180px !important;
            object-fit: cover !important;
          }

          .recipe-hero-overlay {
            padding: 12px 20px !important;
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%) !important;
            height: auto !important;
            max-height: 80px !important;
          }

          .recipe-hero-overlay > div:first-child {
            font-size: 8px !important;
            margin-bottom: 2px !important;
            letter-spacing: 1px !important;
          }

          .recipe-hero-overlay h1 {
            font-size: 18px !important;
            margin-bottom: 0 !important;
            letter-spacing: 0 !important;
            line-height: 1.2 !important;
          }

          .recipe-hero-overlay p {
            display: none !important;
          }

          /* Meta info très compact */
          .recipe-meta {
            gap: 15px !important;
            padding: 8px 0 !important;
            margin-bottom: 6px !important;
            border-bottom: 1px solid #ddd !important;
          }

          .recipe-meta > div {
            min-width: 50px !important;
          }

          .recipe-meta > div > div:first-child {
            font-size: 16px !important;
            margin-bottom: 2px !important;
          }

          .recipe-meta > div > div:last-child {
            font-size: 7px !important;
            letter-spacing: 1px !important;
          }

          /* Grille des groupes d'ingrédients */
          .ingredients-section {
            margin-top: 0 !important;
            margin-bottom: 10px !important;
          }

          .ingredients-section > div {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 20px !important;
          }

          .ingredients-section > div > .ingredient-group {
            flex: 1 1 150px !important;
            min-width: 0 !important;
          }

          /* Ingrédients liste */
          .ingredients-list {
            columns: unset !important;
          }

          .ingredients-list li {
            padding: 2px 0 2px 12px !important;
            font-size: 8px !important;
            line-height: 1.3 !important;
            break-inside: avoid;
          }

          .ingredients-list li span {
            width: 3px !important;
            height: 3px !important;
            top: 6px !important;
          }

          /* Groupes d'ingrédients */
          .ingredient-group {
            break-inside: avoid;
            margin-bottom: 0 !important;
          }

          .ingredient-group h3 {
            font-size: 9px !important;
            margin-bottom: 4px !important;
            padding-bottom: 2px !important;
          }

          /* Sections titres */
          .section-title {
            font-size: 9px !important;
            margin-bottom: 8px !important;
            letter-spacing: 2px !important;
          }

          /* Étapes très compactes */
          .steps-section {
            margin-bottom: 10px !important;
          }

          .recipe-steps {
            margin-bottom: 10px !important;
          }

          .recipe-step {
            padding: 8px 10px !important;
            margin-bottom: 6px !important;
            gap: 10px !important;
            break-inside: avoid;
            border-radius: 6px !important;
          }

          .recipe-step-number {
            font-size: 18px !important;
            min-width: 30px !important;
          }

          .recipe-step h3 {
            font-size: 10px !important;
            margin-bottom: 3px !important;
          }

          .recipe-step p {
            font-size: 8px !important;
            line-height: 1.4 !important;
          }

          /* Footer très compact */
          .recipe-footer {
            padding: 8px 0 !important;
            border-top: 1px solid #ddd !important;
          }

          .recipe-footer > div:first-child {
            font-size: 12px !important;
            margin-bottom: 2px !important;
            letter-spacing: 2px !important;
          }

          .recipe-footer > div:last-child {
            font-size: 7px !important;
          }

          /* Sections container */
          .recipe-content {
            padding: 10px 15px !important;
          }

          /* Astuces du Chef - compact pour impression */
          .recipe-chef-tips {
            padding: 15px 20px !important;
            margin-top: 10px !important;
            border-radius: 8px !important;
            break-inside: avoid;
          }

          .recipe-chef-tips > div:first-child {
            font-size: 8px !important;
            padding: 4px 12px !important;
            top: -10px !important;
            left: 15px !important;
          }

          .recipe-chef-tips p {
            font-size: 8px !important;
            line-height: 1.4 !important;
            margin-top: 5px !important;
          }
        }
        /* ===========================================
           STYLES MOBILE RESPONSIVE - COMPACT
           =========================================== */
        @media (max-width: 768px) {
          /* Hero section mobile */
          .recipe-hero {
            aspect-ratio: 4 / 3 !important;
            max-height: 300px !important;
          }

          .recipe-hero-overlay {
            padding: 15px 16px !important;
          }

          .recipe-hero-overlay > div:first-child {
            font-size: 8px !important;
            letter-spacing: 2px !important;
            margin-bottom: 6px !important;
          }

          .recipe-hero-overlay h1 {
            font-size: 26px !important;
            letter-spacing: -1px !important;
            margin-bottom: 0 !important;
          }

          /* CACHER L'INTRO SUR MOBILE */
          .recipe-hero-overlay p {
            display: none !important;
          }

          /* Bouton PDF - Visible sur mobile aussi */
          .print-button-container {
            display: block !important;
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
            top: auto !important;
            z-index: 100 !important;
          }

          .print-button-container .print-button {
            padding: 10px 16px !important;
            font-size: 11px !important;
          }

          /* Contenu principal mobile - COMPACT */
          .recipe-content {
            padding: 20px 16px !important;
          }

          /* Meta info mobile - COMPACT */
          .recipe-meta {
            gap: 12px !important;
            padding: 20px 0 !important;
            margin-bottom: 25px !important;
          }

          .recipe-meta > div {
            min-width: 55px !important;
          }

          .recipe-meta > div > div:first-child {
            font-size: 22px !important;
            margin-bottom: 4px !important;
          }

          .recipe-meta > div > div:last-child {
            font-size: 8px !important;
            letter-spacing: 1px !important;
          }

          /* Section ingrédients mobile - COMPACT */
          .ingredients-section {
            margin-bottom: 30px !important;
          }

          .ingredients-section > h2 {
            font-size: 11px !important;
            margin-bottom: 15px !important;
          }

          /* Grille ingrédients - 1 colonne sur mobile */
          .ingredients-section > div {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }

          .ingredient-group h3 {
            font-size: 14px !important;
            margin-bottom: 10px !important;
            padding-bottom: 8px !important;
          }

          .ingredients-list li {
            padding: 6px 0 6px 16px !important;
            font-size: 13px !important;
            line-height: 1.4 !important;
          }

          .ingredients-list li span {
            width: 5px !important;
            height: 5px !important;
            top: 12px !important;
          }

          /* Section étapes mobile - COMPACT */
          .steps-section {
            margin-bottom: 30px !important;
          }

          .steps-section > h2 {
            font-size: 11px !important;
            margin-bottom: 15px !important;
          }

          /* Étapes - LAYOUT HORIZONTAL COMPACT */
          .recipe-step {
            flex-direction: row !important;
            align-items: flex-start !important;
            gap: 12px !important;
            padding: 16px !important;
            margin-bottom: 12px !important;
            border-radius: 10px !important;
          }

          /* Numéro d'étape PETIT */
          .recipe-step-number {
            font-size: 24px !important;
            min-width: 35px !important;
            opacity: 0.6 !important;
          }

          .recipe-step h3 {
            font-size: 15px !important;
            margin-bottom: 6px !important;
          }

          .recipe-step p {
            font-size: 13px !important;
            line-height: 1.5 !important;
          }

          /* Astuces du Chef mobile - COMPACT */
          .recipe-chef-tips {
            padding: 25px 16px 20px 16px !important;
            margin-top: 25px !important;
            border-radius: 10px !important;
          }

          .recipe-chef-tips > div:first-child {
            font-size: 10px !important;
            padding: 6px 12px !important;
            top: -12px !important;
            left: 16px !important;
          }

          .recipe-chef-tips p {
            font-size: 13px !important;
            line-height: 1.6 !important;
          }

          /* Footer mobile - COMPACT */
          .recipe-footer {
            padding: 30px 0 !important;
          }

          .recipe-footer > div:first-child {
            font-size: 18px !important;
            letter-spacing: 2px !important;
            margin-bottom: 8px !important;
          }

          .recipe-footer > div:last-child {
            font-size: 10px !important;
          }
        }

        /* Extra petit écran (iPhone SE, etc.) */
        @media (max-width: 380px) {
          .recipe-hero-overlay h1 {
            font-size: 22px !important;
          }

          .recipe-meta {
            gap: 8px !important;
          }

          .recipe-meta > div {
            min-width: 45px !important;
          }

          .recipe-meta > div > div:first-child {
            font-size: 18px !important;
          }

          .recipe-step {
            padding: 12px !important;
          }

          .recipe-step-number {
            font-size: 20px !important;
            min-width: 28px !important;
          }

          .recipe-step h3 {
            font-size: 14px !important;
          }

          .recipe-step p {
            font-size: 12px !important;
          }
        }
      `}</style>

      {/* Hero SOMBRE - Format 16:9 */}
      <div className="recipe-hero" style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        maxHeight: '600px',
        overflow: 'hidden',
        background: '#000'
      }}>
        {/* Bouton Télécharger PDF en haut à droite */}
        <div className="print-button-container" style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          zIndex: 10
        }}>
          <PrintButton />
        </div>
        {recipe.imageUrl && (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        )}


        {/* Overlay avec titre */}
        <div className="recipe-hero-overlay" style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '40px 60px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.95) 100%)'
        }}>
          <div style={{
            fontSize: '10px',
            letterSpacing: '3px',
            color: '#D4AF37',
            textTransform: 'uppercase',
            marginBottom: '12px',
            fontWeight: 700
          }}>
            {recipe.category.join(' · ')}
          </div>
          <h1 style={{
            fontSize: '56px',
            fontWeight: 900,
            letterSpacing: '-2px',
            lineHeight: 1.1,
            marginBottom: '16px',
            textTransform: 'uppercase',
            color: '#fff'
          }}>
            {recipe.title}
          </h1>
          {recipe.description && (
            <p style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.6,
              maxWidth: '600px'
            }}>
              {recipe.description}
            </p>
          )}
        </div>
      </div>

      {/* Contenu BLANC */}
      <div className="recipe-content" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 60px',
        background: '#fff'
      }}>
        {/* Meta Info */}
        <div className="recipe-meta" style={{
          display: 'flex',
          gap: '40px',
          padding: '60px 0',
          borderBottom: '1px solid #e8e8e8',
          marginBottom: '80px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <div style={{ textAlign: 'center', minWidth: '80px' }}>
            <div style={{
              fontSize: '36px',
              fontWeight: 900,
              color: '#D4AF37',
              lineHeight: 1,
              marginBottom: '12px'
            }}>
              {recipe.prepTime}'
            </div>
            <div style={{
              fontSize: '11px',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 600
            }}>
              Préparation
            </div>
          </div>
          <div style={{ textAlign: 'center', minWidth: '80px' }}>
            <div style={{
              fontSize: '36px',
              fontWeight: 900,
              color: '#D4AF37',
              lineHeight: 1,
              marginBottom: '12px'
            }}>
              {recipe.cookTime}'
            </div>
            <div style={{
              fontSize: '11px',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 600
            }}>
              Cuisson
            </div>
          </div>
          {recipe.restTime && recipe.restTime > 0 && (
            <div style={{ textAlign: 'center', minWidth: '80px' }}>
              <div style={{
                fontSize: '36px',
                fontWeight: 900,
                color: '#D4AF37',
                lineHeight: 1,
                marginBottom: '12px'
              }}>
                {recipe.restTime}'
              </div>
              <div style={{
                fontSize: '11px',
                color: '#999',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: 600
              }}>
                Repos
              </div>
            </div>
          )}
          <div style={{ textAlign: 'center', minWidth: '80px' }}>
            <div style={{
              fontSize: '36px',
              fontWeight: 900,
              color: '#D4AF37',
              lineHeight: 1,
              marginBottom: '12px'
            }}>
              {recipe.servings}
            </div>
            <div style={{
              fontSize: '11px',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 600
            }}>
              Personnes
            </div>
          </div>
          <div style={{ textAlign: 'center', minWidth: '80px' }}>
            <div style={{
              fontSize: '28px',
              fontWeight: 900,
              lineHeight: 1,
              marginBottom: '12px',
              letterSpacing: '2px'
            }}>
              {recipe.difficulty === 'DEBUTANT' ? (
                <><span style={{ color: '#D4AF37' }}>★</span><span style={{ color: '#ddd' }}>★★</span></>
              ) : recipe.difficulty === 'INTERMEDIAIRE' ? (
                <><span style={{ color: '#D4AF37' }}>★★</span><span style={{ color: '#ddd' }}>★</span></>
              ) : (
                <span style={{ color: '#D4AF37' }}>★★★</span>
              )}
            </div>
            <div style={{
              fontSize: '11px',
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 600
            }}>
              Difficulté
            </div>
          </div>
        </div>


        {/* Ingredients */}
        <div className="ingredients-section" style={{ marginBottom: '100px' }}>
          <h2 className="section-title" style={{
            fontSize: '14px',
            letterSpacing: '4px',
            color: '#D4AF37',
            textTransform: 'uppercase',
            marginBottom: '40px',
            fontWeight: 700
          }}>
            Ingrédients
          </h2>

          {/* Vérifier si c'est le nouveau format avec groupes */}
          {ingredients.length > 0 && ingredients[0] !== null && typeof ingredients[0] === 'object' && 'groupName' in ingredients[0] ? (
            // Nouveau format avec groupes - affichés côte à côte
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${Math.min(ingredients.length, 3)}, 1fr)`,
              gap: '40px'
            }}>
              {(ingredients as { groupName: string; ingredients: string[] }[]).map((group, groupIndex) => (
                <div className="ingredient-group" key={groupIndex}>
                  {group.groupName && (
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#1a1a1a',
                      marginBottom: '20px',
                      paddingBottom: '12px',
                      borderBottom: '2px solid #D4AF37'
                    }}>
                      {group.groupName}
                    </h3>
                  )}
                  <ul className="ingredients-list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {group.ingredients.map((ingredient: string, ingredientIndex: number) => (
                      <li
                        key={ingredientIndex}
                        style={{
                          padding: '12px 0 12px 24px',
                          fontSize: '15px',
                          color: '#333',
                          position: 'relative',
                          lineHeight: 1.5
                        }}
                      >
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          top: '18px',
                          width: '6px',
                          height: '6px',
                          background: '#D4AF37',
                          borderRadius: '50%',
                          content: '""',
                          display: 'block'
                        }}></span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            // Ancien format: tableau simple de strings
            <ul className="ingredients-list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {ingredients.map((ingredient: any, index: number) => (
                <li
                  key={index}
                  style={{
                    padding: '16px 0 16px 32px',
                    fontSize: '16px',
                    color: '#333',
                    position: 'relative',
                    lineHeight: 1.6
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: '22px',
                    width: '8px',
                    height: '8px',
                    background: '#D4AF37',
                    borderRadius: '50%',
                    content: '""',
                    display: 'block'
                  }}></span>
                  {typeof ingredient === 'string' ? ingredient : ingredient.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Steps */}
        <div className="steps-section recipe-steps" style={{ marginBottom: '100px' }}>
          <h2 className="section-title" style={{
            fontSize: '14px',
            letterSpacing: '4px',
            color: '#D4AF37',
            textTransform: 'uppercase',
            marginBottom: '40px',
            fontWeight: 700
          }}>
            Préparation
          </h2>

          {steps.map((step: any, index: number) => (
            <div
              className="recipe-step"
              key={index}
              style={{
                display: 'flex',
                gap: '40px',
                marginBottom: '60px',
                alignItems: 'flex-start',
                padding: '40px',
                background: '#fafaf8',
                borderRadius: '16px'
              }}
            >
              <div className="recipe-step-number" style={{
                fontSize: '72px',
                fontWeight: 900,
                color: '#D4AF37',
                lineHeight: 1,
                opacity: 0.4,
                minWidth: '90px'
              }}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <div style={{ flex: 1 }}>
                {step.title && (
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    marginBottom: '16px',
                    color: '#1a1a1a'
                  }}>
                    {step.title}
                  </h3>
                )}
                <p style={{
                  fontSize: '16px',
                  lineHeight: 1.8,
                  color: '#444',
                  fontWeight: 400,
                  whiteSpace: 'pre-line'
                }}>
                  {typeof step === 'string' ? step : step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Astuces du Chef */}
        {recipe.chefTips && (
          <div className="recipe-chef-tips" style={{
            background: 'linear-gradient(135deg, #faf8f5 0%, #f5f0e8 100%)',
            padding: '50px',
            borderRadius: '20px',
            marginTop: '60px',
            border: '2px solid #D4AF37',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '40px',
              background: '#D4AF37',
              color: '#000',
              padding: '10px 24px',
              borderRadius: '30px',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              Astuces du Chef
            </div>
            <p style={{
              fontSize: '17px',
              lineHeight: 1.9,
              color: '#333',
              fontStyle: 'italic',
              marginTop: '10px',
              whiteSpace: 'pre-line'
            }}>
              {recipe.chefTips}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="recipe-footer" style={{
          textAlign: 'center',
          padding: '80px 0',
          borderTop: '1px solid #e8e8e8'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 900,
            color: '#D4AF37',
            letterSpacing: '3px',
            marginBottom: '20px'
          }}>
            FLORENT FOOD
          </div>
          <div style={{
            fontSize: '12px',
            color: '#999',
            letterSpacing: '1px'
          }}>
            Haute Cuisine · L'Art de la Gourmandise
          </div>
        </div>
      </div>
    </div>
  );
}
