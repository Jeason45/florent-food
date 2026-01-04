'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Send, Eye, MousePointer, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  firstName: string | null;
  status: string;
  subscriptionType: string;
  totalOpens: number;
  totalClicks: number;
  subscribedAt: string;
  unsubscribedAt: string | null;
  lastOpenedAt: string | null;
}

interface Stats {
  totalNewslettersReceived: number;
  totalEmailsSent: number;
  totalOpens: number;
  totalClicks: number;
  openRate: number;
  clickRate: number;
  lastActivity: string;
}

interface NewsletterDelivery {
  id: string;
  newsletterId: string;
  newsletterSubject: string;
  newsletterType: string;
  status: string;
  sentAt: string;
  deliveredAt: string | null;
  openedAt: string | null;
  clickedAt: string | null;
  provider: string | null;
  error: string | null;
}

interface MailLog {
  id: string;
  type: string;
  subject: string;
  status: string;
  sentAt: string;
  deliveredAt: string | null;
  openedAt: string | null;
  clickedAt: string | null;
  provider: string | null;
  error: string | null;
  newsletterId: string | null;
}

interface Event {
  id: string;
  eventType: string;
  newsletterId: string | null;
  newsletterSubject: string | null;
  metadata: any;
  createdAt: string;
}

interface HistoryData {
  subscriber: Subscriber;
  stats: Stats;
  newsletterDeliveries: NewsletterDelivery[];
  mailLogs: MailLog[];
  recentEvents: Event[];
}

interface SubscriberHistoryModalProps {
  subscriberId: string;
  onClose: () => void;
}

export default function SubscriberHistoryModal({
  subscriberId,
  onClose
}: SubscriberHistoryModalProps) {
  const [data, setData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'newsletters' | 'emails' | 'events'>('newsletters');

  useEffect(() => {
    fetchHistory();
  }, [subscriberId]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/subscribers/${subscriberId}/history`);
      if (response.ok) {
        const historyData = await response.json();
        setData(historyData);
      } else {
        console.error('Failed to fetch history');
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
      SENT: { color: 'bg-blue-100 text-blue-800', icon: Send, label: 'Envoyé' },
      DELIVERED: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Délivré' },
      OPENED: { color: 'bg-purple-100 text-purple-800', icon: Eye, label: 'Ouvert' },
      CLICKED: { color: 'bg-orange-100 text-orange-800', icon: MousePointer, label: 'Cliqué' },
      FAILED: { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'Échec' },
      BOUNCED: { color: 'bg-gray-100 text-gray-800', icon: AlertCircle, label: 'Rebond' },
      sent: { color: 'bg-blue-100 text-blue-800', icon: Send, label: 'Envoyé' },
      delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Délivré' },
      opened: { color: 'bg-purple-100 text-purple-800', icon: Eye, label: 'Ouvert' },
      clicked: { color: 'bg-orange-100 text-orange-800', icon: MousePointer, label: 'Cliqué' },
      failed: { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'Échec' },
    };

    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', icon: Clock, label: status };
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-6xl w-full my-8">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Historique de {data.subscriber.firstName || data.subscriber.email}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{data.subscriber.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                data.subscriber.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {data.subscriber.status}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {data.subscriber.subscriptionType}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <Mail className="w-4 h-4" />
              Newsletters
            </div>
            <div className="text-2xl font-bold text-gray-900">{data.stats.totalNewslettersReceived}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <Eye className="w-4 h-4" />
              Taux d'ouverture
            </div>
            <div className="text-2xl font-bold text-gray-900">{data.stats.openRate}%</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <MousePointer className="w-4 h-4" />
              Taux de clic
            </div>
            <div className="text-2xl font-bold text-gray-900">{data.stats.clickRate}%</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <TrendingUp className="w-4 h-4" />
              Emails totaux
            </div>
            <div className="text-2xl font-bold text-gray-900">{data.stats.totalEmailsSent}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex gap-4 px-6">
            <button
              onClick={() => setActiveTab('newsletters')}
              className={`py-3 px-4 font-medium transition-colors ${
                activeTab === 'newsletters'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Newsletters ({data.newsletterDeliveries.length})
            </button>
            <button
              onClick={() => setActiveTab('emails')}
              className={`py-3 px-4 font-medium transition-colors ${
                activeTab === 'emails'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tous les emails ({data.mailLogs.length})
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-3 px-4 font-medium transition-colors ${
                activeTab === 'events'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Événements ({data.recentEvents.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[500px] overflow-y-auto">
          {activeTab === 'newsletters' && (
            <div className="space-y-4">
              {data.newsletterDeliveries.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Aucune newsletter envoyée</p>
              ) : (
                data.newsletterDeliveries.map((delivery) => (
                  <div key={delivery.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{delivery.newsletterSubject}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Type: {delivery.newsletterType}
                        </p>
                      </div>
                      {getStatusBadge(delivery.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 text-xs text-gray-600">
                      <div>
                        <span className="font-medium">Envoyé:</span> {formatDate(delivery.sentAt)}
                      </div>
                      {delivery.openedAt && (
                        <div>
                          <span className="font-medium">Ouvert:</span> {formatDate(delivery.openedAt)}
                        </div>
                      )}
                      {delivery.clickedAt && (
                        <div>
                          <span className="font-medium">Cliqué:</span> {formatDate(delivery.clickedAt)}
                        </div>
                      )}
                      {delivery.provider && (
                        <div>
                          <span className="font-medium">Via:</span> {delivery.provider}
                        </div>
                      )}
                    </div>
                    {delivery.error && (
                      <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                        Erreur: {delivery.error}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'emails' && (
            <div className="space-y-4">
              {data.mailLogs.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Aucun email envoyé</p>
              ) : (
                data.mailLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{log.subject}</h3>
                        <p className="text-sm text-gray-500 mt-1">Type: {log.type}</p>
                      </div>
                      {getStatusBadge(log.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 text-xs text-gray-600">
                      <div>
                        <span className="font-medium">Envoyé:</span> {formatDate(log.sentAt)}
                      </div>
                      {log.openedAt && (
                        <div>
                          <span className="font-medium">Ouvert:</span> {formatDate(log.openedAt)}
                        </div>
                      )}
                      {log.provider && (
                        <div>
                          <span className="font-medium">Via:</span> {log.provider}
                        </div>
                      )}
                    </div>
                    {log.error && (
                      <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                        Erreur: {log.error}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-3">
              {data.recentEvents.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Aucun événement enregistré</p>
              ) : (
                data.recentEvents.map((event) => (
                  <div key={event.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{event.eventType}</span>
                      <span className="text-xs text-gray-500">{formatDate(event.createdAt)}</span>
                    </div>
                    {event.newsletterSubject && (
                      <p className="text-sm text-gray-600 mt-1">Newsletter: {event.newsletterSubject}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
