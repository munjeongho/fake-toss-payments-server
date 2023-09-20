import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { MutexConnector } from "mutex-server";
import { MutableSingleton, Singleton } from "tstl";
import typia from "typia";

import { PaymentConfiguration } from "./PaymentConfiguration";

/**
 * 통합 결제 서버의 전역 변수들 모음.
 *
 * @author Samchon
 */
export class PaymentGlobal {
    /**
     * 백엔드 서버 실행 모드.
     *
     * 현재의 `payments-server` 가 어느 환경에서 실행되고 있는가.
     *
     *  - local: 로컬 시스템
     *  - dev: 개발 서버
     *  - real: 실제 서버
     */
    public static get mode(): "local" | "dev" | "real" {
        return (modeWrapper.value ??= environments.get().MODE);
    }

    public static setMode(mode: typeof PaymentGlobal.mode): void {
        typia.assert(mode);
        modeWrapper.value = mode;
    }

    public static get env() {
        return environments.get();
    }

    public static get prisma(): PrismaClient {
        return prismaClient.get();
    }

    public static readonly critical: MutableSingleton<
        MutexConnector<string, null>
    > = new MutableSingleton(async () => {
        const connector: MutexConnector<string, null> = new MutexConnector(
            PaymentConfiguration.SYSTEM_PASSWORD(),
            null,
        );
        await connector.connect(
            `ws://${PaymentConfiguration.MASTER_IP()}:${PaymentConfiguration.UPDATOR_PORT()}/api`,
        );
        return connector;
    });
}
export namespace PaymentGlobal {
    /**
     * 테스트 여부.
     *
     * 현 `payments-server` 가 테스트 자동화 프로그램에서 구동 중인지 여부.
     *
     * 만일 이 값이 true 이거든, 통합 결제 백엔드 서버를 구동할 때, 이와 연동하게 될
     * 각종 가짜 결제 PG 서버들도 함께 구동된다. 현재 본 `payments-server` 의 테스트
     * 자동화 프로그램과 연동되는 가짜 PG 서버들의 목록은 아래와 같다.
     *
     *  - [fake-iamport-server](https://github.com/samchon/fake-iamport-server)
     *  - [fake-toss-payments-server](https://github.com/samchon/fake-toss-payments-server)
     *
     * 더하여 현 서버가 로컬 시스템에서 구동된다 하여 반드시 테스트 중이라는 보장은
     * 없으며, 반대로 현 서버가 테스트 중이라 하여 반드시 로컬 시스템이라는 보장 또한
     * 없으니, 이 점을 착각하지 말기 바란다.
     */
    export let testing: boolean = false;
}

interface IMode {
    value?: "local" | "dev" | "real";
}
const modeWrapper: IMode = {};

interface IEnvironments {
    // DEFAULT CONFIGURATIONS
    MODE: "local" | "dev" | "real";
    API_PORT: `${number}`;
    UPDATOR_PORT: `${number}`;
    SYSTEM_PASSWORD: string;

    // POSTGRES CONNECTION INFO
    POSTGRES_URL: string;
    POSTGRES_HOST: string;
    POSTGRES_PORT: `${number}`;
    POSTGRES_DATABASE: string;
    POSTGRES_SCHEMA: string;
    POSTGRES_USERNAME: string;
    POSTGRES_USERNAME_READONLY: string;
    POSTGRES_PASSWORD: string;

    // ENCRYPTION KEYS
    API_ENCRYPTION_KEY: string;
    API_ENCRYPTION_IV: string;
    DB_HISTORY_ENCRYPTION_KEY: string;
    DB_HISTORY_ENCRYPTION_IV: string;
    DB_RESERVATION_ENCRYPTION_KEY: string;
    DB_RESERVATION_ENCRYPTION_IV: string;
    DB_CANCEL_HISTORY_ENCRYPTION_KEY: string;
    DB_CANCEL_HISTORY_ENCRYPTION_IV: string;

    // VENDOR'S SECRETS
    IAMPORT_KEY: string;
    IAMPORT_SECRET: string;
    TOSS_PAYMENTS_SECRET: string;
}

const environments: Singleton<IEnvironments> = new Singleton(() => {
    const env = dotenv.config();
    dotenvExpand.expand(env);
    return typia.assert<IEnvironments>(process.env);
});

const prismaClient = new Singleton(
    () =>
        new PrismaClient({
            datasources: {
                db: {
                    url: PaymentGlobal.env.POSTGRES_URL,
                },
            },
        }),
);
