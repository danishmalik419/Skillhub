/*
  # Initial Schema Setup for SkillHub

  1. New Tables
    - `tutorials`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `video_url` (text)
      - `category` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, foreign key)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

CREATE TABLE tutorials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  video_url text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE tutorials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tutorials are viewable by everyone"
  ON tutorials
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own tutorials"
  ON tutorials
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tutorials"
  ON tutorials
  FOR UPDATE
  USING (auth.uid() = user_id);