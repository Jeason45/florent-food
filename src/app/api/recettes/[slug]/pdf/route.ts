import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import puppeteer from 'puppeteer';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');

// Vérifier l'authentification
async function verifySubscriber() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth-token')?.value;

  if (!authToken) {
    return { valid: false, reason: 'no-token' };
  }

  try {
    const { payload } = await jwtVerify(authToken, JWT_SECRET);
    const subscriberId = payload.subscriberId as string;

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Vérifier l'authentification
    const auth = await verifySubscriber();
    if (!auth.valid) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { slug } = await params;

    // Récupérer la recette
    const recipe = await prisma.recipe.findUnique({
      where: { slug },
    });

    if (!recipe || recipe.status !== 'PUBLISHED') {
      return NextResponse.json(
        { error: 'Recette introuvable' },
        { status: 404 }
      );
    }

    // Générer le HTML de la recette pour le PDF
    const html = generateRecipeHTML(recipe);

    // Lancer Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--font-render-hinting=none',
      ],
    });

    const page = await browser.newPage();

    // Définir le contenu HTML
    await page.setContent(html, {
      waitUntil: 'networkidle0',
    });

    // Générer le PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        bottom: '10mm',
        left: '10mm',
        right: '10mm',
      },
    });

    await browser.close();

    // Retourner le PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${recipe.title} - Florent Food.pdf"`,
      },
    });

  } catch (error) {
    console.error('Erreur génération PDF:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération du PDF' },
      { status: 500 }
    );
  }
}

// Générer le HTML pour le PDF
function generateRecipeHTML(recipe: any): string {
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  const steps = Array.isArray(recipe.steps) ? recipe.steps : [];

  // Générer les ingrédients
  let ingredientsHTML = '';
  if (ingredients.length > 0 && ingredients[0] !== null && typeof ingredients[0] === 'object' && 'groupName' in ingredients[0]) {
    // Format avec groupes
    ingredientsHTML = `
      <div class="ingredients-grid">
        ${(ingredients as { groupName: string; ingredients: string[] }[]).map(group => `
          <div class="ingredient-group">
            ${group.groupName ? `<h3>${group.groupName}</h3>` : ''}
            <ul>
              ${group.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    // Format simple
    ingredientsHTML = `
      <ul class="ingredients-list">
        ${ingredients.map((ing: any) => `<li>${typeof ing === 'string' ? ing : ing.name}</li>`).join('')}
      </ul>
    `;
  }

  // Générer les étapes
  const stepsHTML = steps.map((step: any, index: number) => `
    <div class="step">
      <div class="step-number">${String(index + 1).padStart(2, '0')}</div>
      <div class="step-content">
        ${step.title ? `<h3>${step.title}</h3>` : ''}
        <p>${typeof step === 'string' ? step : step.description}</p>
      </div>
    </div>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${recipe.title} - Florent Food</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #1a1a1a;
      line-height: 1.6;
      background: #fff;
    }

    .hero {
      position: relative;
      height: 180px;
      overflow: hidden;
      background: #000;
    }

    .hero img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hero-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 15px 25px;
      background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%);
    }

    .category {
      font-size: 9px;
      letter-spacing: 2px;
      color: #D4AF37;
      text-transform: uppercase;
      margin-bottom: 5px;
      font-weight: 700;
    }

    .title {
      font-size: 24px;
      font-weight: 900;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: -1px;
      line-height: 1.1;
    }

    .content {
      padding: 25px;
    }

    .meta {
      display: flex;
      justify-content: center;
      gap: 30px;
      padding: 20px 0;
      border-bottom: 1px solid #e8e8e8;
      margin-bottom: 25px;
    }

    .meta-item {
      text-align: center;
    }

    .meta-value {
      font-size: 28px;
      font-weight: 900;
      color: #D4AF37;
      line-height: 1;
      margin-bottom: 5px;
    }

    .meta-label {
      font-size: 9px;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 600;
    }

    .section-title {
      font-size: 11px;
      letter-spacing: 3px;
      color: #D4AF37;
      text-transform: uppercase;
      margin-bottom: 20px;
      font-weight: 700;
    }

    .ingredients-grid {
      display: flex;
      gap: 25px;
      margin-bottom: 30px;
    }

    .ingredient-group {
      flex: 1;
    }

    .ingredient-group h3 {
      font-size: 14px;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 2px solid #D4AF37;
    }

    .ingredient-group ul,
    .ingredients-list {
      list-style: none;
    }

    .ingredient-group li,
    .ingredients-list li {
      padding: 6px 0 6px 18px;
      font-size: 12px;
      color: #333;
      position: relative;
    }

    .ingredient-group li::before,
    .ingredients-list li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 12px;
      width: 5px;
      height: 5px;
      background: #D4AF37;
      border-radius: 50%;
    }

    .steps-section {
      margin-bottom: 25px;
    }

    .step {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      padding: 20px;
      background: #fafaf8;
      border-radius: 10px;
    }

    .step-number {
      font-size: 36px;
      font-weight: 900;
      color: #D4AF37;
      opacity: 0.4;
      min-width: 50px;
      line-height: 1;
    }

    .step-content {
      flex: 1;
    }

    .step-content h3 {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #1a1a1a;
    }

    .step-content p {
      font-size: 12px;
      line-height: 1.7;
      color: #444;
      white-space: pre-line;
    }

    .chef-tips {
      background: linear-gradient(135deg, #faf8f5 0%, #f5f0e8 100%);
      padding: 25px;
      border-radius: 12px;
      border: 2px solid #D4AF37;
      position: relative;
      margin-top: 20px;
    }

    .chef-tips-label {
      position: absolute;
      top: -12px;
      left: 20px;
      background: #D4AF37;
      color: #000;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .chef-tips p {
      font-size: 13px;
      line-height: 1.8;
      color: #333;
      font-style: italic;
      margin-top: 8px;
      white-space: pre-line;
    }

    .footer {
      text-align: center;
      padding: 30px 0;
      border-top: 1px solid #e8e8e8;
      margin-top: 20px;
    }

    .footer-logo {
      font-size: 20px;
      font-weight: 900;
      color: #D4AF37;
      letter-spacing: 2px;
      margin-bottom: 8px;
    }

    .footer-tagline {
      font-size: 10px;
      color: #999;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <div class="hero">
    ${recipe.imageUrl ? `<img src="${recipe.imageUrl}" alt="${recipe.title}">` : ''}
    <div class="hero-overlay">
      <div class="category">${Array.isArray(recipe.category) ? recipe.category.join(' · ') : recipe.category}</div>
      <h1 class="title">${recipe.title}</h1>
    </div>
  </div>

  <div class="content">
    <div class="meta">
      <div class="meta-item">
        <div class="meta-value">${recipe.prepTime}'</div>
        <div class="meta-label">Préparation</div>
      </div>
      <div class="meta-item">
        <div class="meta-value">${recipe.cookTime}'</div>
        <div class="meta-label">Cuisson</div>
      </div>
      ${recipe.restTime && recipe.restTime > 0 ? `
        <div class="meta-item">
          <div class="meta-value">${recipe.restTime}'</div>
          <div class="meta-label">Repos</div>
        </div>
      ` : ''}
      <div class="meta-item">
        <div class="meta-value">${recipe.servings}</div>
        <div class="meta-label">Personnes</div>
      </div>
      <div class="meta-item">
        <div class="meta-value">${recipe.difficulty === 'DEBUTANT' ? '★☆☆' : recipe.difficulty === 'INTERMEDIAIRE' ? '★★☆' : '★★★'}</div>
        <div class="meta-label">Difficulté</div>
      </div>
    </div>

    <div class="ingredients-section">
      <h2 class="section-title">Ingrédients</h2>
      ${ingredientsHTML}
    </div>

    <div class="steps-section">
      <h2 class="section-title">Préparation</h2>
      ${stepsHTML}
    </div>

    ${recipe.chefTips ? `
      <div class="chef-tips">
        <div class="chef-tips-label">Astuces du Chef</div>
        <p>${recipe.chefTips}</p>
      </div>
    ` : ''}

    <div class="footer">
      <div class="footer-logo">FLORENT FOOD</div>
      <div class="footer-tagline">Haute Cuisine · L'Art de la Gourmandise</div>
    </div>
  </div>
</body>
</html>
  `.trim();
}
