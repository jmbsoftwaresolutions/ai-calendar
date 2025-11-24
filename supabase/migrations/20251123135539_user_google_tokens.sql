create table public.user_google_tokens
(
    user_id UUID not null,
    google_access_token text not null,
    google_refresh_token text not null,
    constraint user_google_tokens_pkey primary key (user_id)
)
TABLESPACE pg_default;

ALTER TABLE
  public.user_google_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to select their own data"
        ON user_google_tokens FOR
SELECT TO authenticated
USING
(auth.uid
() = user_id);

CREATE POLICY "Allow authenticated users to insert their own data"
        ON user_google_tokens FOR
INSERT TO authenticated
        WITH CHECK (
auth.uid()
= user_id);
CREATE POLICY "Allow authenticated users to update their own data"
        ON user_google_tokens FOR
UPDATE TO authenticated
        USING (auth.uid() = user_id)
WITH CHECK
(auth.uid
() = user_id);

CREATE POLICY "Allow authenticated users to delete their own data"
        ON user_google_tokens FOR
DELETE TO authenticated
        USING (auth.uid() = user_id);