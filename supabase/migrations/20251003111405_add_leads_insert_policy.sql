/*
  # Add Insert Policy for Leads Table

  1. Security Changes
    - Add policy to allow anonymous users to insert leads
    - This is required for the public registration form to work
    - Users can insert their own data without authentication
*/

CREATE POLICY "Anyone can insert leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);
