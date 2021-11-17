<?php

use Illuminate\Http\Response;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

if (!function_exists('user')) {
    function user($guard = null)
    {
        return auth($guard)->user();
    }
}

if (!function_exists('ok')) {
    /**
     * Returns an HTTP 204 response (OK, No Content).
     *
     * @param  array  $headers
     *
     * @return \Illuminate\Http\Response
     */
    function ok(array $headers = []): Response
    {
        return response()->noContent(204, $headers);
    }
}

if (!function_exists('route_is')) {
    /**
     * Determine whether the current route's name matches the given patterns.
     *
     * @param  string  ...$patterns
     *
     * @return bool  It will always return `false` when outside an HTTP Request.
     */
    function route_is(string ...$patterns): bool
    {
        return (bool) app('request')->routeIs(...$patterns);
    }
}

if (!function_exists('in_development')) {
    /**
     * Check if the application is running in development environments (no testing, staging or production).
     *
     * @param  callable|null  $callback
     *
     * @return bool
     */
    function in_development(callable $callback = null): bool
    {
        if (app()->environment('dev', 'development', 'local')) {
            value($callback);
            return true;
        }

        return false;
    }
}

if (!function_exists('in_staging')) {
    /**
     * Check if the application is running in testing or staging environments.
     *
     * @param  callable|null  $callback
     *
     * @return bool
     */
    function in_staging(callable $callback = null): bool
    {
        if (app()->environment('staging', 'test')) {
            value($callback);
            return true;
        }

        return false;
    }
}

if (!function_exists('files')) {
    /**
     * Returns the local Filesystem helper, or a list of files in a path.
     *
     * @param  string|null  $path
     * @param  bool  $recursive
     *
     * @return \Illuminate\Filesystem\Filesystem|\Illuminate\Support\Collection<\SplFileInfo>|\SplFileInfo[]
     */
    function files(string $path = null, bool $recursive = false): Filesystem|Collection
    {
        $filesystem = app('files');

        if (!$path) {
            return $filesystem;
        }

        $path = base_path($path);

        return Collection::make($recursive ? $filesystem->allFiles($path) : $filesystem->files($path));
    }
}

if (!function_exists('issetAndNotEmpty')) {
    function issetAndNotEmpty($parameter)
    {
        return (isset($parameter) && !is_null($parameter) && !empty($parameter));
    }
}

if (!function_exists('removeSpecialCharacters')) {
    function removeSpecialCharacters($string)
    {
        return preg_replace('/[^A-Za-z0-9 .\-]/', '', $string);
    }
}


if (!function_exists('logError')) {
    /**
     * Logs the error in the custom log file
     * File path is specified in env file
     *
     * @param null  $label
     * @param null  $description
     * @param array $context
     */
    function logError($label = null, $description = null, $context = array())
    {
        // if (!isLogWriteable()) {
        //     return;
        // }
        $return = getLoggerBasicData($label, $description);

        if (isset($context['file']) && $context['file'] !== null) {
            $return['file'] = $context['file'];
            unset($context['file']);
        }

        if (isset($context['line']) && $context['line'] !== null) {
            $return['line'] = $context['line'];
            unset($context['line']);
        }

        if (is_array($context) && !empty($context)) {
            $return['params'] = $context;
        }

        Log::Error('', $return);
    }
}


if (!function_exists('getLoggerBasicData')) {
    /**
     * Returns the basic data for logging
     * Below parameters will be returned
     * session
     * pid
     * ip_address
     * host
     * referer
     * request_uri
     * guid
     *
     * @param null $label
     * @param null $description
     * @return array
     */
    function getLoggerBasicData($label = null, $description = null)
    {

        $return = array();

        if (isset($label) && $label !== null) {
            $return['label'] = $label;
        }

        if (isset($description) && $description !== null) {
            $return['description'] = $description;
        }

        // $return['pid'] = Request::Header('x-crm-track-pid');
        // $return['tid'] = Request::Header('x-crm-track-tid');

        if (isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] !== null) {
            $return['host'] = $_SERVER['HTTP_HOST'];
        }

        if (isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] !== null) {
            $return['referer'] = $_SERVER['HTTP_REFERER'];
        }

        if (isset($_SERVER['REQUEST_URI']) && $_SERVER['REQUEST_URI'] !== null) {
            $return['request_uri'] = $_SERVER['REQUEST_URI'];
        }

        return $return;
    }
}

if (!function_exists('throwErrorDetails')) {
    function throwErrorDetails($e, $file, $line)
    {
        //1. log Actual exception, we need it for \Exception since we dont capture it anywhere
        logError(get_class($e), $e->getMessage(), ['file' => $e->getFile(), 'line' => $e->getLine()]);
        //2. log where exception occurred, going inner to outer
        logError(get_class($e), $e->getMessage(), ['file' => $file, 'line' => $line]);
    }
}
