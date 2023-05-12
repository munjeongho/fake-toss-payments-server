/**
 * @packageDocumentation
 * @module api.functional.v1.billing.authorizations
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher, Primitive } from "@nestia/fetcher";
import type { IConnection } from "@nestia/fetcher";

import type { ITossBilling } from "./../../../../structures/ITossBilling";

export * as card from "./card";

/**
 * 간편 결제로 등록한 수단 조회하기.
 * 
 * `billing.authorizations.at` 은 고객이 간편 결제를 위하여 토스 페이먼츠 서버에
 * 등록한 결제 수단을 조회하는 함수이다.
 * 
 * 주로 클라이언트 어플리케이션이 토스 페이먼츠가 자체적으로 제공하는 결제 창을 사용하는
 * 경우, 그래서 프론트 어플리케이션이 귀하의 백엔드 서버에 `billingKey` 와` customerKey`
 * 만을 전달해주어, 상세 간편 결제 수단 정보가 필요할 때 사용한다.
 * 
 * @param connection connection Information of the remote HTTP(s) server with headers (+encryption password)
 * @param billingKey 대상 정보의 {@link ITossBilling.billingKey}
 * @param input 고객 식별자 키
 * @returns 간편 결제 수단 정보
 * @author Jeongho Nam - https://github.com/samchon
 * 
 * @controller FakeTossBillingController.at()
 * @path POST /v1/billing/authorizations/:billingKey
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function at
    (
        connection: IConnection,
        billingKey: string,
        input: Primitive<at.Input>
    ): Promise<at.Output>
{
    return Fetcher.fetch
    (
        connection,
        at.ENCRYPTED,
        at.METHOD,
        at.path(billingKey),
        input
    );
}
export namespace at
{
    export type Input = Primitive<ITossBilling.ICustomerKey>;
    export type Output = Primitive<ITossBilling>;

    export const METHOD = "POST" as const;
    export const PATH: string = "/v1/billing/authorizations/:billingKey";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(billingKey: string): string
    {
        return `/v1/billing/authorizations/${encodeURIComponent(billingKey ?? "null")}`;
    }
}