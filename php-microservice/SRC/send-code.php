<?php
require __DIR__ . '/bootstrap.php';
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? null;

if (!$email) {
    echo json_encode(['error' => 'Email is required']);
    exit;
}

$code = random_int(100000, 999999);

$stmt = db()->prepare("INSERT INTO verification_codes (email, code, created_at)
                       VALUES (:email, :code, NOW())");
$stmt->execute([':email' => $email, ':code' => $code]);

echo json_encode(['success' => true, 'code' => $code]);
