<?php

$path = $_SERVER['REQUEST_URI'];

if ($path === '/send-code') {
    require __DIR__ . '/../src/send_code.php';
    exit;
}

if ($path === '/verify-code') {
    require __DIR__ . '/../src/verify_code.php';
    exit;
}

echo "PHP microservice is running.";

