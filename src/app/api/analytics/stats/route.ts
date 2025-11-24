import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import path from 'path';

export async function GET() {
  try {
    const propertyId = process.env.NEXT_PUBLIC_GA_PROPERTY_ID || '';

    if (!propertyId) {
      return NextResponse.json(
        { error: 'GA Property ID not configured' },
        { status: 400 }
      );
    }

    // Initialiser le client Google Analytics
    // Support pour les credentials via variable d'environnement (production) ou fichier (dev)
    let analyticsDataClient;

    if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      // Production: utiliser la variable d'environnement JSON
      const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
      analyticsDataClient = new BetaAnalyticsDataClient({
        credentials,
      });
    } else {
      // Dev: utiliser le fichier JSON
      analyticsDataClient = new BetaAnalyticsDataClient({
        keyFilename: path.join(process.cwd(), 'google-analytics-credentials.json'),
      });
    }

    // Récupérer les statistiques des 30 derniers jours
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
      ],
    });

    // Extraire les données
    const metrics = response.rows?.[0]?.metricValues || [];

    const stats = {
      visitors: parseInt(metrics[0]?.value || '0'),
      pageViews: parseInt(metrics[1]?.value || '0'),
      avgSessionDuration: parseFloat(metrics[2]?.value || '0'),
      bounceRate: parseFloat(metrics[3]?.value || '0'),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('❌ Google Analytics API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch analytics data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
