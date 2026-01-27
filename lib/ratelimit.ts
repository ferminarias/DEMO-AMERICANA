interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

class SimpleRateLimiter {
  private store: RateLimitStore = {}
  private points: number
  private duration: number // in seconds
  private keyPrefix: string

  constructor(options: { keyPrefix: string; points: number; duration: number }) {
    this.keyPrefix = options.keyPrefix
    this.points = options.points
    this.duration = options.duration
  }

  async consume(key: string): Promise<void> {
    const fullKey = `${this.keyPrefix}:${key}`
    const now = Date.now()
    const resetTime = now + this.duration * 1000

    // Clean up expired entries
    Object.keys(this.store).forEach((k) => {
      if (this.store[k].resetTime < now) {
        delete this.store[k]
      }
    })

    if (!this.store[fullKey]) {
      this.store[fullKey] = { count: 1, resetTime }
      return
    }

    if (this.store[fullKey].resetTime < now) {
      this.store[fullKey] = { count: 1, resetTime }
      return
    }

    if (this.store[fullKey].count >= this.points) {
      const msBeforeNext = this.store[fullKey].resetTime - now
      throw {
        msBeforeNext,
        remainingPoints: 0,
        totalHits: this.store[fullKey].count + 1,
      }
    }

    this.store[fullKey].count++
  }
}

// Rate limiter for contact form submissions
export const contactFormLimiter = new SimpleRateLimiter({
  keyPrefix: "contact_form",
  points: 5, // Number of requests
  duration: 600, // Per 10 minutes (600 seconds)
})

// Rate limiter for general API requests
export const apiLimiter = new SimpleRateLimiter({
  keyPrefix: "api_general",
  points: 100, // Number of requests
  duration: 60, // Per minute
})
