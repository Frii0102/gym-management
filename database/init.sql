DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS subscriptions;
DROP TABLE IF EXISTS trainings;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS trainers;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
                       user_id       SERIAL PRIMARY KEY,
                       full_name     VARCHAR(255) NOT NULL,
                       email         VARCHAR(255) UNIQUE NOT NULL,
                       password_hash VARCHAR(255) NOT NULL,
                       phone         VARCHAR(20),
                       role          VARCHAR(20) NOT NULL DEFAULT 'client',
                       created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trainers (
                          trainer_id     SERIAL PRIMARY KEY,
                          full_name      VARCHAR(255) NOT NULL,
                          specialization VARCHAR(255),
                          bio            TEXT,
                          photo_url      VARCHAR(255)
);

CREATE TABLE locations (
                           location_id SERIAL PRIMARY KEY,
                           name        VARCHAR(255) NOT NULL,
                           address     VARCHAR(255),
                           city        VARCHAR(100)
);

CREATE TABLE subscriptions (
                               subscription_id SERIAL PRIMARY KEY,
                               user_id         INTEGER NOT NULL REFERENCES users(user_id),
                               type            VARCHAR(50) NOT NULL,
                               start_date      DATE NOT NULL,
                               end_date        DATE NOT NULL
);

CREATE TABLE payments (
                          payment_id      SERIAL PRIMARY KEY,
                          subscription_id INTEGER NOT NULL REFERENCES subscriptions(subscription_id),
                          amount          DECIMAL(10, 2) NOT NULL,
                          paid_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          status          VARCHAR(20) NOT NULL DEFAULT 'pending'
);

CREATE TABLE trainings (
                           training_id  SERIAL PRIMARY KEY,
                           created_by   INTEGER NOT NULL REFERENCES users(user_id),
                           trainer_id   INTEGER NOT NULL REFERENCES trainers(trainer_id),
                           location_id  INTEGER NOT NULL REFERENCES locations(location_id),
                           title        VARCHAR(255) NOT NULL,
                           start_time   TIMESTAMP NOT NULL,
                           duration_min INTEGER NOT NULL,
                           capacity     INTEGER NOT NULL
);

CREATE TABLE bookings (
                          booking_id  SERIAL PRIMARY KEY,
                          user_id     INTEGER NOT NULL REFERENCES users(user_id),
                          training_id INTEGER NOT NULL REFERENCES trainings(training_id),
                          booked_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          status      VARCHAR(20) NOT NULL DEFAULT 'active'
);

CREATE TABLE reviews (
                         review_id   SERIAL PRIMARY KEY,
                         user_id     INTEGER NOT NULL REFERENCES users(user_id),
                         training_id INTEGER NOT NULL REFERENCES trainings(training_id),
                         rating      INTEGER CHECK (rating >= 1 AND rating <= 5),
                         comment     TEXT,
                         created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION check_training_capacity()
RETURNS TRIGGER AS $$
DECLARE
current_count INTEGER;
    max_capacity  INTEGER;
BEGIN
SELECT COUNT(*) INTO current_count
FROM bookings
WHERE training_id = NEW.training_id AND status = 'active';

SELECT capacity INTO max_capacity
FROM trainings
WHERE training_id = NEW.training_id;

IF current_count >= max_capacity THEN
        RAISE EXCEPTION 'Тренування заповнене — місць немає';
END IF;

RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_capacity
    BEFORE INSERT ON bookings
    FOR EACH ROW EXECUTE FUNCTION check_training_capacity();

-- Тестові акаунти
INSERT INTO users (full_name, email, password_hash, role)
VALUES
    ('Адміністратор', 'admin@gym.com', 'admin123', 'admin'),
    ('Клієнт', 'client@gym.com', 'client123', 'client');