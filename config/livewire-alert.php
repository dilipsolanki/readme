<?php

/*
 * For more details about the configuration, see:
 * https://sweetalert2.github.io/#configuration
 */
return [
    'alert' => [
        'position' => 'top-end',
        'timer' => 3000,
        'toast' => true,
        'text' => null,
        'showCancelButton' => false,
        'showConfirmButton' => false
    ],
    'confirm' => [
        'icon' => 'warning',
        'position' => 'bottom-end',
        'toast' => false,
        'timer' => null,
        'showConfirmButton' => true,
        'showCancelButton' => true,
        'cancelButtonText' => 'No',
        'confirmButtonColor' => '#3085d6',
        'cancelButtonColor' => '#d33'
    ],
    'success' => [
        'position' =>  'bottom-end',
        'timer' =>  3000,
        'toast' =>  true,
        'text' =>  '',
        'confirmButtonText' =>  'Ok',
        'cancelButtonText' =>  'Cancel',
        'showCancelButton' =>  false,
        'showConfirmButton' =>  false,
    ]
];
