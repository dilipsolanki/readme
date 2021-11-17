<?php
return [
    'labs_playground' => [
        'secret_key' => env('AWS_SECRET_ACCESS_KEY'),
        'access_key' => env('AWS_ACCESS_KEY_ID'),
        'session_token' => env('AWS_SESSION_TOKEN'),
        'lambda' => [
            'region' => 'us-east-1',
            'version' => 'latest'
        ],
        's3' => [
            'region' => 'us-east-1',
            'version' => 'latest',
            'bucket_name' => 'rnd-genuse',
            'ttl' => '+60 seconds'
        ]
    ]
];
