-- ==================================
-- FLORENT FOOD - Database Schema
-- ==================================
-- Phase 1: Site Vitrine + Newsletter
-- Database: PostgreSQL (Supabase)
-- ==================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================================
-- 1. PROFILES (Utilisateurs)
-- ==================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Index pour recherche rapide
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);

-- ==================================
-- 2. NEWSLETTER_SUBSCRIBERS (Abonnés Newsletter)
-- ==================================
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),

  -- Segmentation
  source TEXT, -- instagram, tiktok, google, direct, referral
  preferences JSONB DEFAULT '{}', -- {categories: [], difficulty: '', diet: []}
  tags TEXT[] DEFAULT '{}', -- Array de tags pour segmentation avancée

  -- Engagement metrics
  total_opens INTEGER DEFAULT 0,
  total_clicks INTEGER DEFAULT 0,
  last_opened_at TIMESTAMP WITH TIME ZONE,

  -- Timestamps
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Index
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscribers(status);
CREATE INDEX idx_newsletter_source ON newsletter_subscribers(source);
CREATE INDEX idx_newsletter_tags ON newsletter_subscribers USING GIN(tags);

-- ==================================
-- 3. RECIPES (Recettes)
-- ==================================
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Informations de base
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,

  -- Métadonnées culinaires
  category TEXT[], -- ['gateaux', 'tartes', 'patisserie', 'viennoiserie', 'entremets', 'biscuits']
  difficulty TEXT NOT NULL CHECK (difficulty IN ('debutant', 'intermediaire', 'expert')),
  prep_time INTEGER NOT NULL, -- en minutes
  cook_time INTEGER NOT NULL, -- en minutes
  total_time INTEGER GENERATED ALWAYS AS (prep_time + cook_time) STORED,
  servings INTEGER DEFAULT 6,

  -- Contenu
  ingredients JSONB NOT NULL, -- [{section: 'Pâte', items: [{quantity: 250, unit: 'g', name: 'farine'}]}]
  steps JSONB NOT NULL, -- [{number: 1, text: '...', image_url: '', timer: 30, tips: ''}]

  -- Médias premium (pour membres payants en Phase 2)
  video_url TEXT,
  pdf_url TEXT,

  -- Visibilité
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  visibility TEXT NOT NULL DEFAULT 'free' CHECK (visibility IN ('free', 'premium')),

  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[] DEFAULT '{}',

  -- Analytics
  views_count INTEGER DEFAULT 0,
  favorites_count INTEGER DEFAULT 0,
  completed_count INTEGER DEFAULT 0,

  -- Auteur (Florent par défaut, mais si équipe plus tard)
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,

  -- Timestamps
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Index
CREATE INDEX idx_recipes_slug ON recipes(slug);
CREATE INDEX idx_recipes_status ON recipes(status);
CREATE INDEX idx_recipes_visibility ON recipes(visibility);
CREATE INDEX idx_recipes_difficulty ON recipes(difficulty);
CREATE INDEX idx_recipes_category ON recipes USING GIN(category);
CREATE INDEX idx_recipes_tags ON recipes USING GIN(tags);
CREATE INDEX idx_recipes_published_at ON recipes(published_at);

-- ==================================
-- 4. NEWSLETTERS (Campagnes d'emails)
-- ==================================
CREATE TABLE newsletters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Informations
  subject TEXT NOT NULL,
  preheader TEXT,
  content JSONB NOT NULL, -- Contenu structuré pour React Email

  -- Type et segmentation
  type TEXT NOT NULL CHECK (type IN ('regular', 'welcome_sequence', 'promotional')),
  segment_filter JSONB, -- Filtres pour cibler certains abonnés

  -- Planning
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,

  -- Analytics
  recipients_count INTEGER DEFAULT 0,
  opens_count INTEGER DEFAULT 0,
  clicks_count INTEGER DEFAULT 0,
  unsubscribes_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Index
CREATE INDEX idx_newsletters_status ON newsletters(status);
CREATE INDEX idx_newsletters_type ON newsletters(type);
CREATE INDEX idx_newsletters_sent_at ON newsletters(sent_at);

-- ==================================
-- 5. NEWSLETTER_EVENTS (Tracking emails)
-- ==================================
CREATE TABLE newsletter_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  newsletter_id UUID REFERENCES newsletters(id) ON DELETE CASCADE,
  subscriber_id UUID REFERENCES newsletter_subscribers(id) ON DELETE CASCADE,

  event_type TEXT NOT NULL CHECK (event_type IN ('sent', 'opened', 'clicked', 'bounced', 'unsubscribed')),
  metadata JSONB DEFAULT '{}', -- {link_url: '', user_agent: '', ip: ''}

  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Index
CREATE INDEX idx_newsletter_events_newsletter ON newsletter_events(newsletter_id);
CREATE INDEX idx_newsletter_events_subscriber ON newsletter_events(subscriber_id);
CREATE INDEX idx_newsletter_events_type ON newsletter_events(event_type);
CREATE INDEX idx_newsletter_events_created_at ON newsletter_events(created_at);

-- ==================================
-- 6. EMAIL_AUTOMATIONS (Séquences automatiques)
-- ==================================
CREATE TABLE email_automations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Informations
  name TEXT NOT NULL,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('newsletter_signup', 'book_purchase', 'membership_signup', 'abandoned_cart')),

  -- Configuration
  sequence JSONB NOT NULL, -- [{delay_days: 0, subject: '', template: ''}, {delay_days: 2, ...}]
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused')),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Index
CREATE INDEX idx_email_automations_trigger ON email_automations(trigger_type);
CREATE INDEX idx_email_automations_status ON email_automations(status);

-- ==================================
-- 7. AUTOMATION_QUEUE (Files d'attente emails automatiques)
-- ==================================
CREATE TABLE automation_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  automation_id UUID REFERENCES email_automations(id) ON DELETE CASCADE,
  subscriber_id UUID REFERENCES newsletter_subscribers(id) ON DELETE CASCADE,

  -- Step dans la séquence
  step_index INTEGER NOT NULL,

  -- Statut
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')),
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  error TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Index
CREATE INDEX idx_automation_queue_status ON automation_queue(status);
CREATE INDEX idx_automation_queue_scheduled ON automation_queue(scheduled_for);
CREATE INDEX idx_automation_queue_subscriber ON automation_queue(subscriber_id);

-- ==================================
-- 8. ANALYTICS_DAILY (Métriques quotidiennes)
-- ==================================
CREATE TABLE analytics_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE UNIQUE NOT NULL,

  -- Métriques newsletter
  new_subscribers INTEGER DEFAULT 0,
  total_subscribers INTEGER DEFAULT 0,
  unsubscribes INTEGER DEFAULT 0,

  -- Métriques site
  unique_visitors INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,

  -- Métriques recettes
  recipes_views INTEGER DEFAULT 0,
  recipes_favorites INTEGER DEFAULT 0,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Index
CREATE INDEX idx_analytics_date ON analytics_daily(date DESC);

-- ==================================
-- ROW LEVEL SECURITY (RLS)
-- ==================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_daily ENABLE ROW LEVEL SECURITY;

-- PROFILES
-- Admins peuvent tout faire, users peuvent voir leur propre profil
CREATE POLICY "Admins can do everything on profiles" ON profiles
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- RECIPES
-- Recettes published + free sont publiques
CREATE POLICY "Published free recipes are viewable by everyone" ON recipes
  FOR SELECT USING (status = 'published' AND visibility = 'free');

-- Admins peuvent tout faire
CREATE POLICY "Admins can manage all recipes" ON recipes
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

-- NEWSLETTER_SUBSCRIBERS
-- Seuls les admins peuvent voir/gérer
CREATE POLICY "Admins can manage newsletter subscribers" ON newsletter_subscribers
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

-- NEWSLETTERS
CREATE POLICY "Admins can manage newsletters" ON newsletters
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

-- NEWSLETTER_EVENTS
CREATE POLICY "Admins can view newsletter events" ON newsletter_events
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

-- EMAIL_AUTOMATIONS
CREATE POLICY "Admins can manage email automations" ON email_automations
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

-- AUTOMATION_QUEUE
CREATE POLICY "Admins can view automation queue" ON automation_queue
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

-- ANALYTICS_DAILY
CREATE POLICY "Admins can view analytics" ON analytics_daily
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

-- ==================================
-- FUNCTIONS & TRIGGERS
-- ==================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletter_subscribers_updated_at BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at BEFORE UPDATE ON recipes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletters_updated_at BEFORE UPDATE ON newsletters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_automations_updated_at BEFORE UPDATE ON email_automations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_automation_queue_updated_at BEFORE UPDATE ON automation_queue
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour créer un profil automatiquement lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer profil auto
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==================================
-- SEED DATA (Données de test)
-- ==================================

-- Créer un admin par défaut (changez l'email après signup)
-- INSERT INTO profiles (id, email, first_name, last_name, role)
-- VALUES (
--   'admin-uuid-here',
--   'admin@florentfood.com',
--   'Florent',
--   'Food',
--   'admin'
-- );

-- Séquence de bienvenue newsletter (exemple)
INSERT INTO email_automations (name, trigger_type, sequence, status) VALUES (
  'Welcome Sequence - Newsletter',
  'newsletter_signup',
  '[
    {
      "delay_days": 0,
      "subject": "Bienvenue dans la famille Florent Food ! 🎉",
      "template": "welcome-email",
      "content": {"ebook_url": "/downloads/10-recettes-essentielles.pdf"}
    },
    {
      "delay_days": 2,
      "subject": "Mes 3 recettes préférées pour débuter",
      "template": "beginner-recipes",
      "content": {"recipes": ["tarte-citron", "fondant-chocolat", "cookies-pepites"]}
    },
    {
      "delay_days": 7,
      "subject": "La technique qui change tout (vidéo exclusive)",
      "template": "technique-video",
      "content": {"video_url": "https://vimeo.com/example"}
    },
    {
      "delay_days": 10,
      "subject": "Tu veux aller plus loin ? Découvre le membership",
      "template": "membership-intro",
      "content": {}
    },
    {
      "delay_days": 15,
      "subject": "Offre spéciale : 1er mois à -50% ⭐",
      "template": "special-offer",
      "content": {"promo_code": "BIENVENUE50"}
    }
  ]'::JSONB,
  'active'
);

-- Commentaire final
COMMENT ON TABLE profiles IS 'Utilisateurs de l''application (admins et futurs membres)';
COMMENT ON TABLE newsletter_subscribers IS 'Abonnés à la newsletter gratuite';
COMMENT ON TABLE recipes IS 'Recettes de pâtisserie (gratuites et premium)';
COMMENT ON TABLE newsletters IS 'Campagnes d''emails newsletter';
COMMENT ON TABLE newsletter_events IS 'Tracking des événements emails (opens, clicks, etc.)';
COMMENT ON TABLE email_automations IS 'Configuration des séquences d''emails automatiques';
COMMENT ON TABLE automation_queue IS 'File d''attente des emails automatiques à envoyer';
COMMENT ON TABLE analytics_daily IS 'Métriques quotidiennes agrégées';
