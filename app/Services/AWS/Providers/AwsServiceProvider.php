<?php

namespace App\Services\AWS\Providers;

use App\Services\AWS\AwsLabsPlaygroundService;
use Illuminate\Support\ServiceProvider;

class AwsServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->mergeConfigFrom(__DIR__ . '/../Config/aws_config.php', 'aws_config');
        $this->registerAwsLabsPlaygroundManager();
    }

    public function boot()
    {
    }

    public function provides(): array
    {
        return [AwsLabsPlaygroundService::class];
    }

    protected function registerAwsLabsPlaygroundManager()
    {
        $this->app->singleton(AwsLabsPlaygroundService::class, function ($app) {
            return new AwsLabsPlaygroundService();
        });
    }
}
