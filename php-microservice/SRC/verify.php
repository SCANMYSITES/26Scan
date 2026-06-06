<?php
require __DIR__ . '/bootstrap.php';
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? null;
$code  = $input['code'] ?? null;

if (!$email || !$code) {
    echo json_encode(['error' => 'Email and code are required']);
    exit;
}

$stmt = db()->prepare("SELECT code FROM verification_codes
                       WHERE email = :email
                       ORDER BY created_at DESC
                       LIMIT 1");
$stmt->execute([':email' => $email]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row) {
    echo json_encode(['valid' => false, 'reason' => 'No code found']);
    exit;
}

echo json_encode(['valid' => $row['code'] == $code]);
