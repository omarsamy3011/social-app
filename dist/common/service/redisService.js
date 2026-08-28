"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisService = void 0;
const redis_1 = require("redis");
const env_service_1 = require("../../config/env.service");
class RedisService {
    client;
    constructor() {
        this.client = (0, redis_1.createClient)({ url: env_service_1.env.redis_url });
        this.handlingConnection();
    }
    async connectRedis() {
        await this.client.connect();
    }
    handlingConnection() {
        this.client.on("error", () => {
            console.log('redis connection failed');
        });
        this.client.on("ready", () => {
            console.log('redis connected successfully');
        });
    }
    async set({ key, value, ttl }) {
        if (typeof value == "object") {
            value = JSON.stringify(value);
        }
        ttl ? await this.client.set(key, value, { EX: ttl }) : await this.client.set(key, value);
    }
    async get({ key }) {
        return await this.client.get(key);
    }
    async ttl({ key }) {
        return await this.client.ttl(key);
    }
    async exists({ key }) {
        return await this.client.exists(key);
    }
    async redis_delete({ key }) {
        return await this.client.del(key);
    }
    async redis_mget({ keys }) {
        return await this.client.mGet(keys);
    }
    createRevokeToken({ userId, token }) {
        return `revokeToken::${userId}:${token}`;
    }
}
exports.redisService = new RedisService();
