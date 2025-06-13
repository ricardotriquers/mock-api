CREATE TABLE users (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    role NVARCHAR(20) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE mock_endpoints (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    path NVARCHAR(255) NOT NULL,
    http_method NVARCHAR(10) NOT NULL,
    request_body_pattern NVARCHAR(MAX),
    response_body NVARCHAR(MAX) NOT NULL,
    response_status INT NOT NULL,
    response_headers NVARCHAR(MAX),
    delay_in_millis INT,
    user_id BIGINT NOT NULL,
    active BIT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_mock_endpoints_path ON mock_endpoints(path);
CREATE INDEX idx_mock_endpoints_user ON mock_endpoints(user_id);