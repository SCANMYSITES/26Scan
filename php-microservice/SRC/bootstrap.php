<?php
// Load environment variables (optional for later)
$dotenv = __DIR__ . '/../.env';
if (file_exists($dotenv)) {
    foreach (file($dotenv, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        putenv(trim($line));
    }
}

// Database connection (Neon PostgreSQL)
function db() {
    static $pdo;
    if ($pdo === null) {
        $dsn = "pgsql:host=" . getenv('DB_HOST') .
               ";port=" . getenv('DB_PORT') .
               ";dbname=" . getenv('DB_NAME');
        $pdo = new PDO($dsn, getenv('DB_USER'), getenv('DB_PASS'), [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);
    }
    return $pdo;
}
