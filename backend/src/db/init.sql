CREATE DATABASE opiniondrop_db;

\c opiniondrop_db;

-- creating Tables

CREATE TABLE users (
    user_id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    bio TEXT,
    profile_picture TEXT,
    favorite_opinion_ids INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    political_alignment TEXT DEFAULT 'Moderate',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL
);


CREATE TABLE opinions (
    opinion_id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    topic_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    text_content TEXT NOT NULL,
    background_image TEXT,
    parent_opinion_id INT,
    images TEXT[],
    videos TEXT[],
    documents TEXT[],
    audios TEXT[],
    likes INTEGER NOT NULL DEFAULT 0,
    dislikes INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    opinion_id INTEGER NOT NULL,
    parent_comment_id INTEGER,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE ratings (
    rating_id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
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

CREATE TABLE comment_likes (
    user_id TEXT NOT NULL,
    comment_id INT NOT NULL,
    liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, comment_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id), 
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id) 
);

CREATE TABLE opinion_likes (
    user_id TEXT NOT NULL,
    opinion_id INT NOT NULL,
    liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, opinion_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id), 
    FOREIGN KEY (opinion_id) REFERENCES opinions(opinion_id) 
);

CREATE TABLE opinion_dislikes (
    user_id TEXT NOT NULL,
    opinion_id INT NOT NULL,
    disliked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, opinion_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id), 
    FOREIGN KEY (opinion_id) REFERENCES opinions(opinion_id) 
);

CREATE TABLE cesspit_comments (
    comment_id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    topic_id INTEGER NOT NULL,
    parent_comment_id INTEGER,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE cesspit_comment_likes (
    user_id TEXT NOT NULL,
    comment_id INT NOT NULL,
    liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, comment_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id), 
    FOREIGN KEY (comment_id) REFERENCES cesspit_comments(comment_id) 
);

CREATE TABLE surveys (
    survey_id SERIAL PRIMARY KEY,
    topic_id INT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id) 
);

CREATE TABLE survey_questions (
    question_id SERIAL PRIMARY KEY,
    survey_id INT NOT NULL,
    question_text TEXT NOT NULL,
    FOREIGN KEY (survey_id) REFERENCES surveys(survey_id)
);

CREATE TABLE survey_responses (
    response_id SERIAL PRIMARY KEY,
    survey_id INT NOT NULL,
    user_id TEXT NOT NULL,
    response_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (survey_id) REFERENCES surveys(survey_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE survey_answers (
    answer_id SERIAL PRIMARY KEY,
    response_id INT NOT NULL,
    question_id INT NOT NULL,
    answer_value INT, 
    FOREIGN KEY (response_id) REFERENCES survey_responses(response_id),
    FOREIGN KEY (question_id) REFERENCES survey_questions(question_id),
);

CREATE TABLE highlights (
  highlight_id TEXT PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  opinion_id INT NOT NULL,
  highlighted_text TEXT,
  reaction_text TEXT,
  reaction_type TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (opinion_id) REFERENCES opinions(opinion_id)

);

-- Table Constraints

-- Opinions table constraints
ALTER TABLE opinions
ADD CONSTRAINT fk_user_id
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
ADD CONSTRAINT fk_user_id
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

CREATE TRIGGER update_highlights_timestamp
BEFORE UPDATE ON highlights
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();