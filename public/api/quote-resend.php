<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
$quoteConfig = [];
$configPath = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'quote-config.php';
if (is_file($configPath)) { $loaded = require $configPath; if (is_array($loaded)) $quoteConfig = $loaded; }
function respond(int $status, array $payload): void { http_response_code($status); echo json_encode($payload); exit; }
function env_value(string $name, string $fallback = ''): string { global $quoteConfig; $value = getenv($name); if ($value === false && isset($_SERVER[$name])) $value = $_SERVER[$name]; if (($value === false || $value === '') && isset($quoteConfig[$name])) $value = $quoteConfig[$name]; return trim((string)($value === false ? $fallback : $value)); }
function text_value(array $body, string $key, int $limit = 500): string { return mb_substr(trim((string)($body[$key] ?? '')), 0, $limit); }
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { header('Allow: POST'); respond(405, ['error' => 'Method not allowed.']); }
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 64 * 1024) respond(413, ['error' => 'The quote request is too large.']);
$origins = array_values(array_filter(array_map('trim', explode(',', env_value('QUOTE_ALLOWED_ORIGINS')))));
$origin = trim((string)($_SERVER['HTTP_ORIGIN'] ?? ''));
if ($origins && $origin && !in_array($origin, $origins, true)) respond(403, ['error' => 'This website is not allowed to submit quote requests.']);
$body = json_decode((string)file_get_contents('php://input'), true);
if (!is_array($body)) respond(400, ['error' => 'The quote request is invalid.']);
if (text_value($body, 'website') !== '') respond(200, ['ok' => true]);
$name = text_value($body, 'name', 120); $email = strtolower(text_value($body, 'email', 254)); $phone = text_value($body, 'phone', 60); $pickup = text_value($body, 'pickup', 180); $delivery = text_value($body, 'delivery', 180);
if ($name === '' || $phone === '' || $pickup === '' || $delivery === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) respond(400, ['error' => 'Please complete all required fields with a valid email address.']);
$apiKey = env_value('RESEND_API_KEY'); $fromEmail = env_value('RESEND_FROM_EMAIL'); $recipient = env_value('QUOTE_RECIPIENT_EMAIL', $fromEmail); $fromName = env_value('RESEND_FROM_NAME', 'A11 Freight');
if ($apiKey === '' || !filter_var($fromEmail, FILTER_VALIDATE_EMAIL) || !filter_var($recipient, FILTER_VALIDATE_EMAIL)) { error_log('Quote endpoint: Resend configuration is missing or invalid.'); respond(500, ['error' => 'The quote email service is not configured.']); }
$details = ['Name' => $name, 'Company' => text_value($body, 'company', 160) ?: 'Not provided', 'Email' => $email, 'Phone' => $phone, 'Pickup' => $pickup, 'Delivery' => $delivery, 'Pickup date' => text_value($body, 'pickupDate', 30) ?: 'Not provided', 'Freight type' => text_value($body, 'freightType', 80) ?: 'Not specified', 'Pallets / pieces' => text_value($body, 'pallets', 30) ?: 'Not provided', 'Weight (lb)' => text_value($body, 'weight', 30) ?: 'Not provided', 'Dimensions' => text_value($body, 'dimensions', 160) ?: 'Not provided', 'Notes' => text_value($body, 'notes', 3000) ?: 'None'];
$rows = ''; foreach ($details as $label => $value) $rows .= '<tr><th style="padding:8px;text-align:left;vertical-align:top">' . htmlspecialchars($label, ENT_QUOTES, 'UTF-8') . '</th><td style="padding:8px;white-space:pre-wrap">' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '</td></tr>';
$payload = ['from' => $fromName . ' <' . $fromEmail . '>', 'to' => [$recipient], 'reply_to' => $email, 'subject' => 'New freight quote request — ' . $name, 'html' => '<h2>New website freight quote request</h2><table style="border-collapse:collapse">' . $rows . '</table>'];
$curl = curl_init('https://api.resend.com/emails'); curl_setopt_array($curl, [CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $apiKey, 'Content-Type: application/json'], CURLOPT_POSTFIELDS => json_encode($payload), CURLOPT_TIMEOUT => 20]);
$result = curl_exec($curl); $curlError = curl_error($curl); $status = (int)curl_getinfo($curl, CURLINFO_HTTP_CODE); curl_close($curl);
if ($result === false || $status < 200 || $status >= 300) { error_log('Quote endpoint: Resend failed with HTTP ' . $status . ': ' . ($curlError ?: (string)$result)); respond(502, ['error' => 'We could not send your request. Please try again or email info@a11freight.com.']); }
$resendResult = json_decode((string)$result, true); respond(200, ['ok' => true, 'id' => $resendResult['id'] ?? null]);
