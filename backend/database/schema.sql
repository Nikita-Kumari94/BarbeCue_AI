CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100) NOT NULL, org_name VARCHAR(160) NOT NULL,
  license_number VARCHAR(100) NOT NULL, password VARCHAR(255) NOT NULL, user_type ENUM('restaurant','ngo') NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE, phone VARCHAR(30) NOT NULL, registered_at DATETIME NOT NULL, location VARCHAR(255) NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS donations (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, restaurant_id BIGINT UNSIGNED NOT NULL, food_name VARCHAR(160) NOT NULL,
  quantity DECIMAL(10,2) NOT NULL, unit VARCHAR(32) NOT NULL DEFAULT 'servings', expires_at DATETIME NOT NULL,
  pickup_address VARCHAR(255) NOT NULL, status ENUM('available','reserved','collected','expired') NOT NULL DEFAULT 'available',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (restaurant_id) REFERENCES users(id), INDEX(status, expires_at)
);
CREATE TABLE IF NOT EXISTS donation_requests (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, donation_id BIGINT UNSIGNED NOT NULL, ngo_id BIGINT UNSIGNED NOT NULL,
  message VARCHAR(500), status ENUM('pending','accepted','rejected','cancelled') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE KEY one_request_per_ngo (donation_id, ngo_id),
  FOREIGN KEY (donation_id) REFERENCES donations(id), FOREIGN KEY (ngo_id) REFERENCES users(id)
);
