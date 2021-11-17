<?php

namespace App\Services\AWS;

use Aws\Credentials\CredentialProvider;
use Aws\Credentials\Credentials;
use Aws\Lambda\LambdaClient;
use Aws\Sts\StsClient;
use Aws\S3\S3Client;

class AwsLabsPlaygroundService
{
    public static function lambdaClient(): LambdaClient
    {
        $lambdaParams = [
            'region'  => config('aws_config.labs_playground.lambda.region'),
            'version' => config('aws_config.labs_playground.lambda.version')
        ];
        $lambdaParams = self::awsCredentials($lambdaParams);
        return new LambdaClient($lambdaParams);
    }

    /**
     * @return \Aws\S3\S3Client
     */
    public static function s3Client(): S3Client
    {
        $s3Params = [
            'region'  => config('aws_config.labs_playground.s3.region'),
            'version' => config('aws_config.labs_playground.s3.version')
        ];
        $s3Params = self::awsCredentials($s3Params);
        return new S3Client($s3Params);
    }

    private static function awsCredentials(array $params): array
    {
        if (app()->environment() == 'local') {
            $params['credentials'] = [
                'key'    => config('aws_config.labs_playground.access_key'),
                'secret' => config('aws_config.labs_playground.secret_key'),
                'token' => config('aws_config.labs_playground.session_token'),
            ];
        } else {
            $provider = CredentialProvider::instanceProfile();
            $params['credentials'] = CredentialProvider::memoize($provider);
        }
        return $params;
    }

    /**
     * @param $bucketName
     * @param $filePath
     * @return string
     */
    public static function getPreSignedS3Url($bucketName, $filePath): string
    {
        $s3Client = self::s3Client();
        $cmd = $s3Client->getCommand('GetObject', [
            'Bucket' => $bucketName,
            'Key' => $filePath
        ]);

        $request = $s3Client->createPresignedRequest($cmd, config('aws_config.labs_playground.s3.ttl'));
        return (string)$request->getUri();
    }
}
