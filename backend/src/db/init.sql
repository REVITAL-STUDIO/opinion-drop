
\c opiniondrop_db;

-- creating Tables

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    bio TEXT,
    profile_picture TEXT,
    political_alignment TEXT DEFAULT 'Moderate',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL
);


CREATE TABLE opinions (
    opinion_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    topic_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    text_content TEXT NOT NULL,
    background_image TEXT,
    images TEXT[],
    videos TEXT[],
    documents TEXT[],
    audios TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    opinion_id INTEGER NOT NULL,
    parent_comment_id INTEGER,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE ratings (
    rating_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    opinion_id INTEGER NOT NULL,
    value INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE topics (
    topic_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);







-- Table Constraints

-- Opinions table constraints
ALTER TABLE opinions
ADD CONSTRAINT fk_opinion_user_id
FOREIGN KEY (user_id)
REFERENCES users (user_id)
ON DELETE CASCADE;  

ALTER TABLE opinions
ADD CONSTRAINT fk_opinion_topic_id
FOREIGN KEY (topic_id)
REFERENCES topics (topic_id)
ON DELETE CASCADE;


-- Comments table constraints
ALTER TABLE comments
ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id)
REFERENCES users (user_id)
ON DELETE CASCADE;  -- Delete comments if referenced user is deleted

ALTER TABLE comments
ADD CONSTRAINT fk_opinion_id
FOREIGN KEY (opinion_id)
REFERENCES opinions (opinion_id)
ON DELETE CASCADE;  -- Delete comments if referenced opinion is deleted

ALTER TABLE comments
ADD CONSTRAINT fk_parent_comment_id
FOREIGN KEY (parent_comment_id)
REFERENCES comments (comment_id)
ON DELETE CASCADE;  -- Delete child comments if parent comment is deleted




-- Ratings  table constraints
ALTER TABLE ratings
ADD CONSTRAINT fk_rating_user_id
FOREIGN KEY (user_id)
REFERENCES users (user_id)
ON DELETE CASCADE;  -- Delete ratings if referenced user is deleted

ALTER TABLE ratings
ADD CONSTRAINT fk_rating_opinion_id
FOREIGN KEY (opinion_id)
REFERENCES opinions (opinion_id)
ON DELETE CASCADE;  -- Delete ratings if referenced opinion is deleted


-- Functions

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_opinions_timestamp
BEFORE UPDATE ON opinions
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_comments_timestamp
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();