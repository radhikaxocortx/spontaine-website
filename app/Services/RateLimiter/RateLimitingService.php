<?php

namespace App\Services\RateLimiter;

use Illuminate\Support\Facades\RateLimiter;

class RateLimitingService
{
    private int $maxAttempts = 5;

    private int $decayTime = 3600;

    public function setMaxAttempts(int $maxAttempts): void
    {
        $this->maxAttempts = $maxAttempts;
    }

    public function setDecayTime(int $decayTime): void
    {
        $this->decayTime = $decayTime;
    }

    public function attemptsRemaining(string $key): int
    {
        return RateLimiter::remaining($key, $this->maxAttempts);
    }

    public function incrementAttempts(string $key): void
    {
        RateLimiter::hit($key, $this->decayTime);
    }

    /**
     * Duration in Minutes
     */
    public function remainingTimeoutDuration(string $key): int|float
    {
        return round((RateLimiter::availableIn($key) / 60));
    }

    public function clearAttempts(string $key): void
    {
        RateLimiter::clear($key);
    }

    public function createKey(string $section, int|string $uid): string
    {
        $ip = request()->ip() ?? 'ip';

        return $section.'|'.$uid.'|'.$ip;
    }
}
